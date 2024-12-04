import React from "react";
import "./AppointmentReports.css";
import ServiceUtilizationCards from "../../Components/Operational/ServiceUtilization/ServiceUtilizationCards";
import { ServiceUtilizationGraph } from "../../Components/Operational/ServiceUtilization/ServiceUtilizationGraph";
import ServiceUtilizationTable from "../../Components/Operational/ServiceUtilization/ServiceUtilizationTable";

const ServiceUtilizationPage = () => {
  return (
    <>
      <div className="container">
        <ServiceUtilizationCards />
        <ServiceUtilizationGraph />
        <ServiceUtilizationTable />
      </div>
    </>
  );
};

export default ServiceUtilizationPage;
