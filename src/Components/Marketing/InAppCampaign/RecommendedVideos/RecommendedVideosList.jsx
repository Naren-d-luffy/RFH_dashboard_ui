import React, { useCallback, useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { Dropdown, Menu } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Instance } from "../../../../AxiosConfig";
import {
 
  showDeleteMessage,
  showSuccessMessage,
} from "../../../../globalConstant";
import {
  deleteRecommendedVideos,
  setRecommendedVideos,
} from "../../../../Features/RecommendedVideosSlice";
import AddRecommendedVideos from "./AddRecommendedVideos";
import EditRecommendedVideos from "./EditRecommendedVideos";

export const RecommendedVideosList = () => {
  const [modals, setModals] = useState({
    event: false,
    video: false,
    edit: false,
  });
  const [selectedVideo, setSelectedVideo] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recommendedvideos = useSelector(
    (state) => state.recommendedvideos.recommendedvideos
  );

  const toggleModal = (modalType) =>
    setModals((prev) => ({ ...prev, [modalType]: !prev[modalType] }));

  const handleEditClick = (video) => {
    setSelectedVideo(video);
    toggleModal("edit");
  };

  const handleDeleteClick = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/recommended/${_id}`);
          if (response.status === 200 || response.status === 204) {
            showSuccessMessage("Deleted successfully", "Details deleted");
            dispatch(deleteRecommendedVideos(_id));
          }
        } catch (error) {
          console.error("Error deleting video:", error);
        }
      },
    });
  };

  const sortMenu = (video) => (
    <Menu>
      <Menu.Item
        key="edit"
        className="filter-menu-item"
        onClick={() => handleEditClick(video)}
      >
        <BiEdit style={{ color: "var(--primary-green)", marginRight: "4px" }} />
        Edit
      </Menu.Item>
      <Menu.Item
        key="delete"
        className="filter-menu-item"
        onClick={() => handleDeleteClick(video._id)}
      >
        <RiDeleteBin7Line
          style={{ color: "var(--red-color)", marginRight: "4px" }}
        />
        Delete
      </Menu.Item>
    </Menu>
  );

  const renderRecommendVideo = (video) => {
    return (
      <div className="col-lg-4 recommend-video-page" key={video._id}>
        <div className="action-icon-container">
          <Dropdown overlay={sortMenu(video)} trigger={["click"]}>
            <button className="action-icon-button">
              <BsThreeDotsVertical
                className="recommended-video-action-button"
                color="var(--black-color)"
              />
            </button>
          </Dropdown>
        </div>
        <div className="p-1">
          <ReactPlayer
            url={video.video_URL || video.Video_file}
            controls={true}
            width="100%"
            height="200px"
          />
        </div>
        <div className="video-details mt-2">
          <h4>{video.name}</h4>
          <p style={{ color: "var(--black-color)", fontSize: "13px" }}>
              {video.createdAt}
          </p>
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

  const fetchVideoList = useCallback(async () => {
    try {
      const response = await Instance.get("/recommended");
      dispatch(setRecommendedVideos(response.data));
    } catch (error) {
      console.error("Error fetching recommended videos:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchVideoList();
  }, [fetchVideoList]);

  return (
    <div className="row mt-4">
      <div className="marketing-categories-section">
        <div className="row mt-4">
          <div className="events-header-container">
            <h6>Recommended Videos</h6>
            <div className="events-buttons">
              <button
                className="rfh-basic-button"
                onClick={() => toggleModal("video")}
              >
                <GoPlus size={20} /> Add Video
              </button>
              <button
                className="rfh-view-all-button"
                onClick={() => navigate("/view-all-recommended-videos-table")}
              >
                View all
              </button>
            </div>
          </div>
          <div className="mt-4">
            <Slider {...sliderSettings} key={recommendedvideos?.length}>
              {recommendedvideos && recommendedvideos.length > 0 ? (
                recommendedvideos?.map((video) => renderRecommendVideo(video))
              ) : (
                <p>No data available</p>
              )}
            </Slider>
          </div>
          <AddRecommendedVideos
            open={modals.video}
            handleCancel={() => toggleModal("video")}
            refreshList={fetchVideoList}
          />
          <EditRecommendedVideos
            open={modals.edit}
            handleCancel={() => toggleModal("edit")}
            videoData={selectedVideo}
            refreshList={fetchVideoList}
          />
        </div>
      </div>
    </div>
  );
};

export default RecommendedVideosList;

