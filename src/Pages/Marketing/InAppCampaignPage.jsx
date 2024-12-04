import React from "react";
import "./marketing.css";
import { InAppCampaigncards } from "../../Components/Marketing/InAppCampaign/InAppCampaigncards";
import { MarketingCategories } from "../../Components/Marketing/InAppCampaign/MarketingCategories";
import { FeaturedPrograms } from "../../Components/Marketing/InAppCampaign/FeaturedPrograms";

const InAppCampaignPage = () => {
  return (
    <>
      <div className="container">
        <InAppCampaigncards />
        <MarketingCategories />
        <FeaturedPrograms />
      </div>
    </>
  );
};

export default InAppCampaignPage;
