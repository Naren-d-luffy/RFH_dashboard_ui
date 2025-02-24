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
import AddTechnology from "./AddTechnology";
import EditTechnology from "./EditTechnology";
import { showDeleteMessage, showSuccessMessage } from "../../../globalConstant";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ViewTechnology from "./ViewTechnology";
import {
  deleteTechnology,
  setTechnology,
} from "../../../Features/TechnologySlice";

export const TechnologyList = () => {
  const [modals, setModals] = useState({
    event: false,
    technology: false,
    edit: false,
  });
  const [selectedTechnology, setSelectedTechnology] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const technologyList = useSelector((state) => state.technology.technologies);

  const toggleModal = (modalType) =>
    setModals((prev) => ({ ...prev, [modalType]: !prev[modalType] }));

  const handleEditClick = (technology) => {
    setSelectedTechnology(technology);
    toggleModal("edit");
  };

  const handleDeleteClick = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/depcat/technology/${_id}`);
          if (response.status === 200 || response.status === 204) {
            showSuccessMessage("Deleted successfully", "Details deleted");
            dispatch(deleteTechnology(_id));
          }
        } catch (error) {
          console.error("Error deleting technology:", error);
          message.error("Error deleting technology", error);
        }
      },
    });
  };

  const handleCardClick = (technology, e) => {
    e.stopPropagation();
    setSelectedTechnology(technology);
    setIsViewModalOpen(true);
  };

  const sortMenu = (technology) => (
    <Menu>
      <Menu.Item
        key="edit"
        className="filter-menu-item"
        onClick={(e) => {
          e.domEvent.stopPropagation();
          handleEditClick(technology);
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
          handleDeleteClick(technology._id);
        }}
      >
        <RiDeleteBin7Line
          style={{ color: "var(--red-color)", marginRight: "4px" }}
        />
        Delete
      </Menu.Item>
    </Menu>
  );

  const renderTechnologyCard = (technology) => (
    <div className="col-lg-4" key={technology._id}>
      <div
        className="upcoming-event-card p-3"
        onClick={(e) => handleCardClick(technology, e)}
        style={{ cursor: "pointer" }}
      >
        <div className="action-icon-container">
          <Dropdown overlay={() => sortMenu(technology)} trigger={["click"]}>
            <button
              className="action-icon-button"
              onClick={(e) => e.stopPropagation()}
            >
              <BsThreeDotsVertical />
            </button>
          </Dropdown>
        </div>

        <div className="d-flex justify-content-center align-items-center mb-3">
          <img src={technology.thumbnail} alt={technology.heading} />
        </div>

        <div>
          <div className="d-flex justify-content-between mb-2">
            <h4>{technology.heading}</h4>
            <span>
              {new Date(technology.createdAt).toLocaleDateString("en-GB")}
            </span>
          </div>
          <p>{technology.subHeading}</p>
          {/* <p>
            <span
              dangerouslySetInnerHTML={{
                __html: sanitizeContent(truncateText(technology.content, 15)),
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
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const fetchTechnologyList = useCallback(async () => {
    try {
      const response = await Instance.get("/depcat/technology");
      dispatch(setTechnology(response.data));
    } catch (error) {
      console.error("Error fetching technology list:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchTechnologyList();
  }, [fetchTechnologyList]);

  return (
    <div className="row mt-4">
      <div className="marketing-categories-section">
        <div className="row mt-4">
          <div className="events-header-container">
            <h6>Technology</h6>
            <div className="events-buttons">
              <button
                className="rfh-basic-button"
                onClick={() => toggleModal("technology")}
              >
                <GoPlus size={20} /> Add Technology
              </button>
              <button
                className="rfh-view-all-button"
                onClick={() => navigate("/view-all-technology-list")}
              >
                View all
              </button>
            </div>
          </div>
          <div className="mt-4">
            <Slider
              {...sliderSettings}
              key={Object.keys(technologyList).length}
            >
              {technologyList && Object.keys(technologyList).length > 0 ? (
                Object.entries(technologyList)
                  .filter(
                    ([key, technology]) =>
                      key !== "status" && !technology.isOverview
                  ) // Exclude items with isOverview: true
                  .reverse()
                  .map(([key, technology]) => renderTechnologyCard(technology))
              ) : (
                <p>No data available</p>
              )}
            </Slider>
          </div>
          <AddTechnology
            open={modals.technology}
            handleCancel={() => toggleModal("technology")}
          />
          <EditTechnology
            open={modals.edit}
            handleCancel={() => toggleModal("edit")}
            technologyData={selectedTechnology}
          />
          <ViewTechnology
            open={isViewModalOpen}
            handleCancel={() => setIsViewModalOpen(false)}
            technologyData={selectedTechnology}
          />
        </div>
      </div>
    </div>
  );
};

export default TechnologyList;
