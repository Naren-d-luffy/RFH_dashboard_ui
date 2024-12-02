import React from "react";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import AppointmentCards from "../../Components/Teleconsultation/AppointmentStatus/AppointmentCards";
import AppoinmentData from "../../Components/Teleconsultation/AppointmentStatus/AppoinmentData";
import "./teleconsultation.css";

const AppointmentStatusPage = () => {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />

      <div className="main-wrapper">
        <div className="container">
          <AppointmentCards />
          <AppoinmentData />
        </div>
      </div>
    </>
  );
};

export default AppointmentStatusPage;
