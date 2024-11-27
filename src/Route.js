import React, { Component } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import UserAquisitionPage from "./Pages/UserDashboards/UserAquisitionPage";
import CampaignPerformancePage from "./Pages/Marketing/CampaignPerformancePage";
import SettingsPage from "./Pages/Settings/SettingsPage";
import UserEngagementPage from "./Pages/UserDashboards/UserEngagementPage";
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={(Component = <UserAquisitionPage />)} />
        <Route
          path="/campaign-performance-page"
          element={(Component = <CampaignPerformancePage />)}
        />
         <Route
          path="/dashboard/settings-page"
          element={(Component = <SettingsPage />)}
        />
        <Route path="/user-engagement" element={(Component = <UserEngagementPage />)} />
      </Routes>
    </BrowserRouter>
  );
};
