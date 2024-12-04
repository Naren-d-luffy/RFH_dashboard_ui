import React from "react";
import "./Feedback.css";
import PatientSurveysCards from "../../Components/Feedback/PatientSurveys/PatientSurveysCards";
import PatientSurveysGraph from "../../Components/Feedback/PatientSurveys/PatientSurveysGraph";
import PatientSurveysTable from "../../Components/Feedback/PatientSurveys/PatientSurveysTable";

const PatientSurveys = () => {
  return (
    <>
      <PatientSurveysCards />
      <PatientSurveysGraph />
      <PatientSurveysTable />
    </>
  );
};

export default PatientSurveys;
