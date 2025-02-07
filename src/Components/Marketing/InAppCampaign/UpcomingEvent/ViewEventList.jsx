import React, { useState } from "react";
import { Button, Modal } from "antd";
import "react-quill/dist/quill.snow.css";
import Loader from "../../../../Loader";

const ViewEventList = ({ open, handleCancel, eventsData }) => {
  const [isLoading] = useState(false);
  console.log("event",eventsData)
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
            <img src={eventsData?.image} alt="Event" />
          </div>

          <div className="view-treatment-info-modal-content">
          <h6>{eventsData?.time || "N/A"}</h6>
          <h6>{eventsData?.date || "N/A"}</h6>


            <div
            className="news-content"
            style={{ color: "var(--text-color)" }}
            dangerouslySetInnerHTML={{ __html: eventsData?.description }}
          />
            {/* <ul>
              {eventsData?.tags
                ?.flatMap((tag) => tag.split(",")) 
                .map((individualTag, index) => (
                  <li key={index}>{individualTag.trim()}</li> 
                ))}
            </ul> */}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewEventList;
