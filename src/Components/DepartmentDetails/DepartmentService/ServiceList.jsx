import React, { useCallback, useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { Dropdown, Menu, message } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { Instance } from "../../../AxiosConfig";
import { showDeleteMessage, showSuccessMessage } from "../../../globalConstant";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteService, setService } from "../../../Features/ServiceSlice";
import EditService from "./EditService";
import AddService from "./AddService";
import ViewService from "./ViewService";

const ServiceList = () => {
  const [modals, setModals] = useState({
    event: false,
    service: false,
    edit: false,
    view: false,
  });
  const [selectedService, setSelectedService] = useState(null);
  const dispatch = useDispatch();
  const [, setIsEditModalOpen] = useState(false);
  const [, setIsViewModalOpen] = useState(false);
  const navigate = useNavigate();
  const servicesList = useSelector((state) => state.service.services);

  const toggleModal = (modalType) =>
    setModals((prev) => ({ ...prev, [modalType]: !prev[modalType] }));

  const handleEditClick = (service) => {
    setSelectedService(service);
    toggleModal("edit");
  };

  const handleDeleteClick = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/depcat/service/${_id}`);
          if (response.status === 200 || response.status === 204) {
            dispatch(deleteService(_id));
            showSuccessMessage("Deleted successfully");
          }
        } catch (error) {
          console.error("Error deleting service:", error);
          message.error(`${error?.response?.data?.message || "An unexpected error occurred"}`);
        }
      },
    });
  };

  const handleCardClick = (service, e) => {
    e.stopPropagation(); 
    setSelectedService(service);
    toggleModal("view");
  };

  const sortMenu = (service) => (
    <Menu>
      <Menu.Item
        key="edit"
        className="filter-menu-item"
        onClick={(e) => {
          e.domEvent.stopPropagation(); 
          handleEditClick(service);
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
          handleDeleteClick(service._id);
        }}
      >
        <RiDeleteBin7Line
          style={{ color: "var(--red-color)", marginRight: "4px" }}
        />
        Delete
      </Menu.Item>
    </Menu>
  );

  const renderServiceCard = (service) => (
    <div className="col-lg-4" key={service._id}>
      <div
        className="upcoming-event-card p-3"
        onClick={(e) => handleCardClick(service, e)}  
        style={{ cursor: "pointer" }}
      >
        <div className="action-icon-container">
          <Dropdown overlay={() => sortMenu(service)} trigger={["click"]}>
            <button
              className="action-icon-button"
              onClick={(e) => e.stopPropagation()}
            >
              <BsThreeDotsVertical />
            </button>
          </Dropdown>
        </div>

        <div className="d-flex justify-content-center align-items-center mb-3">
          <img src={service.thumbnail} alt={service.heading} />
        </div>
        <div>
          <div className="d-flex justify-content-between mb-2">
            <h4>{service.heading}</h4>
          </div>
          <p>{service.subHeading}</p>
          {/* <p>
            <span
              dangerouslySetInnerHTML={{
                __html: sanitizeContent(truncateText(service.content, 3)),
              }}
            ></span>
          </p>{" "} */}
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

  const fetchFacilityList = useCallback(async () => {
    try {
      const response = await Instance.get("depcat/service");
      dispatch(setService(response.data));
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchFacilityList();
  }, [fetchFacilityList]);

  return (
    <div className="row mt-4">
      <div className="marketing-categories-section">
        <div className="row mt-4">
          <div className="events-header-container">
            <h6>Our Services</h6>
            <div className="events-buttons">
              <button
                className="rfh-basic-button"
                onClick={() => toggleModal("service")}
              >
                <GoPlus size={20} /> Add Services
              </button>
              <button
                className="rfh-view-all-button"
                onClick={() => navigate("/view-all-service-lists")}
              >
                View all
              </button>
            </div>
          </div>
          <div className="mt-4">
            <Slider {...sliderSettings} key={servicesList?.length}>
              {servicesList && servicesList.length > 0 ? (
                [...servicesList].reverse()?.map((service, index) =>
                  renderServiceCard(service, index)
                )
              ) : (
                <p>No data available</p>
              )}
            </Slider>
          </div>
          <AddService
            open={modals.service}
            handleCancel={() => toggleModal("service")}
            serviceData={selectedService}
          />
          <EditService
            open={modals.edit}
            handleCancel={() => toggleModal("edit")}
            serviceData={selectedService}
          />
          <ViewService
            open={modals.view}
            handleCancel={() => toggleModal("view")}
            serviceData={selectedService}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
