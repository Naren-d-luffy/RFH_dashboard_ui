import React, { useState } from "react";
import { Button, Modal } from "antd";
import "react-quill/dist/quill.snow.css";
import Loader from "../../../Loader";
import ReactPlayer from "react-player";

const ViewTechnology = ({ open, handleCancel, technologyData }) => {
  const [isLoading, setIsLoading] = useState(false);

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
            <h4>{technologyData?.heading || "N/A"}</h4>
            {technologyData?.thumbnail && (
              <img
                src={technologyData.thumbnail}
                alt="Event Thumbnail"
                className="facility-thumbnail"
              />
            )}
          </div>

          <div className="view-treatment-info-modal-content">
            <h5>{technologyData?.subHeading || "N/A"}</h5>

            {technologyData?.content ? (
              <div
                className="news-content"
                dangerouslySetInnerHTML={{ __html: technologyData.content }}
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

export default ViewTechnology;
