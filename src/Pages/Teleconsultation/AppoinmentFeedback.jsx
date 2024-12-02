
import React from "react";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import "./teleconsultation.css";
import { AppointmentFeedback } from "../../Components/Teleconsultation/AppointmentStatus/AppoinmentFeedback";

const AppointmentFeedbackPage = () => {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />
      <div className="main-wrapper">
        <AppointmentFeedback />
      </div>
    </>
  );
};

export default AppointmentFeedbackPage;

