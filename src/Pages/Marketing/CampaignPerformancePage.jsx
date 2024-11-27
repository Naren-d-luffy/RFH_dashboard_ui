import React from "react";
import "./marketing.css";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import CampaignPerformance from "../../Components/Marketing/CampaignPerformance/CampaignPerformance";
import CampaignPerformanceGraph from "../../Components/Marketing/CampaignPerformance/CampaignPerformanceGraph";
import CampaignPerformanceTable from "../../Components/Marketing/CampaignPerformance/CampaignPerformanceTable";


const CampaignPerformancePage = () => {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />

      <div className="main-wrapper">
        <CampaignPerformance />
        <CampaignPerformanceGraph />
        <CampaignPerformanceTable />
      </div>
    </>
  );
};

export default CampaignPerformancePage;

