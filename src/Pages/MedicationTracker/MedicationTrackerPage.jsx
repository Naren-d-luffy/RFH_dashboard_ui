import React from "react";
import "./medicationtracker.css";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import MedicationTrackerCards from "../../Components/MedicationTracker/MedicationTrackerCards";
import MedicationTrackerFirstTable from "../../Components/MedicationTracker/MedicationTrackerFirstTable";
import MedicationTrackerSecondTable from "../../Components/MedicationTracker/MedicationTrackerSecondTable";

const MedicationTrackerPage = () => {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />

      <div className="main-wrapper">
        <div className="container">
          <MedicationTrackerCards />
          <MedicationTrackerFirstTable />
          <MedicationTrackerSecondTable />
        </div>
      </div>
    </>
  );
};

export default MedicationTrackerPage;
