import React from "react";
import { AppointmentReportCards } from "../../Components/Operational/AppointmentReports/AppountmentReportsCards";
import "./AppointmentReports.css";
import { AppointmentReportGraphs } from "../../Components/Operational/AppointmentReports/AppointmentReportGraphs";
import { RecentPatientsList } from "../../Components/Operational/AppointmentReports/RecentPatientsList";

const AppointmentReports = () => {
  return (
    <>
      <div className="container">
        <AppointmentReportCards />
        <AppointmentReportGraphs />
        <RecentPatientsList />
      </div>
    </>
  );
};

export default AppointmentReports;
