import React from "react";
import "./marketing.css";
import PatientAcquisitionCards from "../../Components/Marketing/PatientAcquisition/PatientAcquisitionCards";
import PatientAcquisitionGraph from "../../Components/Marketing/PatientAcquisition/PatientAcquisitionGraph";
import PatientAcquisitionTable from "../../Components/Marketing/PatientAcquisition/PatientAcquisitionTable";

const PatientAcquisitionPage = () => {
  return (
    <>
        <PatientAcquisitionCards />
        <PatientAcquisitionGraph />
        <PatientAcquisitionTable />
    </>
  );
};

export default PatientAcquisitionPage;
