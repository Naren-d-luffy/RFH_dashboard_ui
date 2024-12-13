import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Instance from "../../AxiosConfig";
import ReactPlayer from "react-player";
import { RiDeleteBin7Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { Dropdown, Menu } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddVideo from "./AddVideo";
import EditVideo from "./EditVideo";

export const HelloDoctor = () => {
  const [playingVideo, setPlayingVideo] = useState(null); 
  const [modals, setModals] = useState({ event: false, video: false, edit: false });
  const [videoList, setVideoList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null); 

  const toggleModal = (modalType) =>
    setModals((prev) => ({ ...prev, [modalType]: !prev[modalType] }));

  const openEditModal = (video) => {
    setSelectedVideo(video);
    toggleModal("edit");
  };

  const sortMenu = (video) => (
    <Menu>
      <Menu.Item
        key="edit"
        className="filter-menu-item"
        onClick={() => openEditModal(video)}
      >
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

  const fetchVideoList = async () => {
    try {
      const response = await Instance.get("/videos");
      setVideoList(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideoList();
  }, []);

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
        <div className="recommend-video-card p-3">
          <div className="video-player-container">
            <ReactPlayer
              url={video.url}
              controls={false}
              playing={isPlaying}
              width="100%"
              height="100px"
            />
          </div>
        </div>
        <div className="video-details mt-2">
          <h4>{video.title}</h4>
          <p>{`${video.likes} Likes | ${new Date(
            video.createdAt
          ).toLocaleDateString()}`}</p>
        </div>
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
    <div className="row ">
      <div className="marketing-categories-section">
        {/* Recommended Videos Section */}
        <div className="row mt-4">
          <div className="d-flex justify-content-between">
            <h6>Recommended Videos</h6>
            <button
              className="rfh-basic-button"
              onClick={() => toggleModal("video")}
            >
              <GoPlus size={20} /> Add Video
            </button>
          </div>
          <div className="mt-4">
            <Slider {...sliderSettings}>
              {videoList.length > 0 ? (
                videoList.map((video) => renderRecommendVideo(video))
              ) : (
                <p>No videos available</p>
              )}
            </Slider>
          </div>
          <AddVideo
            open={modals.video}
            handleCancel={() => toggleModal("video")}
          />
          <EditVideo
            open={modals.edit}
            handleCancel={() => toggleModal("edit")}
            video={selectedVideo} 
          />
        </div>
      </div>
    </div>
  );
};
