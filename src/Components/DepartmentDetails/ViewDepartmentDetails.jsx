import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import DOMPurify from "dompurify";
import { FaInfoCircle } from "react-icons/fa";
// import ReactPlayer from "react-player";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ViewDepartmentDetails = ({ open, handleCancel, departmentData }) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  // const [videoList, setVideoList] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  useEffect(() => {
    if (departmentData) {
      setTitle(departmentData.title || "");
      setSubtitle(departmentData.subtitle || "");
      setDescription(DOMPurify.sanitize(departmentData.description || ""));
      setThumbnail(departmentData.thumbnail || "");
      // const uniqueVideos = departmentData.success_stories
      //   ? Array.from(
      //       new Map(
      //         departmentData.success_stories?.map((video) => [
      //           video.video_thumbnail_url,
      //           video,
      //         ])
      //       ).values()
      //     )
      //   : [];
      // setVideoList(uniqueVideos);
    }
  }, [departmentData]);

  // const renderVideoCard = (video, index) => (
  //   <div key={index} className="video-page">
  //     <div
  //       className="video-card p-3"
  //       style={{ border: "1px solid #ddd", borderRadius: "8px" }}
  //     >
  //       <div className="video-player-container">
  //         <ReactPlayer
  //           url={video.video_thumbnail_url}
  //           controls={true}
  //           playing={false}
  //           width="100%"
  //           height="150px"
  //         />
  //       </div>
  //       <div className="video-details mt-2">
  //         <h4>{video.title || "Untitled Video"}</h4>
  //         <span>
  //           <FaEye style={{ marginRight: "5px" }} />{" "}
  //           {`${video.views || 0} Views`}
  //         </span>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <Modal
      visible={open}
      title={null}
      onCancel={handleCancel}
      className="view-news-modal"
      width={680}
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
      <div className="news-modal-container">
        <div
          className="department-modal-header align-items-center"
          style={{
            background: `linear-gradient(var(--department-bg-color), white)`,
          }}
        >
          <div className="d-flex justify-content-between">
            <div>
              <h2 className="department-heading">{title}</h2>
              <p className="department-subheading">{subtitle}</p>
            </div>
            <div>
              <img
                src={thumbnail}
                style={{
                  width: "250px",
                  height: "150px",
                  borderRadius: "15px",
                }}
                alt="Health Package"
              />
            </div>
          </div>
          <div
            className="department-about mt-4"
            style={{ display: "flex", alignItems: "center" }}
          >
            <FaInfoCircle style={{ marginRight: "8px", fontSize: "16px" }} />
            <div
              dangerouslySetInnerHTML={{
                __html: description?.replace(
                  /<img/g,
                  '<img style="max-width: 100%; max-height: 150px; height: auto; object-fit: cover;"'
                ),
              }}
            />
          </div>
        </div>
      </div>
      {/* <div className="videos-section mt-4">
        <h2 className="specialist-heading-name">Our Success Stories</h2>
        <div className="row mt-2">
          <Slider {...sliderSettings}>
            {videoList?.length > 0 ? (
              videoList?.map((video, index) => renderVideoCard(video, index))
            ) : (
              <div className="news-content" style={{ padding: "20px", textAlign: "center" }}>
                <p>No success stories available</p>
              </div>
            )}
          </Slider>
        </div>
      </div> */}
    </Modal>
  );
};

export default ViewDepartmentDetails;
