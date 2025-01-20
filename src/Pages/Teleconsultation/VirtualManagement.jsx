import React from "react";
import "./teleconsultation.css";
import VirtualManagementCards from "../../Components/Teleconsultation/VirtualManagement/VirtualManagementCards";
import VirtualManagementGraph from "../../Components/Teleconsultation/VirtualManagement/VirtualManagementGraph";
import VirtualManagementTable from "../../Components/Teleconsultation/VirtualManagement/VirtualManagementTable";

const VirtualManagementPage = () => {
  return (
    <>
       <div className="container">
       {/* <VirtualManagementCards />
        <VirtualManagementGraph /> */}
        <VirtualManagementTable />
      </div>
    </>
  );
};

export default VirtualManagementPage;
