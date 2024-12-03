import React from "react";
import "./medicationtracker.css";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import AddPatientDetail from "../../Components/MedicationTracker/AddPatientDetail";

const AddPatientDetailPage = () => {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />

      <div className="main-wrapper">
        <div className="container">
           <AddPatientDetail />
        </div>
      </div>
    </>
  );
};

export default AddPatientDetailPage;

