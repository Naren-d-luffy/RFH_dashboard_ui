
import React from "react";
import "./Feedback.css";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import CreateSurveyTable from "../../Components/Feedback/CreateSurvey/CreateSurveyTable";
import { FeedbackCreateSurveyCard } from "../../Components/Feedback/CreateSurvey/FeedbackCreateSurveyCard";
import CreateSurveyPage from "../../Components/Feedback/CreateSurvey/CreateSurveyPage";


const CreateSurveyIndex = () => {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />
      <div className="main-wrapper">
        {/* <FeedbackCreateSurveyCard/> */}
        <CreateSurveyPage />
      </div>
    </>
  );
};

export default CreateSurveyIndex;

