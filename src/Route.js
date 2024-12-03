import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserAquisitionPage from "./Pages/UserDashboards/UserAquisitionPage";
import CampaignPerformancePage from "./Pages/Marketing/CampaignPerformancePage";
import UserManagementPage from "./Pages/Admin/UserManagementPage";
import PatientAcquisitionPage from "./Pages/Marketing/PatientAcquisitionPage";
import PatientDetailPage from "./Pages/Marketing/PatientDetailPage";
import SettingsPage from "./Pages/Settings/SettingsPage";
import UserEngagementPage from "./Pages/UserDashboards/UserEngagementPage";
import InAppCampaignPage from "./Pages/Marketing/InAppCampaignPage";
import EducationOverviewPage from "./Pages/PatientEducation/EducationOverviewPage";
import EducationResourcesPage from "./Pages/PatientEducation/EducationResourcesPage";
import FeedbackCreateSurvey from "./Pages/Feedback/FeedbackCreateSurvey";
import CreateSurveyIndex from "./Pages/Feedback/CreateSurveyIndex";
import SingleSurvey from "./Pages/Feedback/SingleSurvey";
import SurveyPopulatedData from "./Pages/Feedback/SurveyPopulatedData";
import PatientSurveys from "./Pages/Feedback/PatientSurveys";
import ViewFeedbackIndex from "./Pages/Feedback/ViewFeedbackIndex";
import UserNegativeFeedbackPage from "./Pages/Feedback/UserNegativeFeedbackPage";
import AppointmentStatusPage from "./Pages/Teleconsultation/AppointmentStatus";
import AppointmentFeedbackPage from "./Pages/Teleconsultation/AppoinmentFeedback";
import VirtualManagementPage from "./Pages/Teleconsultation/VirtualManagement";
import DoctorDetailPage from "./Pages/Teleconsultation/DoctorDetailPage";
import ViewDoctorDetailPage from "./Pages/Teleconsultation/ViewDoctorDetailPage";
import HeaderNotificationPage from "./Pages/HeaderNotification/HeaderNotification";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={(Component = <UserAquisitionPage />)} />
        <Route
          path="/user-dashboards/user-engagement"
          element={(Component = <UserEngagementPage />)}
        />
        <Route
          path="/admin/user-management"
          element={(Component = <UserManagementPage />)}
        />
        <Route
          path="/marketing/campaign-performance"
          element={(Component = <CampaignPerformancePage />)}
        />
        <Route
          path="/marketing/patient-acquisition"
          element={(Component = <PatientAcquisitionPage />)}
        />
        <Route
          path="/marketing/patient-acquisition/patient-detail"
          element={(Component = <PatientDetailPage />)}
        />
        <Route
          path="/dashboard/settings"
          element={(Component = <SettingsPage />)}
        />

        <Route
          path="/user-engagement"
          element={(Component = <UserEngagementPage />)}
        />
        <Route
          path="marketing/in-app-campaign"
          element={(Component = <InAppCampaignPage />)}
        />

        <Route
          path="/patient-education/overview"
          element={(Component = <EducationOverviewPage />)}
        />
        <Route
          path="/patient-education/resources"
          element={(Component = <EducationResourcesPage />)}
        />
        <Route
          path="/feedback/create-survey"
          element={(Component = <FeedbackCreateSurvey />)}
        />
        <Route
          path="/feedback/create-survey-page"
          element={(Component = <CreateSurveyIndex />)}
        />
        <Route
          path="/feedback/create-survey/single-survey-details"
          element={(Component = <SingleSurvey />)}
        />
        <Route
          path="/feedback/create-survey/populated-survey-data"
          element={(Component = <SurveyPopulatedData />)}
        />
        <Route
          path="/feedback/patient-surveys"
          element={(Component = <PatientSurveys />)}
        />
        <Route
          path="/feedback/view-feedback"
          element={(Component = <ViewFeedbackIndex />)}
        />
        <Route
          path="/feedback/negative-feedback"
          element={(Component = <UserNegativeFeedbackPage />)}
        />
        <Route

          path="/teleconsultation/appointment-status"
          element={(Component = <AppointmentStatusPage />)}
        />
        <Route
          path="/teleconsultation/appointment-feedback"
          element={(Component = <AppointmentFeedbackPage />)}
        />
        <Route

          path="/teleconsultation/virtual-management"
          element={(Component = <VirtualManagementPage />)}
        />
        <Route
          path="/teleconsultation/doctor-detail"
          element={(Component = <DoctorDetailPage />)}
        />
        <Route
          path="/teleconsultation/view-doctor-detail"
          element={(Component = <ViewDoctorDetailPage />)}
        />
        <Route
          path="/header/notification"
          element={(Component = <HeaderNotificationPage />)}
        />
      </Routes>
    </BrowserRouter>
  );
};
