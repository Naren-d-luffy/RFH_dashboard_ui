import React from "react";
import AppointmentCards from "../../Components/Teleconsultation/AppointmentStatus/AppointmentCards";
import AppoinmentData from "../../Components/Teleconsultation/AppointmentStatus/AppoinmentData";
import "./teleconsultation.css";

const AppointmentStatusPage = () => {
  return (
    <>
        <div className="container">
          <AppointmentCards />
          <AppoinmentData />
      </div>
    </>
  );
};

export default AppointmentStatusPage;
