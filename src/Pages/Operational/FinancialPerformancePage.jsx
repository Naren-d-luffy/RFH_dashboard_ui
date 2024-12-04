import React from "react";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import "./AppointmentReports.css"
import FinancialPerformanceCards from "../../Components/Operational/FinancialPerformance/FinancialPerformanceCards";
import {FinancialPerformanceGraph} from "../../Components/Operational/FinancialPerformance/FinancialPerformanceGraph";
import FinancialPerformanceTable from "../../Components/Operational/FinancialPerformance/FinancialPerformanceTable";

const FinancialPerformancePage = () => {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />

      <div className="main-wrapper">
            <div className="container">
               <FinancialPerformanceCards />
               <FinancialPerformanceGraph />
               <FinancialPerformanceTable />
            </div>
      </div>
    </>
  );
};

export default FinancialPerformancePage;



