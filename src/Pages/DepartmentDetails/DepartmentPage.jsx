import React from "react";
import DepartmentDetailsList from "../../Components/DepartmentDetails/DepartmentDetailsList";
import FacilityList from "../../Components/DepartmentDetails/Facility/FacilityList";
import TechnologyList from "../../Components/DepartmentDetails/Technology/TechnologyList";
import ServiceList from "../../Components/DepartmentDetails/DepartmentService/ServiceList";

const DepartmentDetailsPage = () => {
  return (
    <>
      <div className="container">
        <ServiceList/>
        <FacilityList/>
        <TechnologyList/>
        <DepartmentDetailsList/>
      </div>
    </>
  );
};

export default DepartmentDetailsPage;
