import React from "react";
import "./Notification.css";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import NotificationMenu from "../../Components/Notification/NotificationMenu";

const NotificationIndex = () => {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />
      <div className="main-wrapper">
        <NotificationMenu/>
      </div>
    </>
  );
};

export default NotificationIndex;
