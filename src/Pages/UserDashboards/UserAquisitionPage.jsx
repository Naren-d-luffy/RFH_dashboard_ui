import React from "react";
import "./UserDashboard.css";
import { UserAquisitionCards } from "../../Components/UserDashboards/UserAquisitionAndRetention/UserAquisitionCards";
import UserAquisitionGraphs from "../../Components/UserDashboards/UserAquisitionAndRetention/UserAquisitionGraphs";
import UserAquisitionSecondGraphs from "../../Components/UserDashboards/UserAquisitionAndRetention/UserAquisitionSecondGraph";

const UserAquisitionPage = () => {
  return (
    <>
        <UserAquisitionCards />
        <UserAquisitionGraphs />
        <UserAquisitionSecondGraphs />
    </>
  );
};

export default UserAquisitionPage;
