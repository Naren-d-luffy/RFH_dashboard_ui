import React, { useCallback, useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { Dropdown, Menu, message } from "antd";
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
import { useNavigate } from "react-router-dom";
// import DOMPurify from "dompurify";
 

import {
  showDeleteMessage,
  showSuccessMessage,
} from "../../../../globalConstant";
import { CiCalendarDate } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";

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
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const sanitizeContent = (content) => {
  //   return DOMPurify.sanitize(content);
  // };
  const fetchEvenInfo = useCallback(
    async (page = 1) => {
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

  // const truncateText = (text, wordLimit) => {
  //   if (!text) return "";
  //   const words = text.split(" ");
  //   return words.length > wordLimit
  //     ? words.slice(0, wordLimit).join(" ") + "..."
  //     : text;
  // };

  const toggleModal = (modalType) =>
    setModals((prev) => ({ ...prev, [modalType]: !prev[modalType] }));

  const handleDeleteEvent = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/discover/card/${_id}`);
          if (response.status === 200 || response.status === 204) {
            showSuccessMessage("Deleted successfully event");
            dispatch(deleteEvent(_id));
          }
        } catch (error) {
          message.error("Error deleting event");
          console.error("Error deleting event:", error);
        }
      },
    });
  };

  const handleCardClick = (event) => {
    if (!isEditModalOpen) {
      setSelectedEvent(event);
      setIsViewModalOpen(true);
    }
  };

  const filterMenu = (event) => (
    <Menu onClick={(e) => e.domEvent.stopPropagation()}>
      <Menu.Item
        key="edit"
        className="filter-menu-item"
        onClick={(e) => {
          e.domEvent.stopPropagation();
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

  const renderEventCard = (event) => (
    <div className="col-lg-4" key={event._id}>
      <div
        className="upcoming-event-card p-3"
        onClick={() => handleCardClick(event)}
        style={{ cursor: "pointer" }}
      >
        <div className="action-icon-container">
          <Dropdown overlay={() => filterMenu(event)} trigger={["click"]}>
            <button
              className="action-icon-button"
              onClick={(e) => e.stopPropagation()}
            >
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
            <span>{event.isActive ? "True" : "False"}</span>
            </div>
          <p><CiCalendarDate />&nbsp;{new Date(event.createdAt).toLocaleDateString("en-GB")}</p>
          <p><IoMdTime />&nbsp;{event.time}</p>
          {/* <p>
            <span
              dangerouslySetInnerHTML={{
                __html: sanitizeContent(truncateText(event.description, 15)),
              }}
            ></span>
          </p> */}
          {/* <p>{truncateText(event.description, 30)}</p> */}
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
    <div className="row mt-4">
      <div className="marketing-categories-section">
        <div className="row mt-4">
          <div className="events-header-container">
            <h6>Events</h6>
            <div className="events-buttons">
              <button
                className="rfh-basic-button"
                onClick={() => toggleModal("event")}
              >
                <GoPlus size={20} /> Add Events
              </button>
              <button
                className="rfh-view-all-button"
                onClick={() => navigate("/view-all-events")}
              >
                View all
              </button>
            </div>
          </div>

          <div className="mt-4">
            <Slider key={Object.keys(eventsData).length} {...sliderSettings}>
              {eventsData && Object.keys(eventsData).length > 0 ? (
                Object.values(eventsData)
                  .reverse()
                  ?.map((event) => renderEventCard(event))
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
