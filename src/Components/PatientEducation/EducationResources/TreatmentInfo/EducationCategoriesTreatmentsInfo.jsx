import React, { useCallback, useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddTreatmentsInfo from "./AddTreatmentsInfo";
import { Dropdown, Menu, message } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { Instance } from "../../../../AxiosConfig";
import EditTreatmentsInfo from "./EditTreatmentsInfo";
import ViewTreatmentsInfo from "./ViewTreatmentsInfo";
import {
  showDeleteMessage,
  showSuccessMessage,
} from "../../../../globalConstant";
import {
  deleteTreatment,
  setTreatment,
} from "../../../../Features/TreatmentInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../Loader";
const EducationCategoriesTreatmentsInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const showEditModal = () => setIsEditModalOpen(true);
  const handleEditCancel = () => setIsEditModalOpen(false);
  const handleViewCancel = () => setIsViewModalOpen(false);
  const [isLoading, setIsLoading] = useState(false);
  const treatmentData = useSelector((state) => state.treatments.treatments);

  const navigate = useNavigate();

  const itemsPerPage = 100;
  const dispatch = useDispatch();
  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const handleCardClick = (event) => {
    if (!isEditModalOpen) {
      setSelectedTreatment(event);
      setIsViewModalOpen(true);
    }
  };

  const sortMenu = (treatment) => (
    <Menu onClick={(e) => e.domEvent.stopPropagation()}>
      <Menu.Item
        key="edit"
        className="filter-menu-item"
        onClick={(e) => {
          e.domEvent.stopPropagation();
          setSelectedTreatment(treatment);
          showEditModal();
          setSelectedTreatment(treatment);
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
          handleDeleteTreatment(treatment._id);
        }}
      >
        <RiDeleteBin7Line
          style={{ color: "var(--red-color)", marginRight: "4px" }}
        />
        Delete
      </Menu.Item>
    </Menu>
  );

  const handleDeleteTreatment = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/education/${_id}`);
          if (response.status === 200) {
            showSuccessMessage("Deleted successfully", "Details deleted");
            dispatch(deleteTreatment(_id));
          }
        } catch (error) {
          console.error("Error deleting treatment:", error);
          message.error("Error deleting treatment", error);
        }
      },
    });
  };
  const fetchTreatmentsInfo = useCallback(
    async (page) => {
      setIsLoading(true);
      try {
        const response = await Instance.get(`/education`, {
          params: { page, limit: itemsPerPage },
        });
        dispatch(setTreatment(response.data.data.educations));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching treatments:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, itemsPerPage]
  );

  useEffect(() => {
    fetchTreatmentsInfo();
  }, [fetchTreatmentsInfo]);

  const renderImageCard = (treatment) => (
    <div className="col-lg-4" key={treatment._id}>
      <div
        className="upcoming-event-card p-3"
        style={{ position: "relative", cursor: "pointer" }}
        onClick={() => handleCardClick(treatment)}
      >
        <div className="treatment-info-icon-container">
          <Dropdown overlay={sortMenu(treatment)} trigger={["click"]}>
            <button
              className="action-icon-button"
              onClick={(e) => e.stopPropagation()}
            >
              <BsThreeDotsVertical />
            </button>
          </Dropdown>
        </div>

        <div className="d-flex justify-content-center align-items-center mb-3">
          <img src={treatment.thumbnail} alt={treatment.title} />
        </div>
        <div>
          <div className="d-flex justify-content-between mb-2">
            <h4>{treatment.title}</h4>
          </div>
          <p>{truncateText(treatment.description, 30)}</p>
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
    <div className="container">
      <div className="row mt-4 marketing-categories-section">
        <div className="events-header-container">
          <h6>Common procedures</h6>
          <div className="events-buttons">
            <button className="rfh-basic-button" onClick={showModal}>
              <GoPlus size={20} /> Add
            </button>
            <button
              className="rfh-view-all-button"
              onClick={() => navigate("/view-all-treatments")}
            >
              View all
            </button>
          </div>
        </div>
        {isLoading && <Loader />}
        <div className="row mt-3">
          <Slider {...sliderSettings} key={treatmentData.length}>
            {treatmentData && treatmentData.length > 0 ? (
              [...treatmentData].reverse()?.map((treatment) => renderImageCard(treatment))
            ) : (
              <p>No data available</p>
            )}
          </Slider>
        </div>
      </div>
      <AddTreatmentsInfo open={isModalOpen} handleCancel={handleCancel} />
      <EditTreatmentsInfo
        open={isEditModalOpen}
        handleCancel={handleEditCancel}
        treatmentData={selectedTreatment}
      />
      <ViewTreatmentsInfo
        open={isViewModalOpen}
        handleCancel={handleViewCancel}
        treatmentData={selectedTreatment}
      />
    </div>
  );
};

export default EducationCategoriesTreatmentsInfo;
