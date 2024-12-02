import React from "react";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import "./teleconsultation.css";
import DoctorDetail from "../../Components/Teleconsultation/VirtualManagement/DoctorDetail";

const DoctorDetailPage = () => {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />

      <div className="main-wrapper">
        <DoctorDetail />
      </div>
    </>
  );
};

export default DoctorDetailPage;

