import React from "react";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import Chat from "../../Components/Chat/Chat";

const ChattingPage = () => {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />

      <div className="main-wrapper">
        <div className="container">
          <Chat/>
        </div>
      </div>
    </>
  );
};

export default ChattingPage;
