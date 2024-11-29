import React, { Component } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import UserAquisitionPage from "./Pages/UserDashboards/UserAquisitionPage";
import CampaignPerformancePage from "./Pages/Marketing/CampaignPerformancePage";
import UserManagementPage from "./Pages/Admin/UserManagementPage";
import PatientAcquisitionPage from "./Pages/Marketing/PatientAcquisitionPage";
import PatientDetailPage from "./Pages/Marketing/PatientDetailPage";
import SettingsPage from "./Pages/Settings/SettingsPage";
import UserEngagementPage from "./Pages/UserDashboards/UserEngagementPage";
import InAppCampaignPage from "./Pages/Marketing/InAppCampaignPage";
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={(Component = <UserAquisitionPage />)} />
        <Route
          path="/campaign-performance-page"
          element={(Component = <CampaignPerformancePage />)}
        />
        <Route path="/admin-usermanagement"
          element={(Component = <UserManagementPage />)} 
        />

        <Route
          path="/patient-acquisition-page"
          element={(Component = <PatientAcquisitionPage />)}
        />

      <Route
          path="/patient-detail-page"
          element={(Component = <PatientDetailPage />)}
        />
         <Route
          path="/dashboard/settings-page"
          element={(Component = <SettingsPage />)}
        />
        <Route path="/user-engagement" element={(Component = <UserEngagementPage />)} />
        <Route path="marketing/in-app-campaign" element={(Component = <InAppCampaignPage />)} />
      </Routes>
    </BrowserRouter>
  );
};
