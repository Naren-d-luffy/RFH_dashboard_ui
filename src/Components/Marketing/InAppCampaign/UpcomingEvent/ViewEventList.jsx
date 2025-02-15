import React, { useState } from "react";
import { Button, Modal } from "antd";
import "react-quill/dist/quill.snow.css";
import Loader from "../../../../Loader";
import { IoMdTime } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";

const ViewEventList = ({ open, handleCancel, eventsData }) => {
  const [isLoading] = useState(false);
  console.log("event", eventsData);
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
            <h6>
              <IoMdTime /> {eventsData?.time || "N/A"}
            </h6>
            <h6>
              <CiCalendarDate />{" "}
              {eventsData?.date
                ? new Date(eventsData.date).toLocaleDateString("en-GB")
                : "N/A"}
            </h6>
            <div
              className="news-content"
              style={{ color: "var(--text-color)" }}
              dangerouslySetInnerHTML={{
                __html: eventsData?.description?.replace(
                  /<img/g,
                  '<img style="max-width: 100%; max-height: 150px; height: auto; object-fit: cover;"'
                ),
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewEventList;
