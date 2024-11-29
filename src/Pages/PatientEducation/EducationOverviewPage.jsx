import React from "react";
import "./patienteducation.css"
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import EducationOverviewCards from "../../Components/Patient Education/EducationOverviewCards";
import EducationOverviewGraph from "../../Components/Patient Education/EducationOverviewGraph";
import EducationOverviewTable from "../../Components/Patient Education/EducationOverviewTable";

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
