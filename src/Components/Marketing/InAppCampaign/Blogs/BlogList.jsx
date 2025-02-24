import React, { useState, useEffect, useCallback } from "react";
import { Dropdown, Menu, message } from "antd";
import { GoPlus } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Instance } from "../../../../AxiosConfig";
import {
  showDeleteMessage,
  showSuccessMessage,
} from "../../../../globalConstant";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddBlogs from "./AddBlogs";
import { deleteBlog, setBlogs } from "../../../../Features/BlogSlice";
import EditBlogs from "./EditBlog";
import ViewBlog from "./ViewBlog";
import Loader from "../../../../Loader";

const BlogsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const BlogsList = useSelector((state) => state.blog.blogs || []);
  const itemsPerPage = 100;
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const showEditModal = () => setIsEditModalOpen(true);
  const handleEditCancel = () => setIsEditModalOpen(false);
  const handleViewCancel = () => setIsViewModalOpen(false);

  const sortMenu = (blog) => (
    <Menu onClick={(e) => e.domEvent.stopPropagation()}>
      <Menu.Item
        key="edit"
        className="filter-menu-item"
        onClick={(e) => {
          e.domEvent.stopPropagation();
          setIsEditModalOpen(true);
          setSelectedBlog(blog);
          showEditModal();
        }}
      >
        <BiEdit style={{ color: "var(--primary-green)", marginRight: "4px" }} />
        Edit
      </Menu.Item>
      <Menu.Item
        key="delete"
        className="filter-menu-item"
        onClick={() => handleDeleteBlog(blog._id)}
      >
        <RiDeleteBin7Line
          style={{ color: "var(--red-color)", marginRight: "4px" }}
        />
        Delete
      </Menu.Item>
    </Menu>
  );

  const fetchBlogs = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await Instance.get("/discover/blog", {
        params: { page, limit: itemsPerPage },
      });
      dispatch(setBlogs(response.data || []));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching news list :", error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, itemsPerPage]);

  const handleDeleteBlog = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/discover/blog/${_id}`);
          if (response.status === 200) {
            showSuccessMessage("Deleted successfully");
            dispatch(deleteBlog(_id));
          }
        } catch (error) {
          message.error("Error deleting news",error);
          console.error("Error deleting news:", error);
        }
      },
    });
  };

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleCardClick = (blog) => {
    if (!isEditModalOpen) {
      setSelectedBlog(blog); 
      setIsViewModalOpen(true);
    }
  };

  const renderBlogCard = (event) => (
    <div className="col-lg-4" key={event._id}>
      <div
        className="upcoming-event-card p-3"
        style={{ position: "relative", cursor: "pointer" }}
        onClick={() => handleCardClick(event)} 
      >
        <div className="treatment-info-icon-container">
          <Dropdown overlay={sortMenu(event)} trigger={["click"]}>
            <button className="action-icon-button" onClick={(e) => e.stopPropagation()}>
              <BsThreeDotsVertical />
            </button>
          </Dropdown>
        </div>
  
        <div className="d-flex justify-content-center align-items-center mb-3">
          <img src={event.thumbnail} alt={event.title} />
        </div>
        <div>
          <div className="d-flex justify-content-between mb-2">
            <h4>{event.heading}</h4>
          </div>
          <p>{event.subHeading}</p>
          {/* <p>
            <span
              dangerouslySetInnerHTML={{
                __html: sanitizeContent(truncateText(event.content, 20)),
              }}
            ></span>
          </p> */}
        </div>
      </div>
    </div>
  );
  

  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", zIndex: "100" }}
        onClick={onClick}
      >
        &#8592;
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", zIndex: "100" }}
        onClick={onClick}
      >
        &#8594;
      </div>
    );
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
    {isLoading && <Loader />}
    <div className="container mt-4">
      <div className="marketing-categories-section">
        {/* <div className="d-flex justify-content-between align-items-center mb-4">
          <h4>Education Categories</h4>
          <div className="d-flex gap-3 align-items-center">
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search anything here"
                className="search-input-table"
              />
            </div>
            <Button>
              <VscSettings />
              Filters
            </Button>
          </div>
        </div> */}

        <div className="row mt-4">
          <div className="events-header-container">
            <h6>News</h6>
            <div className="events-buttons">
              <button className="rfh-basic-button" onClick={showModal}>
                <GoPlus size={20} /> Add News
              </button>
              <button
                className="rfh-view-all-button"
                onClick={() => navigate("/view-all-blog-lists")}
              >
                View all
              </button>
            </div>
          </div>
          <div className="mt-3">
            <Slider {...sliderSettings} key={BlogsList?.length}>
              {BlogsList && BlogsList?.length > 0 ? (
                [...BlogsList].reverse()?.map((event, index) => renderBlogCard(event, index))
              ) : (
                <p>No data available</p>
              )}
            </Slider>
          </div>
        </div>
      </div>

      <AddBlogs open={isModalOpen} handleCancel={handleCancel} />
      <EditBlogs
        open={isEditModalOpen}
        handleCancel={handleEditCancel}
        blogData={selectedBlog}
      />
      <ViewBlog
        open={isViewModalOpen}
        handleCancel={handleViewCancel}
        blogData={selectedBlog}
      />
    </div>
    </>
  );
};

export default BlogsList;
