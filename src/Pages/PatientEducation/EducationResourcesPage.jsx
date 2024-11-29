import React from "react";
import "./patienteducation.css"
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import EducationResourcesCards from "../../Components/Patient Education/EducationResourcesCards";
import EducationCategoriesGastroIllness from "../../Components/Patient Education/EducationCategoriesGastroIllness";
import EducationCategoriesTreatmentsInfo from "../../Components/Patient Education/EducationCategoriesTreatmentsInfo";

const EducationResourcesPage = () => {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />

      <div className="main-wrapper">
         <EducationResourcesCards />
         <EducationCategoriesGastroIllness />
         <EducationCategoriesTreatmentsInfo />
      </div>
    </>
  );
};

export default EducationResourcesPage;

