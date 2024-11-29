import React from "react";
import "./Feedback.css";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import CreateSurveyTable from "../../Components/Feedback/CreateSurvey/CreateSurveyTable";
import { FeedbackCreateSurveyCard } from "../../Components/Feedback/CreateSurvey/FeedbackCreateSurveyCard";


const FeedbackCreateSurvey = () => {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />
      <div className="main-wrapper">
        {/* <FeedbackCreateSurveyCard/> */}
        <CreateSurveyTable />
      </div>
    </>
  );
};

export default FeedbackCreateSurvey;

