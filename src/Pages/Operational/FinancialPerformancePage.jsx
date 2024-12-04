import React from "react";
import "./AppointmentReports.css";
import FinancialPerformanceCards from "../../Components/Operational/FinancialPerformance/FinancialPerformanceCards";
import { FinancialPerformanceGraph } from "../../Components/Operational/FinancialPerformance/FinancialPerformanceGraph";
import FinancialPerformanceTable from "../../Components/Operational/FinancialPerformance/FinancialPerformanceTable";

const FinancialPerformancePage = () => {
  return (
    <>
      <div className="container">
        <FinancialPerformanceCards />
        <FinancialPerformanceGraph />
        <FinancialPerformanceTable />
      </div>
    </>
  );
};

export default FinancialPerformancePage;
