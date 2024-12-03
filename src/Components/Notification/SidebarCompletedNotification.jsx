
import React from "react";
import { IoIosNotificationsOutline } from "react-icons/io";

const SidebarCompletedNotification = () => {
    const notifications = [
        {
            status: "Completed",
            title: "How to deposit money to my portal?",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, ",
            background: "#F0F8FF",
            color: "#2BBA64",
        },
        {
            status: "Incompleted",
            title: "Customer feed back request",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, ", 
            backGround: "#F1FAF5",
            color: "#1D4ED8"
        },
        {
            status: "Draft",
            title: "Product launch Announcement",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, ",
            background: "#FFF8F1",
            color: "#F97316"
        },
        {
            status: "Incompleted",
            title: "Product launch Announcement",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, ", 
            backGround: "#F1FAF5",
            color: "#1D4ED8"
        },
        {
            status: "Completed",
            title: "Product launch Announcement",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, ",
            background: "#F0F8FF",
            color: "#2BBA64",
        },
    ];
    const completedNotifications = notifications.filter(notification => notification.status === "Completed");
    return (
        <div className="container-fluid mt-3">
            {completedNotifications.map((notification, index) => (
                <div
                    key={index}
                    className="all-user-negative-feedback-card d-flex justify-content-between align-items-center p-3 mb-2"
                >
                    <div className="d-flex align-items-start gap-3">
                        <div>
                            <IoIosNotificationsOutline className="create-alert-icon-blue" />
                        </div>
                        <div>
                            <h6 className="fw-bold">{notification.title}</h6>
                            <p className="text-muted">{notification.description}</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <button className="notification-status-btn" style={{
                            background: notification.background,
                            color: notification.color,
                        }}>{notification.status}</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SidebarCompletedNotification;

