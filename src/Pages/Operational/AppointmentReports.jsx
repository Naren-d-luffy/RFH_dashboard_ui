import React from "react";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import { AppointmentReportCards } from "../../Components/Operational/AppointmentReports/AppountmentReportsCards";
import "./AppointmentReports.css"
import { AppointmentReportGraphs } from "../../Components/Operational/AppointmentReports/AppointmentReportGraphs";
import { RecentPatientsList } from "../../Components/Operational/AppointmentReports/RecentPatientsList";

const AppointmentReports = () => {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />

      <div className="main-wrapper">
            <div className="container">
            <AppointmentReportCards/>
            <AppointmentReportGraphs/>
            <RecentPatientsList/>
            </div>
      </div>
    </>
  );
};

export default AppointmentReports;

