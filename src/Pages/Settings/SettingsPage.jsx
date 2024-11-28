import React from "react";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import HeaderAdmin from "../../Layout/Header/Index";
import { Settings } from "../../Components/Settings/Settings";
import "./settings.css";
const SettingsPage = () => {
  return (
    <>
      <SidebarAdmin />
      <HeaderAdmin />
      <div className="main-wrapper">
        <Settings />
      </div>
    </>
  );
};

export default SettingsPage;
