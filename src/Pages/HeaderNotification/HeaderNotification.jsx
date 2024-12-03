import React from "react";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import HeaderAdmin from "../../Layout/Header/Index";
import "./headernotification.css";
import { HeaderNotification } from "../../Components/HeaderNotification/HeaderNotification";
const HeaderNotificationPage = () => {
  return (
    <>
      <SidebarAdmin />
      <HeaderAdmin />
      <div className="main-wrapper">
        <div className="container">
          <HeaderNotification />
        </div>
      </div>
    </>
  );
};

export default HeaderNotificationPage;
