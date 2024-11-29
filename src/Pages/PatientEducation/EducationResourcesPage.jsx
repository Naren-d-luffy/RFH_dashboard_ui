import React from "react";
import "./patienteducation.css"
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import EducationResourcesCards from "../../Components/PatientEducation/EducationResources/EducationResourcesCards";
import EducationCategoriesGastroIllness from "../../Components/PatientEducation/EducationResources/EducationCategoriesGastroIllness";
import EducationCategoriesTreatmentsInfo from "../../Components/PatientEducation/EducationResources/EducationCategoriesTreatmentsInfo";

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

