import React, { useState } from "react";
import { Button, Modal } from "antd";
import "react-quill/dist/quill.snow.css";
import Loader from "../../../Loader";

const ViewConditionWeTreat = ({ open, handleCancel, conditionData }) => {
  const [isLoading] = useState(false);

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
            <h4>{conditionData?.heading || "N/A"}</h4>
            {conditionData?.thumbnail && (
              <img
                src={conditionData.thumbnail}
                alt="Event Thumbnail"
                className="facility-thumbnail"
              />
            )}
          </div>

          <div className="view-treatment-info-modal-content">
            <h5>{conditionData?.subHeading || "N/A"}</h5>

            {conditionData?.content ? (
              <div
              className="news-content"
              dangerouslySetInnerHTML={{
                __html: conditionData?.content?.replace(
                  /<img/g,
                  '<img style="max-width: 100%; max-height: 150px; height: auto; object-fit: cover;"'
                ),
              }}
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

export default ViewConditionWeTreat;
