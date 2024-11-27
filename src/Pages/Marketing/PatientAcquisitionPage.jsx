import React from "react";
import "./marketing.css";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import PatientAcquisitionCards from "../../Components/Marketing/PatientAcquisition/PatientAcquisitionCards";
import PatientAcquisitionGraph from "../../Components/Marketing/PatientAcquisition/PatientAcquisitionGraph";
import PatientAcquisitionTable from "../../Components/Marketing/PatientAcquisition/PatientAcquisitionTable";


const PatientAcquisitionPage = () => {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />

      <div className="main-wrapper">
        <PatientAcquisitionCards />
        <PatientAcquisitionGraph />
        <PatientAcquisitionTable />
 
      </div>
    </>
  );
};

export default PatientAcquisitionPage;

