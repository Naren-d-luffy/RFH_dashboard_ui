import React from "react";
import "./headernotification.css";
import { HeaderNotification } from "../../Components/HeaderNotification/HeaderNotification";
import ComingSoon from "../../comingSoon";
const HeaderNotificationPage = () => {
  return (
    <>
      <div className="container">
      <ComingSoon/>
      {/* <HeaderNotification /> */}
      </div>
    </>
  );
};

export default HeaderNotificationPage;
