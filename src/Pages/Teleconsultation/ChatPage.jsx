
import React from "react";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import "./teleconsultation.css";
import MessageChat from "../../Components/Teleconsultation/TechnicalSupport/Chat";

const ChatPage = () => {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />
      <div className="main-wrapper">
        <MessageChat />
      </div>
    </>
  );
};

export default ChatPage;

