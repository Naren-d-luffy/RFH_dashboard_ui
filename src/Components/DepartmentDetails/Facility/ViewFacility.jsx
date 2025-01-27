import React, { useState } from "react";
import { Button, Modal } from "antd";
import "react-quill/dist/quill.snow.css";
import Loader from "../../../Loader";
import ReactPlayer from "react-player";

const ViewFacility = ({ open, handleCancel, facilityData }) => {
  const [isLoading] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(null);

  const handlePlayVideo = (videoId) => {
    setPlayingVideo(videoId);
  };

  return (
    <>
      {isLoading && <Loader />}
      <Modal
        visible={open}
        onCancel={handleCancel}
        width={750}
        className="view-treatment-info-modal"
        footer={[
          <Button
            key="back"
            onClick={handleCancel}
            className="create-campaign-cancel-button me-4"
          >
            Back
          </Button>,
        ]}
      >
        <div className="view-treatment-info-modal-container">
          <div className="view-treatment-info-modal-header d-flex justify-content-between align-items-center">
            <h4>{facilityData?.heading || "N/A"}</h4>
            {facilityData?.thumbnail && (
              <img
                src={facilityData.thumbnail}
                alt="Event Thumbnail"
                className="facility-thumbnail"
              />
            )}
          </div>

          <div className="view-treatment-info-modal-content">
            <h5>{facilityData?.video_heading || "N/A"}</h5>
            {facilityData?.video && (
              <div className="recommend-video-card p-3">
                <div className="video-player-container">
                  <ReactPlayer
                    url={facilityData.video}
                    controls={true}
                    playing={playingVideo === facilityData?._id}
                    width="100%"
                    height="150px"
                    onPlay={() => handlePlayVideo(facilityData?._id)}
                    onPause={() => setPlayingVideo(null)}
                  />
                </div>
              </div>
            )}

            {facilityData?.content ? (
              <div
                className="news-content"
                dangerouslySetInnerHTML={{ __html: facilityData.content }}
              />
            ) : (
              <p>No content available</p>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewFacility;
