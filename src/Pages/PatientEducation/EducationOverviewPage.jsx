import React from "react";
import "./patienteducation.css";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import EducationOverviewCards from "../../Components/PatientEducation/EducationOverview/EducationOverviewCards";
import EducationOverviewGraph from "../../Components/PatientEducation/EducationOverview/EducationOverviewGraph";
import EducationOverviewTable from "../../Components/PatientEducation/EducationOverview/EducationOverviewTable";

const EducationOverviewPage = () => {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />

      <div className="main-wrapper">
        <EducationOverviewCards />
        <EducationOverviewGraph />
        <EducationOverviewTable />

      </div>
    </>
  );
};

export default EducationOverviewPage;
