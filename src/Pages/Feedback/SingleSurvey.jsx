import React from "react";
import "./Feedback.css";
import SingleSurveyCards from "../../Components/Feedback/CreateSurvey/SingleSurveyCards";
import SingleSurveyTable from "../../Components/Feedback/CreateSurvey/SingleSurveyTable";

const SingleSurvey = () => {

  return (
    <>
      <SingleSurveyCards />
      <SingleSurveyTable />
    </>
  );
};

export default SingleSurvey;
