import React, { useState } from "react";
import { Button, Modal } from "antd";
import "react-quill/dist/quill.snow.css";
import Loader from "../../../../Loader";

const ViewEventList = ({ open, handleCancel, eventsData }) => {
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
            <h4>{eventsData?.title || "N/A"}</h4>
            <img src={eventsData?.image} alt="Event Image" />
          </div>

          <div className="view-treatment-info-modal-content">
            <h5>{eventsData?.description || "N/A"}</h5>
            <ul>
              {eventsData?.tags?.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewEventList;
