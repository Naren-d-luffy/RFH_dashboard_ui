import React from "react";
import "./medicationtracker.css";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import PatientDetail from "../../Components/MedicationTracker/PatientDetail";

const MedicationTrackerPatientDetailPage = () => {
  return (
      <>
        <HeaderAdmin />
        <SidebarAdmin />
  
        <div className="main-wrapper">
          <div className="container">
              <PatientDetail />
          </div>
        </div>
      </>
  )
}

export default MedicationTrackerPatientDetailPage

