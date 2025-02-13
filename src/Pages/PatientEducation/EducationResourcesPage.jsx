import React from "react";
import "./patienteducation.css";
import EducationResourcesCards from "../../Components/PatientEducation/EducationResources/EducationResourcesCards";
import EducationCategoriesTreatmentsInfo from "../../Components/PatientEducation/EducationResources/TreatmentInfo/EducationCategoriesTreatmentsInfo";
// import EducationCategoriesHealthTools from "../../Components/PatientEducation/EducationResources/EducationCategoriesHealthTools";
import EducationCategoriesQuestions from "../../Components/PatientEducation/EducationResources/FaqsSection/EducationCategoriesQuestions";
import EducationCategoriesGastroIllness from "../../Components/PatientEducation/EducationResources/GastroIllness/EducationCategoriesGastroIllness";
// import CategoriesReadingMaterials from "../../Components/PatientEducation/EducationResources/ReadingMaterials/CategoriesReadingMaterials";

const EducationResourcesPage = () => {
  return (
    <>
      <EducationResourcesCards />
      <EducationCategoriesGastroIllness />
      <EducationCategoriesTreatmentsInfo />
      {/* <EducationCategoriesHealthTools /> */}
      {/* <CategoriesReadingMaterials /> */}
      <EducationCategoriesQuestions />
    </>
  );
};

export default EducationResourcesPage;
