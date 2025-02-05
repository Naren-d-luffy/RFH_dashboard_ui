import React, { useCallback, useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { Dropdown, Menu } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { Instance } from "../../../AxiosConfig";
import AddConditionWeTreat from "./AddConditionWeTreat";
import EditConditionWeTreat from "./EditConditionWeTreat";
import { showDeleteMessage, showSuccessMessage } from "../../../globalConstant";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ViewConditionWeTreat from "./ViewConditionWeTreat";
import {
  deleteConditionWeTreat,
  setConditionWeTreat,
} from "../../../Features/ConditionWeTreatSlice";
import DOMPurify from "dompurify";

export const ConditionWeTreatList = () => {
  const [modals, setModals] = useState({
    event: false,
    condition: false,
    edit: false,
  });
  const [selectedTechnology, setSelectedTechnology] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [, setIsEditModalOpen] = useState(false);

  const conditionwetreatList = useSelector(
    (state) => state.conditionwetreat.conditionwetreats
  );
  const sanitizeContent = (content) => {
    return DOMPurify.sanitize(content);
  };
  const toggleModal = (modalType) =>
    setModals((prev) => ({ ...prev, [modalType]: !prev[modalType] }));

  const handleEditClick = (condition) => {
    setSelectedTechnology(condition);
    toggleModal("edit");
  };

  const handleDeleteClick = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/depcat/treat/${_id}`);
          if (response.status === 200 || response.status === 204) {
            showSuccessMessage("Deleted successfully", "Details deleted");
            dispatch(deleteConditionWeTreat(_id));
          }
        } catch (error) {
          console.error("Error deleting condition we treat:", error);
        }
      },
    });
  };

  const handleCardClick = (condition, e) => {
    e.stopPropagation();
    setSelectedTechnology(condition);
    setIsViewModalOpen(true);
  };

  const sortMenu = (condition) => (
    <Menu>
      <Menu.Item
        key="edit"
        className="filter-menu-item"
        onClick={(e) => {
          e.domEvent.stopPropagation();
          handleEditClick(condition);
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
          handleDeleteClick(condition._id);
        }}
      >
        <RiDeleteBin7Line
          style={{ color: "var(--red-color)", marginRight: "4px" }}
        />
        Delete
      </Menu.Item>
    </Menu>
  );
  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };
  const renderConditionCard = (condition) => (
    <div className="col-lg-4" key={condition._id}>
      <div
        className="upcoming-event-card p-3"
        onClick={(e) => handleCardClick(condition, e)}
        style={{ cursor: "pointer" }}
      >
        <div className="action-icon-container">
          <Dropdown overlay={() => sortMenu(condition)} trigger={["click"]}>
            <button
              className="action-icon-button"
              onClick={(e) => e.stopPropagation()}
            >
              <BsThreeDotsVertical />
            </button>
          </Dropdown>
        </div>

        <div className="d-flex justify-content-center align-items-center mb-3">
          <img src={condition.thumbnail} alt={condition.heading} />
        </div>

        <div>
          <div className="d-flex justify-content-between mb-2">
            <h4>{condition.heading}</h4>
            <span>
              {new Date(condition.createdAt).toLocaleDateString("en-GB")}
            </span>
          </div>
          <p>{condition.subHeading}</p>
          <p>
            <span
              dangerouslySetInnerHTML={{
                __html: sanitizeContent(truncateText(condition.content, 3)),
              }}
            ></span>
          </p>
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

  const fetchConditionList = useCallback(async () => {
    try {
      const response = await Instance.get("/depcat/treat");
      dispatch(setConditionWeTreat(response.data));
    } catch (error) {
      console.error("Error fetching condition list:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchConditionList();
  }, [fetchConditionList]);

  return (
    <div className="row mt-4">
      <div className="marketing-categories-section">
        <div className="row mt-4">
          <div className="events-header-container">
            <h6>Condition We Treat List</h6>
            <div className="events-buttons">
              <button
                className="rfh-basic-button"
                onClick={() => toggleModal("condition")}
              >
                <GoPlus size={20} /> Add We Treat
              </button>
              <button
                className="rfh-view-all-button"
                onClick={() => navigate("/view-all-condition-we-treat-list")}
              >
                View all
              </button>
            </div>
          </div>
          <div className="mt-4">
            <Slider
              {...sliderSettings}
              key={Object.keys(conditionwetreatList).length}
            >
              {conditionwetreatList &&
              Object.keys(conditionwetreatList).length > 0 ? (
                Object.entries(conditionwetreatList)
                  .filter(([key]) => key !== "status")
                  .map(([key, condition]) => renderConditionCard(condition))
              ) : (
                <p>No data available</p>
              )}
            </Slider>
          </div>
          <AddConditionWeTreat
            open={modals.condition}
            handleCancel={() => toggleModal("condition")}
          />
          <EditConditionWeTreat
            open={modals.edit}
            handleCancel={() => toggleModal("edit")}
            conditionData={selectedTechnology}
          />
          <ViewConditionWeTreat
            open={isViewModalOpen}
            handleCancel={() => setIsViewModalOpen(false)}
            conditionData={selectedTechnology}
          />
        </div>
      </div>
    </div>
  );
};

export default ConditionWeTreatList;
