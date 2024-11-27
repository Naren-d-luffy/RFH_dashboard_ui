import React from "react";
import "./marketing.css";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import PatientDetail from "../../Components/Marketing/PatientAcquisition/PatientDetail";


const PatientDetailPage = () => {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />

      <div className="main-wrapper">
        <PatientDetail />
      </div>
    </>
  );
};

export default PatientDetailPage;

