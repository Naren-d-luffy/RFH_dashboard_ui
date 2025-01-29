import React, { useCallback, useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { Dropdown, Menu } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { Instance } from "../../../../AxiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, setEvent } from "../../../../Features/DiscoverEventsCard";
import AddEventsList from "./AddEventsList";
import EditEventsList from "./EditEventsList";
import ViewEventList from "./ViewEventList";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
  showDeleteMessage,
  showSuccessMessage,
} from "../../../../globalConstant";

export const UpcomingEventList = () => {
  const [modals, setModals] = useState({
    event: false,
    video: false,
    edit: false,
  });
  const [, setIsLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const eventsData = useSelector((state) => state.discoverevent.events);
  const itemsPerPage = 100;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchEvenInfo = useCallback(
    async (page=1) => {
      setIsLoading(true);
      try {
        const response = await Instance.get(`/discover/card`, {
          params: { page, limit: itemsPerPage },
        });
        dispatch(setEvent(response.data.data));
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, itemsPerPage]
  );
  useEffect(() => {
    fetchEvenInfo();
  }, [fetchEvenInfo]);

  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const toggleModal = (modalType) =>
    setModals((prev) => ({ ...prev, [modalType]: !prev[modalType] }));

  const handleDeleteEvent = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/discover/card/${_id}`);
          if (response.status === 200 || response.status === 204) {
            showSuccessMessage("Deleted successfully", "Details deleted");
            dispatch(deleteEvent(_id));
          }
        } catch (error) {
          console.error("Error deleting event:", error);
        }
      },
    });
  };

  const filterMenu = (event) => (
    <Menu>
      <Menu.Item
        key="edit"
        className="filter-menu-item"
        onClick={() => {
          setSelectedEvent(event);
          setIsEditModalOpen(true);
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
          setIsViewModalOpen(true);
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

  const renderEventCard = (event) => (
    <div className="col-lg-4" key={event._id}>
      <div className="upcoming-event-card p-3">
        <div className="action-icon-container">
          <Dropdown overlay={() => filterMenu(event)} trigger={["click"]}>
            <button className="action-icon-button">
              <BsThreeDotsVertical />
            </button>
          </Dropdown>
        </div>

        <div className="d-flex justify-content-center align-items-center mb-3">
          <img src={event.image} alt={event.title} />
        </div>

        <div>
          <div className="d-flex justify-content-between mb-2">
            <h4>{event.title}</h4>
            <span>{new Date(event.createdAt).toLocaleDateString("en-GB")}</span>
          </div>
          <p>{truncateText(event.description, 20)}</p>
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
    <div className="row mt-4">
      <div className="marketing-categories-section">
        <div className="row mt-4">
          <div className="events-header-container">
            <h6>Upcoming Events</h6>
            <div className="events-buttons">
              <button
                className="rfh-view-all-button"
                onClick={() => navigate("/view-all-events")}
              >
                View all
              </button>
              <button
                className="rfh-basic-button"
                onClick={() => toggleModal("event")}
              >
                <GoPlus size={20} /> Add Events
              </button>
            </div>
          </div>

          <div className="mt-4">
            <Slider key={Object.keys(eventsData).length} {...sliderSettings}>
              {eventsData && Object.keys(eventsData).length > 0 ? (
                Object.values(eventsData)?.map((event) =>
                  renderEventCard(event)
                )
              ) : (
                <p>No data available</p>
              )}
            </Slider>
          </div>
          <AddEventsList
            open={modals.event}
            handleCancel={() => toggleModal("event")}
          />
          <EditEventsList
            open={isEditModalOpen}
            handleCancel={() => setIsEditModalOpen(false)}
            eventsData={selectedEvent}
          />
          <ViewEventList
            open={isViewModalOpen}
            handleCancel={() => setIsViewModalOpen(false)}
            eventsData={selectedEvent}
          />
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventList;
