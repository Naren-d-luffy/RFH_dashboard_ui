import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserAquisitionPage from "./Pages/UserDashboards/UserAquisitionPage";
import UserEngagementPage from "./Pages/UserDashboards/UserEngagementPage";
import CampaignPerformancePage from "./Pages/Marketing/CampaignPerformancePage";
import UserManagementPage from "./Pages/Admin/UserManagementPage";
import PatientAcquisitionPage from "./Pages/Marketing/PatientAcquisitionPage";
import PatientDetailPage from "./Pages/Marketing/PatientDetailPage";
import SettingsPage from "./Pages/Settings/SettingsPage";
import EducationOverviewPage from "./Pages/PatientEducation/EducationOverviewPage";
import EducationResourcesPage from "./Pages/PatientEducation/EducationResourcesPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(Component = <UserAquisitionPage />)}
        />
        <Route
          path="/userdashboards/userengagement"
          element={(Component = <UserEngagementPage />)}
        />
        <Route
          path="/admin/usermanagement"
          element={(Component = <UserManagementPage />)}
        />
        <Route
          path="/marketing/campaignperformance"
          element={(Component = <CampaignPerformancePage />)}
        />
        <Route
          path="/marketing/patientacquisition"
          element={(Component = <PatientAcquisitionPage />)}
        />
        <Route
          path="/marketing/patientacquisition/patientdetail"
          element={(Component = <PatientDetailPage />)}
        />
        <Route
          path="/dashboard/settings"
          element={(Component = <SettingsPage />)}
        />
        <Route
          path="/patient-education/overview"
          element={(Component = <EducationOverviewPage />)}
        />
        <Route
          path="/patient-education/resources"
          element={(Component = <EducationResourcesPage />)}
        />
      </Routes>
    </BrowserRouter>
  );
};
