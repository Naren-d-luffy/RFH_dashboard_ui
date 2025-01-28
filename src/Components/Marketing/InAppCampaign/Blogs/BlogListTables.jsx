import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Table } from "antd";
import { FiEdit, FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import { FaAngleLeft, FaPlus } from "react-icons/fa6";
import Empty_survey_image from "../../../../Assets/Icons/Empty_survey_image.png";
import {
  showDeleteMessage,
  showSuccessMessage,
} from "../../../../globalConstant";
import { GoPlus } from "react-icons/go";
import { Instance } from "../../../../AxiosConfig";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../Loader";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import AddBlogs from "./AddBlogs";
import EditBlogs from "./EditBlog";
import ViewBlog from "./ViewBlog";
import { deleteBlog, setBlogs } from "../../../../Features/BlogSlice";

const BlogsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows] = useState(0);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const BlogsList = useSelector((state) => state.blog.blogs || []);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const itemsPerPage = 10;
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const navigate = useNavigate();
  const showEditModal = (blog) => {
    setSelectedBlog(blog);
    setIsEditModalOpen(true);
  };
  const handleEditCancel = () => setIsEditModalOpen(false);
  const showViewModal = (blog) => {
    setSelectedBlog(blog);
    setIsViewModalOpen(true);
  };
  const handleViewCancel = () => setIsViewModalOpen(false);

  const truncateText = (text, wordLimit = 15) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };
  const truncateHTML = (htmlContent, wordLimit) => {
    if (!htmlContent) return "";
    const sanitizedContent = DOMPurify.sanitize(htmlContent);
    const textContent = sanitizedContent.replace(/<[^>]*>/g, "");
    const words = textContent.split(" ");
    const truncatedText =
      words.length > wordLimit
        ? words.slice(0, wordLimit).join(" ") + "..."
        : textContent;
    return truncatedText;
  };
  const fetchBlogs = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await Instance.get("/discover/blog", {
        params: { page, limit: itemsPerPage },
      });
      console.log("Blogs", response);
      dispatch(setBlogs(response.data || []));
      //   setBlogList(response.data || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching blog list :", error);
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
          console.error("Error deleting blog:", error);
        }
      },
    });
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage,fetchBlogs]);

  const dataSource = useMemo(() => {
    if (searchText.trim() === "") return BlogsList;
    return BlogsList.filter((blog) =>
      `${blog.heading}{}${blog.subheading}{}${blog.content}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [searchText, BlogsList]);

  const columns = [
    {
      title: "Heading",
      dataIndex: "heading",
      className: "campaign-performance-table-column",
      sorter: (a, b) => a.heading.localeCompare(b.heading),
    },
    {
      title: "Sub Heading",
      dataIndex: "subHeading",
      className: "campaign-performance-table-column",
      render: (text) => truncateText(text),
    },
    {
      title: "Content",
      dataIndex: "content",
      className: "campaign-performance-table-column",
      render: (content) => {
        const truncatedHTML = truncateHTML(content, 15);
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(truncatedHTML),
            }}
          />
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="campaign-performance-table-action-icons">
          <div
            className="campaign-performance-table-eye-icon"
            onClick={() => showViewModal(record)}
          >
            <FiEye />
          </div>
          <div
            className="campaign-performance-table-edit-icon"
            onClick={() => showEditModal(record)}
          >
            <FiEdit />
          </div>
          <div
            className="campaign-performance-table-delete-icon"
            onClick={() => handleDeleteBlog(record._id)}
          >
            <FiTrash2 />
          </div>
        </div>
      ),
      className: "campaign-performance-table-column",
    },
  ];

  return (
    <div className="container mt-1">
      {isLoading ? (
        <Loader />
      ) : BlogsList.length > 0 ? (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <div className="user-engagement-header">
              <h3>Blogs List</h3>
            </div>
            <div className="d-flex align-items-center gap-3">
              <button
                className="d-flex gap-2 align-items-center rfh-basic-button"
                onClick={showModal}
              >
                <GoPlus />
                Add Blog
              </button>
            </div>
          </div>
          <div className="campaign-performance-table-head mt-4">
            <div className="d-flex flex-column flex-md-row gap-3 align-items-center justify-content-end">
              <div className="search-container">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search anything here"
                  className="search-input-table"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-3">
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{
                  current: currentPage,
                  pageSize: itemsPerPage,
                  total: totalRows,
                  onChange: (page) => setCurrentPage(page),
                  showSizeChanger: false,
                }}
                className="campaign-performance-table overflow-y-auto"
                bordered={false}
              />
            </div>
          </div>
          <div className="d-flex justify-content-start mt-2">
            <button
              className="d-flex gap-2 align-items-center rfh-basic-button"
              onClick={() => navigate("/marketing/in-app-campaign")}
            >
              <FaAngleLeft />
              Back
            </button>
          </div>
        </>
      ) : (
        <div className="container">
          <div className="no-data-container">
            <img src={Empty_survey_image} alt="" />
          </div>
          <div className="no-data-container-text d-flex flex-column justify-content-center">
            <h4>No Blogs Found</h4>
            <p>
              Currently, there are no blogs available to display.
              <br /> Please check back later or contact support for further
              assistance if this is an error.
            </p>
            <div className="d-flex justify-content-center">
              <button className="rfh-basic-button" onClick={showModal}>
                <FaPlus /> Create Blog
              </button>
            </div>
          </div>
        </div>
      )}
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
  );
};

export default BlogsTable;
