import { Avatar } from "antd";
import React from "react";
import patient from "../../Assets/Images/patient.png";
import { MdOutlineAccessTime } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

const feedbackData = [
  {
    id: 1,
    name: "Kiran K",
    time: "09 Dec 2023 at 4.00 PM",
    title: "Exclusive Health Packages",
    feedback:
      "The hospital was extremely clean, and the rooms were well-maintained. It made me feel comfortable and safe during my stay. The nurses were very kind and attentive, checking on me regularly. They explained every procedure clearly.",
  },
  {
    id: 2,
    name: "Kiran K",
    time: "09 Dec 2023 at 4.00 PM",
    title: "Free Health Camp Alert!",
    feedback:
      "The hospital was extremely clean, and the rooms were well-maintained. It made me feel comfortable and safe during my stay. The nurses were very kind and attentive, checking on me regularly. They explained every procedure clearly.",
  },
  {
    id: 3,
    name: "Kiran K",
    time: "09 Dec 2023 at 4.00 PM",
    title: "Exclusive Health Packages",
    feedback:
      "The hospital was extremely clean, and the rooms were well-maintained. It made me feel comfortable and safe during my stay. The nurses were very kind and attentive, checking on me regularly. They explained every procedure clearly.",
  },
];

export const HeaderNotification = () => {
  return (
    <>
      {feedbackData.map((data) => (
        <div key={data.id} className="col-lg-12 header-notification-div mb-4">
          <div className="header-notification">
            <div className="notification-close-head">
              <span className="d-flex justify-content-end ">
                <IoCloseOutline className="notification-close" />
              </span>
            </div>

            <div className="d-flex align-items-center gap-3 w-100">
              <div className="w-48 h-48">
                <Avatar size={50} src={patient} />
              </div>
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-center notification-name-feedback">
                  <h5 className="mb-1">{data.name}</h5>
                </div>
              </div>
            </div>
            <h6 className="mt-3">
              New Announcements : <span>{data.title}</span>
            </h6>
            <p>{data.feedback}</p>
            <div className="d-flex justify-content-end notification-feedback-time align-items-center">
              <span className="notification-time">
                <MdOutlineAccessTime />
              </span>
              <p>{data.time}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
