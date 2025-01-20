import React from "react";
import DepartmentDetailsList from "../../Components/DepartmentDetails/DepartmentDetailsList";
import FacilityList from "../../Components/DepartmentDetails/Facility/FacilityList";
import TechnologyList from "../../Components/DepartmentDetails/Technology/TechnologyList";

const DepartmentDetailsPage = () => {
  return (
    <>
      <div className="container">
        <FacilityList/>
        <TechnologyList/>
        <DepartmentDetailsList/>
      </div>
    </>
  );
};

export default DepartmentDetailsPage;
