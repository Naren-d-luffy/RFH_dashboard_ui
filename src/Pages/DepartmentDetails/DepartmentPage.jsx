import React from "react";
import DepartmentDetailsList from "../../Components/DepartmentDetails/DepartmentDetailsList";
import FacilityList from "../../Components/DepartmentDetails/Facility/FacilityList";
import TechnologyList from "../../Components/DepartmentDetails/Technology/TechnologyList";
import ServiceList from "../../Components/DepartmentDetails/DepartmentService/ServiceList";
import ConditionWeTreatList from "../../Components/DepartmentDetails/ConditionWeTreat/ConditionWeTreatList";

const DepartmentDetailsPage = () => {
  return (
    <>
      <div className="container">
        <ServiceList/>
        <FacilityList/>
        <TechnologyList/>
        <ConditionWeTreatList/>
        <DepartmentDetailsList/>
      </div>
    </>
  );
};

export default DepartmentDetailsPage;
