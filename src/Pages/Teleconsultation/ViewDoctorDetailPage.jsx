import React from "react";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import "./teleconsultation.css";
import ViewDoctorDetail from "../../Components/Teleconsultation/VirtualManagement/ViewDoctorDetail";

const ViewDoctorDetailPage = () => {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />

      <div className="main-wrapper">
        <ViewDoctorDetail />
      </div>
    </>
  );
};

export default ViewDoctorDetailPage;

