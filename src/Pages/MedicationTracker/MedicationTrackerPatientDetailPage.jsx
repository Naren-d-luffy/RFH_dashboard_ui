import React from "react";
import "./medicationtracker.css";
import PatientDetail from "../../Components/MedicationTracker/PatientDetail";

const MedicationTrackerPatientDetailPage = () => {
  return (
    <>
      <div className="container">
        <PatientDetail />
      </div>
    </>
  );
};

export default MedicationTrackerPatientDetailPage;
