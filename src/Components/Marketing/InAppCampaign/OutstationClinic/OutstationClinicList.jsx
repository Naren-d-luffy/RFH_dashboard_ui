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
import {
  setOutstationClinic,
  deleteOutstationClinic,
} from "../../../../Features/OutstationClinicSlice";
import { useDispatch, useSelector } from "react-redux";
import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import AddOutstationClinic from "./AddOutstationClinic";
import EditOutstationClinic from "./EditOutstationClinic";
import ViewOutstationClinic from "./ViewOutstationClinic";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../Loader";

const OutstationClinicList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [, setSelectedClinic] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clinics = useSelector((state) => state.clinics.clinics || []);

  const handleCancel = () => setIsModalOpen(false);
  const handleEditCancel = () => setIsEditModalOpen(false);
  const handleViewCancel = () => setIsViewModalOpen(false);

  const showEditModal = () => setIsEditModalOpen(true);
  const showViewModal = () => setIsViewModalOpen(true);
  const showModal = () => setIsModalOpen(true);

  const itemsPerPage = 100;

  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const fetchOutstationClinic = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await Instance.get("/discover/clinic", {
        params: { page: 1, limit: itemsPerPage },
      });
      console.log("API response received:", response);
      dispatch(setOutstationClinic(response.data));
    } catch (error) {
      console.error("Error fetching clinics:", error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, itemsPerPage]);

  useEffect(() => {
    fetchOutstationClinic();
  }, [fetchOutstationClinic]);

  const handleDeleteClinic = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/discover/clinic/${_id}`);
          if (response.status === 200) {
            showSuccessMessage("Deleted successfully", "Details deleted");
            dispatch(deleteOutstationClinic(_id));
          }
        } catch (error) {
          message.error("Error deleting clinic", error);
          console.error("Error deleting clinic:", error);
        }
      },
    });
  };

  const handleCardClick = (clinic) => {
    if (!isEditModalOpen) {
      setSelectedClinic(clinic);
      setSelectedEvent(clinic);
      setIsViewModalOpen(true);
    }
  };

  const sortMenu = (clinic) => (
    <Menu onClick={(e) => e.domEvent.stopPropagation()}>
      <Menu.Item
        key="edit"
        className="filter-menu-item"
        onClick={(e) => {
          e.domEvent.stopPropagation();
          setIsEditModalOpen(true);
          setSelectedEvent(clinic);
          showEditModal();
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
          handleDeleteClinic(clinic._id);
        }}
      >
        <RiDeleteBin7Line
          style={{ color: "var(--red-color)", marginRight: "4px" }}
        />
        Delete
      </Menu.Item>
    </Menu>
  );

  const renderClinicCard = (clinic) => (
    <div className="col-lg-4" key={clinic._id}>
      <div
        className="outstation-clinic-upcoming-event-card p-3"
        style={{ position: "relative", cursor: "pointer" }}
        onClick={() => {
          handleCardClick(clinic);
          showViewModal();
        }}
      >
        <div className="action-icon-container">
          <Dropdown overlay={sortMenu(clinic)} trigger={["click"]}>
            <button
              className="action-icon-button"
              onClick={(e) => e.stopPropagation()}
            >
              <BsThreeDotsVertical />
            </button>
          </Dropdown>
        </div>
        <div className="d-flex justify-content-center align-items-center mb-3">
          <img
            src={clinic.image || "https://via.placeholder.com/150"}
            alt={clinic.name}
          />
        </div>
        <div className="outstation-clinic-data">
          <h4>{clinic.name}</h4>
          <div className="d-flex justify-content-between">
            <p>
              {clinic.rating} ({clinic.reviews} reviews)
            </p>
            <p>{clinic.experience} years experience</p>
          </div>
          <p>{clinic.patients} Patients Treated</p>
          <span>{truncateText(clinic.about, 8)}</span>
          <div className="">
            <p>
              <CiCalendarDate />{" "}
              {new Date(clinic.createdAt).toLocaleDateString()}
            </p>
            <p>
              <IoMdTime /> {clinic.timing}
            </p>
          </div>
          <span>
            <CiLocationOn />
            {truncateText(clinic.location, 5)}
          </span>
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
          <div className="row mt-4">
            <div className="events-header-container">
              <h6>Outstation/Speciality Clinic</h6>
              <div className="events-buttons">
                <button className="rfh-basic-button" onClick={showModal}>
                  <GoPlus size={20} /> Add Clinic
                </button>
                <button
                  className="rfh-view-all-button"
                  onClick={() => navigate("/view-all-outstation-clinic")}
                >
                  View all
                </button>
              </div>
            </div>
            <div className="mt-3">
              <Slider {...sliderSettings} key={clinics?.length}>
                {clinics && clinics.length > 0 ? (
                  [...clinics]
                  .reverse().map((clinic) => renderClinicCard(clinic))
                ) : (
                  <p>No data available</p>
                )}
              </Slider>
            </div>
          </div>
        </div>
        <AddOutstationClinic open={isModalOpen} handleCancel={handleCancel} />
        <EditOutstationClinic
          open={isEditModalOpen}
          handleCancel={handleEditCancel}
          EventData={selectedEvent}
        />
        <ViewOutstationClinic
          open={isViewModalOpen}
          handleCancel={handleViewCancel}
          EventData={selectedEvent}
        />
      </div>
    </>
  );
};

export default OutstationClinicList;
