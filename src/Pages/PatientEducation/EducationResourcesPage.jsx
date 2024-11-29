import React from "react";
import "./patienteducation.css"
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import EducationResourcesCards from "../../Components/PatientEducation/EducationResources/EducationResourcesCards";
import EducationCategoriesGastroIllness from "../../Components/PatientEducation/EducationResources/EducationCategoriesGastroIllness";
import EducationCategoriesTreatmentsInfo from "../../Components/PatientEducation/EducationResources/EducationCategoriesTreatmentsInfo";
import EducationCategoriesHealthTools from "../../Components/PatientEducation/EducationResources/EducationCategoriesHealthTools";
import EducationCategoriesReadingMaterials from "../../Components/PatientEducation/EducationResources/EducationCategoriesReadingMaterials";
import EducationCategoriesQuestions from "../../Components/PatientEducation/EducationResources/EducationCategoriesQuestions";

const EducationResourcesPage = () => {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />

      <div className="main-wrapper">
         <EducationResourcesCards />
         <EducationCategoriesGastroIllness />
         <EducationCategoriesTreatmentsInfo />
         <EducationCategoriesHealthTools />
         <EducationCategoriesReadingMaterials />
         <EducationCategoriesQuestions />
      </div>
    </>
  );
};

export default EducationResourcesPage;

