import React from "react";
import "./marketing.css";
import { InAppCampaigncards } from "../../Components/Marketing/InAppCampaign/InAppCampaigncards";
import HelloDoctorList from "../../Components/Marketing/InAppCampaign/HelloDoctor/HelloDoctorList";
import UpcomingEventList from "../../Components/Marketing/InAppCampaign/UpcomingEvent/UpcomingEventList";
import { FeaturedProgramsList } from "../../Components/Marketing/InAppCampaign/FeaturedPrograms/FeaturedProgramsList";
import { LatestCampsList } from "../../Components/Marketing/InAppCampaign/LatestCamps/LatestCampsList";
import OutstationClinicList from "../../Components/Marketing/InAppCampaign/OutstationClinic/OutstationClinicList";
import BlogsList from "../../Components/Marketing/InAppCampaign/Blogs/BlogList";

const InAppCampaignPage = () => {
  return (
    <>
      <div className="container">
        <InAppCampaigncards />
        <UpcomingEventList/>
        <HelloDoctorList/>
        <FeaturedProgramsList/>
        <LatestCampsList/>
        <OutstationClinicList/>
        <BlogsList/>
      </div>
    </>
  );
};

export default InAppCampaignPage;
