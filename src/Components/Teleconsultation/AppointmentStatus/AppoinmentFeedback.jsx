import { Avatar } from "antd";
import React from "react";
import patient from "../../../Assets/Images/patient.png";
import { FaPaperPlane } from "react-icons/fa";
import { AppoinmentDocterDetails } from "./AppoinmentDocterDetails";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const feedbackData = [
  {
    id: 1,
    name: "Kiran K",
    time: "1 Hour ago",
    title: "UIUX Designer",
    feedback:
      "The hospital was extremely clean, and the rooms were well-maintained. It made me feel comfortable and safe during my stay. The nurses were very kind and attentive, checking on me regularly. They explained every procedure clearly.",
  },
  {
    id: 2,
    name: "Kiran K",
    time: "1 Hour ago",
    title: "UIUX Designer",
    feedback:
      "The hospital was extremely clean, and the rooms were well-maintained. It made me feel comfortable and safe during my stay. The nurses were very kind and attentive, checking on me regularly. They explained every procedure clearly.",
  },
  {
    id: 3,
    name: "Kiran K",
    time: "1 Hour ago",
    title: "UIUX Designer",
    feedback:
      "The hospital was extremely clean, and the rooms were well-maintained. It made me feel comfortable and safe during my stay. The nurses were very kind and attentive, checking on me regularly. They explained every procedure clearly.",
  },
  {
    id: 4,
    name: "Kiran K",
    time: "1 Hour ago",
    title: "UIUX Designer",
    feedback:
      "The hospital was extremely clean, and the rooms were well-maintained. It made me feel comfortable and safe during my stay. The nurses were very kind and attentive, checking on me regularly. They explained every procedure clearly.",
  },
  {
    id: 5,
    name: "Kiran K",
    time: "1 Hour ago",
    title: "UIUX Designer",
    feedback:
      "The hospital was extremely clean, and the rooms were well-maintained. It made me feel comfortable and safe during my stay. The nurses were very kind and attentive, checking on me regularly. They explained every procedure clearly.",
  },
];

const borderColors = ["#FEB052", "#00963F", "#136AD5", "#E61313"];

export const AppointmentFeedback = () => {
  const navigate = useNavigate();
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8 new-users-scroll">
          {feedbackData.map((item, index) => (
            <FeedbackCard
              key={item.id}
              data={item}
              borderColor={borderColors[index % borderColors.length]}
            />
          ))}
        </div>
        <div className="col-lg-4">
          <AppoinmentDocterDetails />
        </div>
      </div>
      <div className="d-flex mt-4">
        <button
          className="rfh-basic-button"
          onClick={() => navigate("/teleconsultation/appointment-status")}
        >
          <IoChevronBackOutline />
          Back
        </button>
      </div>
    </div>
  );
};

const FeedbackCard = ({ data, borderColor }) => {
  return (
    <>
      <div className="col-lg-12 patient-feedback-div mb-4">
        <div
          className="patient-left-border"
          style={{ borderLeftColor: borderColor }}
        >
          <div className="d-flex gap-3 w-100">
            <div className="w-48 h-48">
              <Avatar size={50} src={patient} />
            </div>
            <div className="flex-grow-1">
              <div className="d-flex gap-2 align-items-center patient-name-feedback">
                <h5 className="mb-1">{data.name}</h5>
                <span className="status-circle"></span>
                <span className="patient-feedback-time">{data.time}</span>
              </div>
              <p className="patient-feedback-title mb-1">{data.title}</p>
            </div>
          </div>
          <h6 className="mt-3">Cleanliness and Environment</h6>
          <p>{data.feedback}</p>
        </div>
        <div className="reply-feedback d-flex justify-content-between align-items-center">
          <input
            type="text"
            className="reply-input"
            placeholder="Reply Feedback"
          />
          <div className="icon-circle">
            <FaPaperPlane className="reply-icon" />
          </div>
        </div>
      </div>
    </>
  );
};
