import React, { useState, useEffect } from "react";
import { Button, Dropdown, Menu } from "antd";
import { FiEye, FiSearch } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { VscSettings } from "react-icons/vsc";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddEventsGastroIllness from "./AddEventsGastroIllness";
import EditEventsGastroIllness from "./EditEventsGastroIllness";
import ViewEventsGastroIllness from "./ViewEventsGastroIllness";
import { Instance } from "../../../../AxiosConfig";
import {
  showDeleteMessage,
  showSuccessMessage,
} from "../../../../globalConstant";
import {
  deleteGastroIllness,
  setGastroIllness,
} from "../../../../Features/GastroIllnessSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EducationCategoriesGastroIllness = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [gastroIllnessList, setGastroIllnessList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const gastroEvents = useSelector(
    (state) => state.gastroIllness.gastroIllness || []
  );
  const itemsPerPage = 100;

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const showEditModal = () => setIsEditModalOpen(true);
  const handleEditCancel = () => setIsEditModalOpen(false);
  const showViewModal = () => setIsViewModalOpen(true);
  const handleViewCancel = () => setIsViewModalOpen(false);

  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const sortMenu = (event) => (
    <Menu>
      <Menu.Item
        key="edit"
        className="filter-menu-item"
        onClick={() => {
          setSelectedEvent(event);
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
          setSelectedEvent(event);
          showViewModal();
        }}
      >
        <FiEye style={{ color: "var(--primary-green)", marginRight: "4px" }} />
        View
      </Menu.Item>
      <Menu.Item
        key="delete"
        className="filter-menu-item"
        onClick={() => handleDeleteEvent(event._id)}
      >
        <RiDeleteBin7Line
          style={{ color: "var(--red-color)", marginRight: "4px" }}
        />
        Delete
      </Menu.Item>
    </Menu>
  );

  const fetchGastroEvents = async (page) => {
    setIsLoading(true);
    try {
      const response = await Instance.get("/gastro", {
        params: { page, limit: itemsPerPage },
      });
      dispatch(setGastroIllness(response.data.gastros || []));
      setGastroIllnessList(response.data.gastros || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching gastro events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/gastro/${_id}`);
          if (response.status === 200) {
            showSuccessMessage("Deleted successfully", "Details deleted");
            dispatch(deleteGastroIllness(_id));
          }
        } catch (error) {
          console.error("Error deleting event:", error);
        }
      },
    });
  };

  useEffect(() => {
    fetchGastroEvents();
  }, []);

  const renderEventCard = (event) => (
    <div className="col-lg-4" key={event._id}>
      <div className="upcoming-event-card p-3" style={{ position: "relative" }}>
        <div className="treatment-info-icon-container">
          <Dropdown overlay={sortMenu(event)} trigger={["click"]}>
            <button className="action-icon-button">
              <BsThreeDotsVertical />
            </button>
          </Dropdown>
        </div>

        <div className="d-flex justify-content-center align-items-center mb-3">
          <img src={event.thumbnail} alt={event.title} />
        </div>
        <div>
          <div className="d-flex justify-content-between mb-2">
            <h4>{event.title}</h4>
          </div>
          <p>{truncateText(event.description, 30)}</p>
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
    infinite: true,
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
          <div className="d-flex justify-content-between">
            <h6>Gastro Illness</h6>
            <div className="d-flex gap-2">
              <button
                className="rfh-view-all-button"
                onClick={() => navigate("/view-all-gastro-illness")}
              >
                View all
              </button>
              <button className="rfh-basic-button" onClick={showModal}>
                <GoPlus size={20} /> Add Events
              </button>
            </div>
          </div>
          <div className="mt-3">
            <Slider {...sliderSettings}>
              {/* {gastroEvents.map((event) => renderEventCard(event))} */}
              {Object.values(gastroEvents).map((event, index) => renderEventCard(event, index))}
            </Slider>
          </div>
        </div>
      </div>

      <AddEventsGastroIllness open={isModalOpen} handleCancel={handleCancel} />
      <EditEventsGastroIllness
        open={isEditModalOpen}
        handleCancel={handleEditCancel}
        EventData={selectedEvent}
      />
      <ViewEventsGastroIllness
        open={isViewModalOpen}
        handleCancel={handleViewCancel}
        EventData={selectedEvent}
      />
    </div>
  );
};

export default EducationCategoriesGastroIllness;
