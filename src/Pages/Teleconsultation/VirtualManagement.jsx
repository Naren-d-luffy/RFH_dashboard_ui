import React from "react";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import "./teleconsultation.css";
import VirtualManagementCards from "../../Components/Teleconsultation/VirtualManagement/VirtualManagementCards";
import VirtualManagementGraph from "../../Components/Teleconsultation/VirtualManagement/VirtualManagementGraph";
import VirtualManagementTable from "../../Components/Teleconsultation/VirtualManagement/VirtualManagementTable";

const VirtualManagementPage = () => {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />

      <div className="main-wrapper">
       <div className="container">
       <VirtualManagementCards />
        <VirtualManagementGraph />
        <VirtualManagementTable />
       </div>
      </div>
    </>
  );
};

export default VirtualManagementPage;
