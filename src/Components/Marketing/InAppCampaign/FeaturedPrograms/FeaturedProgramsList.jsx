import React, { useState, useEffect } from "react";
import { GoPlus } from "react-icons/go";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Dropdown, Menu } from "antd";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddFeaturesModal from "./AddFeaturedProgram";
import { useNavigate } from "react-router-dom";
import { Instance } from "../../../../AxiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { FiEye } from "react-icons/fi";
import { showDeleteMessage } from "../../../../globalConstant";
import EditFeaturesModal from "./EditFetauredProgram";

export const FeaturedProgramsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const showEditModal = () => setIsEditModalOpen(true);
  const handleEditCancel = () => setIsEditModalOpen(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [featureList,setFeatureList]=useState([])
  const showViewModal = () => setIsViewModalOpen(true);
  const handleViewCancel = () => setIsViewModalOpen(false);
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

  const sortMenu = (feature) => (
    <Menu>
      <Menu.Item
        key="edit"
        className="filter-menu-item"
        onClick={() => {
          setSelectedFeature(feature);
          showEditModal();
        }}
      >
        <BiEdit style={{ color: "var(--primary-green)", marginRight: "4px" }} />
        Edit
      </Menu.Item>
      <Menu.Item
        key="view"
        className="filter-menu-item"
        onClick={() => {
          setSelectedFeature(feature);
          showViewModal();
        }}
      >
        <FiEye style={{ color: "var(--primary-green)", marginRight: "4px" }} />
        View
      </Menu.Item>
      <Menu.Item
        key="delete"
        className="filter-menu-item"
        onClick={() => handleDeleteFeature(feature._id)}
      >
        <RiDeleteBin7Line
          style={{ color: "var(--red-color)", marginRight: "4px" }}
        />
        Delete
      </Menu.Item>
    </Menu>
  );

  const handleDeleteFeature = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/education/${_id}`);
          if (response.status === 200) {
            //   dispatch(deleteTreatment(_id))
          }
        } catch (error) {
          console.error("Error deleting treatment:", error);
        }
      },
    });
  };
  const fetchFeaturesInfo = async (page) => {
    setIsLoading(true);
    try {
      const response = await Instance.get(`/discover/featuredProgram`, {
        params: { page, limit: itemsPerPage },
      });
      console.log(response.data)
      //   dispatch(setTreatment(response.data.educations))
      setFeatureList(response.data || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching treatments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturesInfo();
  }, []);

  const renderFeatureCard = (feature) => (
    <div className="col-lg-4" key={feature._id}>
      <div className="upcoming-event-card p-3" style={{ position: "relative" }}>

      <div className="treatment-info-icon-container">
          <Dropdown overlay={sortMenu(feature)} trigger={["click"]}>
            <button className="action-icon-button">
              <BsThreeDotsVertical />
            </button>
          </Dropdown>
        </div>

        <div className="d-flex justify-content-center align-items-center mb-3">
          <img src={feature.thumbnail} alt={feature.title} />
        </div>
        <div>
          <div className="d-flex justify-content-between mb-2">
            <h4>{feature.title}</h4>
          </div>
          <p>{truncateText(feature.description, 30)}</p>
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
    infinite: true,
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
          <div className="d-flex justify-content-between">
            <h6>Featured Programs</h6>
            <button
              className="rfh-basic-button"
              onClick={showModal}
            >
              <GoPlus size={20} /> Add Program
            </button>
          </div>
          <div className="mt-4">
            <Slider {...sliderSettings}>
              {featureList.map((feature) => renderFeatureCard(feature))}
            </Slider>
          </div>
          <AddFeaturesModal open={isModalOpen} handleCancel={handleCancel} />
        </div>
        <EditFeaturesModal
        open={isEditModalOpen}
        handleCancel={handleEditCancel}
        featuresData={selectedFeature}
      />
      </div>
    </div>
  );
};
