import React, { useCallback, useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Dropdown, Menu } from "antd";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddLatestCamps from "./AddLatestCamp";
import { Instance } from "../../../../AxiosConfig";
import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import EditCamps from "./EditCamp";
import {
  
  showDeleteMessage,
  showSuccessMessage,
} from "../../../../globalConstant";
import { useSelector, useDispatch } from "react-redux";
import { deleteCamp, setCamps } from "../../../../Features/CampSlice";
import { FiEye } from "react-icons/fi";
import ViewLatestCamp from "./ViewLatestCamp";
import { useNavigate } from "react-router-dom";
export const LatestCampsList = () => {
  const [modals, setModals] = useState({
    program: false,
    camp: false,
    clinic: false,
  });
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState([]);
  const dispatch = useDispatch();
  const camps = useSelector((state) => state.camps.camps);

  const showEditModal = (camp) => {
    setSelectedCamp(camp);
    setIsEditModalOpen(true);
  };

  const showViewtModal = (camp) => {
    setSelectedCamp(camp);
    setIsViewModalOpen(true);
  };

  const handleCancelEditModal = () => {
    setSelectedCamp(null);
    setIsEditModalOpen(false);
  };

  const handleCancelViewModal = () => {
    setSelectedCamp(null);
    setIsViewModalOpen(false);
  };

  const filterMenu = (camp) => (
    <Menu>
      <Menu.Item
        key="edit"
        className="filter-menu-item"
        onClick={() => {
          setSelectedCamp(camp);
          showEditModal(camp);
        }}
      >
        <BiEdit style={{ color: "var(--primary-green)", marginRight: "4px" }} />
        Edit
      </Menu.Item>
      <Menu.Item
        key="view"
        className="filter-menu-item"
        onClick={() => {
          setSelectedCamp(camp);
          showViewtModal(camp);
        }}
      >
        <FiEye style={{ color: "var(--primary-green)", marginRight: "4px" }} />
        View
      </Menu.Item>
      <Menu.Item
        key="delete"
        className="filter-menu-item"
        onClick={() => {
          handleDeleteCamp(camp._id);
        }}
      >
        <RiDeleteBin7Line
          style={{ color: "var(--red-color)", marginRight: "4px" }}
        />
        Delete
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    fetchCampList();
  }, []);

  const toggleModal = (modalType) =>
    setModals((prev) => ({ ...prev, [modalType]: !prev[modalType] }));

  const fetchCampList = useCallback(async () => {
    try {

      const response = await Instance.get(`/camp`);
// console.log("camps",response)
      if (response.status === 200 || response.status === 201) {
        dispatch(setCamps(response.data.data));
      }
    } catch (error) {
      console.error("Error fetching camp:", error);
    }
  },[dispatch]);

  useEffect(() => {
    fetchCampList();
  }, [fetchCampList]);

  const handleDeleteCamp = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/camp/${_id}`);
          if (response.status === 200) {
            showSuccessMessage("Deleted successfully", "Details deleted");
            dispatch(deleteCamp(_id));
            console.log(response);
          }
        } catch (error) {
          console.error("Error deleting Camp:", error);
        }
      },
    });
  };

  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const renderLatestCamps = (camp) => {
    const location = camp.location ? camp.location.split(",") : [];
    const [lat, lng] = location;
    return (
      <div className="col-lg-4" key={camp._id}>
        <div className="recommended-latest-camp">
          <div className="recommended-latest-camp-map position-relative">
            {/* Icon positioned above the iframe */}
            <div className="latest-camp-icon-container">
              <Dropdown overlay={filterMenu(camp)} trigger={["click"]}>
                <button className="action-icon-button">
                  <BsThreeDotsVertical />
                </button>
              </Dropdown>
            </div>
            <iframe
              src={`https://www.google.com/maps?q=${lat},${lng}&hl=es;z=14&output=embed`}
              allowFullScreen
              title="camp-location"
              style={{ height: "250px", width: "100%" }}
            ></iframe>
          </div>
          <div className="recommend-latest-camp-content p-3">
            <h4>{camp.campName}</h4>
            <p>{truncateText(camp.description, 15)}</p>
            <div className="d-flex gap-3">
              <p>
                <CiCalendarDate /> {new Date(camp.date).toLocaleDateString()}
              </p>
              <p>
                <IoMdTime /> {camp.time}
              </p>
            </div>
            <p>
              <CiLocationOn /> {camp.address}
            </p>
          </div>
        </div>
      </div>
    );
  };

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
            <h6>Latest Camps</h6>

            <div className="events-buttons">
              <button
                className="rfh-view-all-button"
                onClick={() => navigate("/view-all-camp-table")}
              >
                View all
              </button>
              <button
                className="rfh-basic-button"
                onClick={() => toggleModal("camp")}
              >
                <GoPlus size={20} /> Add Camp
              </button>
            </div>
          </div>
          <div className="mt-4">
            <Slider {...sliderSettings} key={Object.keys(camps).length}>
              {camps && Object.keys(camps).length > 0 ? (
                Object.values(camps)?.map((camp) => renderLatestCamps(camp))
              ) : (
                <p>No data available</p>
              )}
            </Slider>
          </div>
          <AddLatestCamps
            open={modals.camp}
            handleCancel={() => toggleModal("camp")}
          />
          <EditCamps
            open={isEditModalOpen}
            handleCancel={handleCancelEditModal}
            campDataa={selectedCamp}
          />
          <ViewLatestCamp
            open={isViewModalOpen}
            handleCancel={handleCancelViewModal}
            campDataa={selectedCamp}
          />
        </div>
      </div>
    </div>
  );
};
