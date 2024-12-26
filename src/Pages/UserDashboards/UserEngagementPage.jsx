import React from "react";
import "./UserDashboard.css";
import { UserEngagementCards } from "../../Components/UserDashboards/UserEngagement/UserEngagementCards";
import { UserEngagementChart } from "../../Components/UserDashboards/UserEngagement/UserEngagementChart";
import { UserEngagementList } from "../../Components/UserDashboards/UserEngagement/UserEngagementList";

const UserEngagementPage = () => {
  return (
    <>
        <div className="container">
          <UserEngagementCards />
          <UserEngagementChart />
          {/* <UserEngagementList /> */}
        </div>
    </>
  );
};

export default UserEngagementPage;
