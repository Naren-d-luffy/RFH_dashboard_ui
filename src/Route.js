import React, { Component } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import UserAquisitionPage from "./Pages/UserDashboards/UserAquisitionPage";
import CampaignPerformancePage from "./Pages/Marketing/CampaignPerformancePage";
import PatientAcquisitionPage from "./Pages/Marketing/PatientAcquisitionPage";
import PatientDetailPage from "./Pages/Marketing/PatientDetailPage";
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
          path="/patient-acquisition-page"
          element={(Component = <PatientAcquisitionPage />)}
        />

      <Route
          path="/patient-detail-page"
          element={(Component = <PatientDetailPage />)}
        />
      </Routes>
    </BrowserRouter>
  );
};
