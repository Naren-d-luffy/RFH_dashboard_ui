import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddReadingMaterials from "./AddReadingMaterials";
import { Dropdown, Menu } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { Instance } from "../../../../AxiosConfig";
import EditReadingMaterials from "./EditReadingMaterials";
import { FiEye } from "react-icons/fi";
import ViewReadingMaterials from "./ViewReadingMaterials";
import {
  showDeleteMessage,
  showSuccessMessage,
} from "../../../../globalConstant";
import {
  deleteReadingMaterials,
  setReadingMaterials,
} from "../../../../Features/ReadingMaterialsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../Loader";
const CategoriesReadingMaterials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedReadingmaterial, setSelectedReadingmaterial] = useState(null);
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const showEditModal = () => setIsEditModalOpen(true);
  const handleEditCancel = () => setIsEditModalOpen(false);
  const showViewModal = () => setIsViewModalOpen(true);
  const handleViewCancel = () => setIsViewModalOpen(false);
  const [isLoading, setIsLoading] = useState(false);

  const readingMaterialsData = useSelector(
    (state) => state.readingmaterials.readingmaterials
  );
  const navigate = useNavigate();

  const itemsPerPage = 100;
  const dispatch = useDispatch();
  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const sortMenu = (readingmaterial) => (
    <Menu>
      <Menu.Item
        key="edit"
        className="filter-menu-item"
        onClick={() => {
          setSelectedReadingmaterial(readingmaterial);
          showEditModal();
        }}
      >
        <BiEdit style={{ color: "var(--primary-green)", marginRight: "4px" }} />
        Edit
      </Menu.Item>
      <Menu.Item
        key="view"
        className="filter-menu-item"
        onClick={() => {
          setSelectedReadingmaterial(readingmaterial);
          showViewModal();
        }}
      >
        <FiEye style={{ color: "var(--primary-green)", marginRight: "4px" }} />
        View
      </Menu.Item>
      <Menu.Item
        key="delete"
        className="filter-menu-item"
        onClick={() => deleteReadingMaterial(readingmaterial._id)}
      >
        <RiDeleteBin7Line
          style={{ color: "var(--red-color)", marginRight: "4px" }}
        />
        Delete
      </Menu.Item>
    </Menu>
  );

  const deleteReadingMaterial = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/reading-material/${_id}`);
          if (response.status === 200) {
            showSuccessMessage("Deleted successfully", "Details deleted");
            dispatch(deleteReadingMaterials(_id));
          }
        } catch (error) {
          console.error("Error deleting readingmaterial:", error);
        }
      },
    });
  };
  const fetchReadingMaterials = async (page) => {
    setIsLoading(true);
    try {
      const response = await Instance.get(`/reading-material`, {
        params: { page, limit: itemsPerPage },
      });
      dispatch(setReadingMaterials(response.data));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching reading materials:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReadingMaterials();
  }, []);

  const renderImageCard = (readingmaterial) => (
    <div className="col-lg-4" key={readingmaterial._id}>
      <div className="upcoming-event-card p-3" style={{ position: "relative" }}>
        <div className="treatment-info-icon-container">
          <Dropdown overlay={sortMenu(readingmaterial)} trigger={["click"]}>
            <button className="action-icon-button">
              <BsThreeDotsVertical />
            </button>
          </Dropdown>
        </div>

        <div className="d-flex justify-content-center align-items-center mb-3">
          <img src={readingmaterial.thumbnail} alt={readingmaterial.title} />
        </div>
        <div>
          <div className="d-flex justify-content-between mb-2">
            <h4>{readingmaterial.title}</h4>
          </div>
          <p>{truncateText(readingmaterial.description, 30)}</p>
        </div>
      </div>
    </div>
  );

  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", zIndex: "1000" }}
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
        style={{ ...style, display: "block", zIndex: "1000" }}
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
    ],
  };

  return (
    <div className="container">
      <div className="row mt-4 marketing-categories-section">
        <div className="events-header-container">
          <h6>Reading Materials</h6>
          <div className="events-buttons">
            <button
              className="rfh-view-all-button"
              onClick={() => navigate("/view-all-readingmaterials")}
            >
              View all
            </button>
            <button className="rfh-basic-button" onClick={showModal}>
              <GoPlus size={20} /> Add
            </button>
          </div>
        </div>
        {isLoading && <Loader />}
        <div className="row mt-3">
          <Slider {...sliderSettings}>
            {readingMaterialsData && readingMaterialsData.length > 0 ? (
              readingMaterialsData.map((readingmaterial) =>
                renderImageCard(readingmaterial)
              )
            ) : (
              <p>No data available</p>
            )}
          </Slider>
        </div>
      </div>
      <AddReadingMaterials open={isModalOpen} handleCancel={handleCancel} />
      <EditReadingMaterials
        open={isEditModalOpen}
        handleCancel={handleEditCancel}
        readingmaterialsData={selectedReadingmaterial}
      />
      <ViewReadingMaterials
        open={isViewModalOpen}
        handleCancel={handleViewCancel}
        readingmaterialsData={selectedReadingmaterial}
      />
    </div>
  );
};

export default CategoriesReadingMaterials;
