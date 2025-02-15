import React, { useState, useEffect, useCallback } from "react";
import { Dropdown, Menu, message } from "antd";
import { GoPlus } from "react-icons/go";
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
// import DOMPurify from "dompurify";

const EducationCategoriesGastroIllness = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const gastroEvents = useSelector(
    (state) => state.gastroIllness.gastroIllness || []
  );
  // const sanitizeContent = (content) => {
  //   return DOMPurify.sanitize(content);
  // };
  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };
  const itemsPerPage = 100;

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const showEditModal = () => setIsEditModalOpen(true);
  const handleEditCancel = () => setIsEditModalOpen(false);
  const handleViewCancel = () => setIsViewModalOpen(false);

  const handleCardClick = (event) => {
    if (!isEditModalOpen) {
      setSelectedEvent(event);
      setIsViewModalOpen(true);
    }
  };

  const sortMenu = (event) => (
    <Menu onClick={(e) => e.domEvent.stopPropagation()}>
      <Menu.Item
        key="edit"
        className="filter-menu-item"
        onClick={(e) => {
          e.domEvent.stopPropagation();
          setSelectedEvent(event);
          showEditModal();
          setSelectedEvent(event);
          setIsEditModalOpen(true);
          setIsViewModalOpen(false);
        }}
      >
        <BiEdit style={{ color: "var(--primary-green)", marginRight: "4px" }} />
        Edit
      </Menu.Item>
      <Menu.Item
        key="delete"
        className="filter-menu-item"
        onClick={(e) => {
          e.domEvent.stopPropagation();
          handleDeleteEvent(event._id);
        }}
      >
        <RiDeleteBin7Line
          style={{ color: "var(--red-color)", marginRight: "4px" }}
        />
        Delete
      </Menu.Item>
    </Menu>
  );

  const fetchGastroEvents = useCallback(
    async (page) => {
      setIsLoading(true);
      try {
        const response = await Instance.get("/gastro", {
          params: { page, limit: itemsPerPage },
        });
        dispatch(setGastroIllness(response.data.data.gastros || []));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching gastro events:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );
  useEffect(() => {
    fetchGastroEvents();
  }, [fetchGastroEvents]);
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
          console.error("Error deleting overview:", error);
          message.error("Error deleting overview",error);

        }
      },
    });
  };

  const renderEventCard = (event) => (
    <div className="col-lg-4" key={event._id}>
      <div
        className="upcoming-event-card p-3"
        style={{ position: "relative", cursor: "pointer" }}
        onClick={() => handleCardClick(event)}
      >
        <div className="treatment-info-icon-container">
          <Dropdown overlay={sortMenu(event)} trigger={["click"]}>
            <button
              className="action-icon-button"
              onClick={(e) => e.stopPropagation()}
            >
              <BsThreeDotsVertical />
            </button>
          </Dropdown>
        </div>

        <div className="d-flex justify-content-center align-items-center mb-3">
          <img src={event.headerImage} alt={event.title} />
        </div>
        <div>
          <div className="d-flex justify-content-between mb-2">
            <h4>{event.title}</h4>
          </div>
          <p>{truncateText(event.description, 10)}</p>
          {/* <p>
            <span
              dangerouslySetInnerHTML={{
                __html: sanitizeContent(truncateText(event.content, 10)),
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
          <div className="events-header-container">
            <h6>Overview</h6>
            <div className="events-buttons">
              <button className="rfh-basic-button" onClick={showModal}>
                <GoPlus size={20} /> Add
              </button>
              <button
                className="rfh-view-all-button"
                onClick={() => navigate("/view-all-gastro-illness")}
              >
                View all
              </button>
            </div>
          </div>
          <div className="mt-3">
            <Slider {...sliderSettings} key={Object.keys(gastroEvents).length}>
              {/* {gastroEvents.map((event) => renderEventCard(event))} */}
              {gastroEvents && Object.keys(gastroEvents).length > 0 ? (
                Object.values(gastroEvents).reverse()?.map((event, index) =>
                  renderEventCard(event, index)
                )
              ) : (
                <p>No data available</p>
              )}
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
