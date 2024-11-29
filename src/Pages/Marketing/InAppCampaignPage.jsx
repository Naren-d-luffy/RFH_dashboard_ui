import React from "react";
import "./marketing.css";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import { InAppCampaigncards } from "../../Components/Marketing/InAppCampaign/InAppCampaigncards";
import { MarketingCategories } from "../../Components/Marketing/InAppCampaign/MarketingCategories";



const InAppCampaignPage = () => {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />

      <div className="main-wrapper">
       <div className="container">
       <InAppCampaigncards/>
       <MarketingCategories/>
       </div>
 
      </div>
    </>
  );
};

export default InAppCampaignPage;

