import React from "react";
import "./marketing.css";
import CampaignPerformance from "../../Components/Marketing/CampaignPerformance/CampaignPerformance";
import CampaignPerformanceGraph from "../../Components/Marketing/CampaignPerformance/CampaignPerformanceGraph";
import CampaignPerformanceTable from "../../Components/Marketing/CampaignPerformance/CampaignPerformanceTable";

const CampaignPerformancePage = () => {
  return (
    <>
      <CampaignPerformance />
      <CampaignPerformanceGraph />
      <CampaignPerformanceTable />
    </>
  );
};

export default CampaignPerformancePage;
