import React from "react";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import "./AppointmentReports.css"
import ServiceUtilizationCards from "../../Components/Operational/ServiceUtilization/ServiceUtilizationCards";
import  {ServiceUtilizationGraph } from "../../Components/Operational/ServiceUtilization/ServiceUtilizationGraph";
import ServiceUtilizationTable from "../../Components/Operational/ServiceUtilization/ServiceUtilizationTable";

const ServiceUtilizationPage = () => {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />

      <div className="main-wrapper">
            <div className="container">
               <ServiceUtilizationCards />
               <ServiceUtilizationGraph />
               <ServiceUtilizationTable />
            </div>
      </div>
    </>
  );
};

export default ServiceUtilizationPage;


