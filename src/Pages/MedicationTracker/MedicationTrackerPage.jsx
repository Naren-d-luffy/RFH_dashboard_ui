import React from "react";
import "./medicationtracker.css";
import MedicationTrackerCards from "../../Components/MedicationTracker/MedicationTrackerCards";
import MedicationTrackerFirstTable from "../../Components/MedicationTracker/MedicationTrackerFirstTable";
import MedicationTrackerSecondTable from "../../Components/MedicationTracker/MedicationTrackerSecondTable";

const MedicationTrackerPage = () => {
  return (
    <>
      <div className="container">
        <MedicationTrackerCards />
        <MedicationTrackerFirstTable />
        <MedicationTrackerSecondTable />
      </div>
    </>
  );
};

export default MedicationTrackerPage;
