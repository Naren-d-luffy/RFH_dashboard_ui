import React from "react";
import UserManagementCards from "../../Components/Admin/UserManagement/UserManagementCards";
import UserManagementGraph from "../../Components/Admin/UserManagement/UserManagementGraph";
// import UserManagementTable from "../../Components/Admin/UserManagement/UserManagementTable";
import "./admin.css";
const UserManagementPage = () => {
  return (
    <>
        <UserManagementCards />
        <UserManagementGraph />
        {/* <UserManagementTable /> */}
    </>
  );
};

export default UserManagementPage;
