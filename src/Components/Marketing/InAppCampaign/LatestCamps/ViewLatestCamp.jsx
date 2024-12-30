import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import "react-quill/dist/quill.snow.css";
import { CiCalendarDate } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";

const ViewLatestCamp = ({ open, handleCancel, campDataa }) => {
  const [campName, setCampName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [time, setTime] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (campDataa) {
      setCampName(campDataa.campName || "");
      setDescription(campDataa.description || "");
      setDate(formatDate(campDataa.date) || "");
      setTime(campDataa.time || "");
    }
  }, [campDataa]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const dateObj = new Date(dateStr);
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [lat, lng] = campDataa?.location
    ? campDataa.location.split(",")
    : ["", ""];

  return (
    <Modal
      visible={open}
      onCancel={handleCancel}
      width={680}
      className="view-health-package-modal"
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
      <div className="health-package-modal-container">
        <div className="health-package-modal-header d-flex justify-content-between align-items-center">
          <h4>{campDataa?.campName || "N/A"}</h4>
        </div>

        <div className="health-package-modal-content">
          <iframe
            src={`https://www.google.com/maps?q=${lat},${lng}&hl=es;z=14&output=embed`}
            allowFullScreen
            style={{ height: "250px", width: "100%" }}
          ></iframe>
        </div>

        <div className="health-package-modal-content">
          <h6>{campDataa?.description || "N/A"}</h6>

          <div className="package-detail-item">
            <strong>Date:</strong>{" "}
            <h6>
              <CiCalendarDate /> {""}
              {date}
            </h6>
          </div>

          <div className="package-detail-item">
            <strong>Time:</strong>
            <h6>
              <IoMdTime /> {""}
              {campDataa?.time || "N/A"}
            </h6>
          </div>

          <div className="package-detail-item">
            <strong>Hospital Name:</strong>
            <h6>{campDataa?.hospitalName || "N/A"}</h6>
          </div>

          <div className="package-detail-item">
            <strong>Location:</strong>
            <h6>
              <IoLocationOutline /> {""}
              {campDataa?.location || "N/A"}
            </h6>
          </div>

          <div className="package-detail-item">
            <strong>Address:</strong>
            <h6>{campDataa?.address || "N/A"}</h6>
          </div>

          <div className="package-detail-item">
            <strong>PinCode:</strong>
            <h6>{campDataa?.pinCode || "N/A"}</h6>
          </div>

          <div
            className="news-content"
            style={{ color: "var(--text-color)" }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ViewLatestCamp;
