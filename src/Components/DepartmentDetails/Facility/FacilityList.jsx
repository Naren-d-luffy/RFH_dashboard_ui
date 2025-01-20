import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { Dropdown, Menu } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { Instance } from "../../../AxiosConfig";
import AddFacility from "./AddFacility";
import EditFacility from "./EditFacility";
import {
  showDeleteMessage,
  showSuccessMessage,
} from "../../../globalConstant";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFacility } from "../../../Features/FacilitySlice";

export const FacilityList = () => {
  const [modals, setModals] = useState({
    event: false,
    facility: false,
    edit: false,
  });
  const [selectedFacility, setSelectedFacility] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const facilities = useSelector((state) => state.facility.facilities);

  console.log("facilities", facilities);

  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };
  const toggleModal = (modalType) =>
    setModals((prev) => ({ ...prev, [modalType]: !prev[modalType] }));

  const items = [
    { label: "Upcoming Events", key: "1" },
    { label: "Recomended", key: "2" },
    { label: "Featured Programs", key: "3" },
    { label: "Latest Camps", key: "4" },
    { label: "Outstation Clinic", key: "5" },
  ];

  const handleEditClick = (facility) => {
    setSelectedFacility(facility);
    toggleModal("edit");
  };

  const handleDeleteClick = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/facilities/${_id}`);
          if (response.status === 200 || response.status === 204) {
            showSuccessMessage("Deleted successfully", "Details deleted");
          }
        } catch (error) {
          console.error("Error deleting facility:", error);
        }
      },
    });
  };

  const sortMenu = (facility) => (
    <Menu>
      <Menu.Item
        key="edit"
        className="filter-menu-item"
        onClick={() => handleEditClick(facility)}
      >
        <BiEdit style={{ color: "var(--primary-green)", marginRight: "4px" }} />
        Edit
      </Menu.Item>
      <Menu.Item
        key="delete"
        className="filter-menu-item"
        onClick={() => handleDeleteClick(facility._id)}
      >
        <RiDeleteBin7Line
          style={{ color: "var(--red-color)", marginRight: "4px" }}
        />
        Delete
      </Menu.Item>
    </Menu>
  );

  const renderFacilityCard = (facility) => (
    <div className="col-lg-4" key={facility._id}>
      <div className="upcoming-event-card p-3">
        <div className="action-icon-container">
          <Dropdown overlay={() => sortMenu(facility)} trigger={["click"]}>
            <button className="action-icon-button">
              <BsThreeDotsVertical />
            </button>
          </Dropdown>
        </div>

        <div className="d-flex justify-content-center align-items-center mb-3">
          <img
            src={facility.thumbnail}
            alt={facility.heading}
          />
        </div>

        <div>
          <div className="d-flex justify-content-between mb-2">
            <h4>{facility.subHeading}</h4>
            <span>{new Date(facility.createdAt).toLocaleDateString("en-GB")}</span>
          </div>
          <p>{truncateText(facility.content, 20)}</p>
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

  const fetchFacilityList = async () => {
    try {
      const response = await Instance.get("/depcat/facility");
      dispatch(setFacility(response.data));
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  };

  useEffect(() => {
    fetchFacilityList();
  }, []);

  return (
    <div className="row mt-4">
      <div className="marketing-categories-section">
        <div className="row mt-4">
          <div className="d-flex justify-content-between">
            <h6>Department Facility</h6>
            <div className="d-flex gap-2">
              <button
                className="rfh-view-all-button"
                onClick={() => navigate("/view-all-facility-list")}
              >
                View all
              </button>
              <button
                className="rfh-basic-button"
                onClick={() => toggleModal("facility")}
              >
                <GoPlus size={20} /> Add Facilities
              </button>
            </div>
          </div>
          <div className="mt-4">
            <Slider {...sliderSettings}>
              {facilities && Object.keys(facilities).length > 0 ? (
                Object.entries(facilities)
                  .filter(([key]) => key !== "status")
                  .map(([key, facility]) => renderFacilityCard(facility))
              ) : (
                <p>No data available</p>
              )}
            </Slider>
          </div>
          <AddFacility
            open={modals.facility}
            handleCancel={() => toggleModal("facility")}
            refreshList={fetchFacilityList}
          />
          <EditFacility
            open={modals.edit}
            handleCancel={() => toggleModal("edit")}
            facilityData={selectedFacility}
            refreshList={fetchFacilityList}
          />
        </div>
      </div>
    </div>
  );
};

export default FacilityList;
