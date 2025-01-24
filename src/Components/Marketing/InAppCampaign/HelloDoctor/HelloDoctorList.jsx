import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { Dropdown, Menu } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { Instance } from "../../../../AxiosConfig";
import ReactPlayer from "react-player";
import AddVideo from "./AddVideo";
import EditVideo from "./EditVideo";
import {
  
  showDeleteMessage,
  showSuccessMessage,
} from "../../../../globalConstant";
import {
  deleteHelloDoctorVideos,
  setHelloDoctorVideos,
} from "../../../../Features/HelloDoctorSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const HelloDoctorList = () => {
  const [playingVideo] = useState(null);
  const [modals, setModals] = useState({
    event: false,
    video: false,
    edit: false,
  });
  const [, setVideoList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const videos = useSelector((state) => state.videos.videos);
  const toggleModal = (modalType) =>
    setModals((prev) => ({ ...prev, [modalType]: !prev[modalType] }));

  const items = [
    { label: "Upcoming Events", key: "1" },
    { label: "Recomended", key: "2" },
    { label: "Featured Programs", key: "3" },
    { label: "Latest Camps", key: "4" },
    { label: "Outstation Clinic", key: "5" },
  ];

  const handleEditClick = (video) => {
    setSelectedVideo(video);
    toggleModal("edit");
  };

  const handleDeleteClick = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/videos/${_id}`);
          if (response.status === 200 || response.status === 204) {
            showSuccessMessage("Deleted successfully", "Details deleted");
            dispatch(deleteHelloDoctorVideos(_id));
          }
        } catch (error) {
          console.error("Error deleting video:", error);
        }
      },
    });
  };

  const filterMenu = (
    <Menu>
      <Menu.Item key="edit" className="filter-menu-item">
        <BiEdit style={{ color: "var(--primary-green)", marginRight: "4px" }} />
        Edit
      </Menu.Item>
      <Menu.Item key="delete" className="filter-menu-item">
        <RiDeleteBin7Line
          style={{ color: "var(--red-color)", marginRight: "4px" }}
        />
        Delete
      </Menu.Item>
    </Menu>
  );

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
    const isPlaying = playingVideo === video._id;

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
        <div className=" p-1">
          <ReactPlayer
            url={video.url}
            controls={true}
            playing={isPlaying}
            width="100%"
            height="200px"
          />
        </div>
        <div className="video-details mt-2">
          <h4>{video.title}</h4>
          <p style={{ color: "var(--black-color)", fontSize: "13px" }}>{`${
            video.likes
          } Likes | ${new Date(video.createdAt).toLocaleDateString()}`}</p>
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

  const fetchVideoList = async () => {
    try {
      const response = await Instance.get("/videos");
      setVideoList(response.data);
      dispatch(setHelloDoctorVideos(response.data.data));
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideoList();
  }, []);

  return (
    <div className="row mt-4">
      <div className="marketing-categories-section">
        <div className="row mt-4">
          <div className="events-header-container">
            <h6>Hello Doctor</h6>
            <div className="events-buttons">
              <button
                className="rfh-view-all-button"
                onClick={() => navigate("/view-all-hello-doctor")}
              >
                View all
              </button>
              <button
                className="rfh-basic-button"
                onClick={() => toggleModal("video")}
              >
                <GoPlus size={20} /> Add Video
              </button>
            </div>
          </div>
          <div className="mt-4">
            <Slider {...sliderSettings} key={Object.keys(videos).length}>
              {videos && Object.keys(videos).length > 0 ? (
                Object.entries(videos)
                  .filter(([key]) => key !== "status")
                  .map(([key, video]) => renderRecommendVideo(video))
              ) : (
                <p>No data available</p>
              )}
            </Slider>
            {/* <Slider {...sliderSettings}>
              {Object.values(videos).map((video) => renderRecommendVideo(video))}
            </Slider> */}
          </div>
          <AddVideo
            open={modals.video}
            handleCancel={() => toggleModal("video")}
            refreshList={fetchVideoList}
          />
          <EditVideo
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

export default HelloDoctorList;
