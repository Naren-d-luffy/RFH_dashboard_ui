
import React from "react";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import AppointmentCards from "../../Components/Teleconsultation/AppointmentStatus/AppointmentCards";

const AppointmentStatusPage = () => {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />

      <div className="main-wrapper">
        <AppointmentCards />

      </div>
    </>
  );
};

export default AppointmentStatusPage;

