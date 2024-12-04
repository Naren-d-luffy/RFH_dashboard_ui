import React from "react";
import "./patienteducation.css";
import EducationOverviewCards from "../../Components/PatientEducation/EducationOverview/EducationOverviewCards";
import EducationOverviewGraph from "../../Components/PatientEducation/EducationOverview/EducationOverviewGraph";
import EducationOverviewTable from "../../Components/PatientEducation/EducationOverview/EducationOverviewTable";

const EducationOverviewPage = () => {
  return (
    <>
      <EducationOverviewCards />
      <EducationOverviewGraph />
      <EducationOverviewTable />
    </>
  );
};

export default EducationOverviewPage;
