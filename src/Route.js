import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserAquisitionPage from "./Pages/UserDashboards/UserAquisitionPage";
import UserEngagementPage from "./Pages/UserDashboards/UserEngagementPage";
import UserManagementPage from "./Pages/Admin/UserManagementPage";
import CampaignPerformancePage from "./Pages/Marketing/CampaignPerformancePage";
import PatientAcquisitionPage from "./Pages/Marketing/PatientAcquisitionPage";
import PatientDetailPage from "./Pages/Marketing/PatientDetailPage";
import SettingsPage from "./Pages/Settings/SettingsPage";
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
import AppointmentReports from "./Pages/Operational/AppointmentReports";
import AppointmentFeedbackPage from "./Pages/Teleconsultation/AppoinmentFeedback";
import VirtualManagementPage from "./Pages/Teleconsultation/VirtualManagement";
import DoctorDetailPage from "./Pages/Teleconsultation/DoctorDetailPage";
import ViewDoctorDetailPage from "./Pages/Teleconsultation/ViewDoctorDetailPage";
import MedicationTrackerPage from "./Pages/MedicationTracker/MedicationTrackerPage";
import MedicationTrackerPatientDetailPage from "./Pages/MedicationTracker/MedicationTrackerPatientDetailPage";
import AddPatientDetailPage from "./Pages/MedicationTracker/AddPatientDetailPage";
import NotificationIndex from "./Pages/Notification/NotificationIndex";
import HeaderNotificationPage from "./Pages/HeaderNotification/HeaderNotification";
import ServiceUtilizationPage from "./Pages/Operational/ServiceUtilizationPage";
import FinancialPerformancePage from "./Pages/Operational/FinancialPerformancePage";
import ChatPage from "./Pages/Teleconsultation/ChatPage";
import ChattingPage from "./Pages/Chat/chatPage";
import Layout from "./Pages";
import SignIn from "./Components/Auth/SignIn";
import HelloDoctorPage from "./Pages/HelloDoctor/HelloDoctorPage";
import NewsPage from "./Pages/News/NewsPage";
import CommunityPostPage from "./Pages/CommunityPost/CommunityPostPage";
import { HealthPackagePage } from "./Pages/HealthPackage/HealthPackagePage";
import SignUp from "./Components/Auth/SignUp";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import OtpScreen from "./Components/Auth/OtpScreen";
import ConfirmPassword from "./Components/Auth/ConfirmPassword";
import DepartmentDetailsPage from "./Pages/DepartmentDetails/DepartmentPage";
import TreatmentList from "./Components/PatientEducation/EducationResources/TreatmentInfo/TreatmentsInfoTable";
import GastroIllnessTable from "./Components/PatientEducation/EducationResources/GastroIllness/GastroIllnessTable";
import TableEventsList from "./Components/Marketing/InAppCampaign/UpcomingEvent/TableEventsList";
import OutstationClinicTable from "./Components/Marketing/InAppCampaign/OutstationClinic/OutstationClinicTable";
import FeaturesTable from "./Components/Marketing/InAppCampaign/FeaturedPrograms/ViewAllFeatureTable";
import HelloDoctorTable from "./Components/Marketing/InAppCampaign/HelloDoctor/HelloDoctorTable";
import DoctorsTableView from "./Components/Teleconsultation/DoctorsList/DoctorsTableView";
import ViewAllCampTable from "./Components/Marketing/InAppCampaign/LatestCamps/ViewAllCampTable";
import Register from "./Components/Auth/Register";
import SignUpOtpScreen from "./Components/Auth/SignUpOtp";
import ReadingMaterialsList from "./Components/PatientEducation/EducationResources/ReadingMaterials/ReadingMaterialsTable";
import FacilityTable from "./Components/DepartmentDetails/Facility/FacilityTable";
import BlogsTable from "./Components/Marketing/InAppCampaign/Blogs/BlogListTables";
import ServiceTable from "./Components/DepartmentDetails/DepartmentService/ServiceTable";
import TechnologyTable from "./Components/DepartmentDetails/Technology/TechnologyTable";
import ConditionWeTreatTable from "./Components/DepartmentDetails/ConditionWeTreat/ConditionWeTreatTable";
import RecommendedVideosTable from "./Components/Marketing/InAppCampaign/RecommendedVideos/RecommendedVideosTable";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verification" element={<OtpScreen />} />
        <Route path="/signup-otp" element={<SignUpOtpScreen />} />
        <Route path="/confirm-password" element={<ConfirmPassword />} />

        <Route element={<Layout />}>
          <Route
            path="/user-dashboards/user-aquisition"
            element={<UserAquisitionPage />}
          />
          <Route
            path="/user-dashboards/user-engagement"
            element={<UserEngagementPage />}
          />
          <Route
            path="/admin/user-management"
            element={<UserManagementPage />}
          />
          <Route
            path="/marketing/campaign-performance"
            element={<CampaignPerformancePage />}
          />
          <Route
            path="/marketing/patient-acquisition"
            element={<PatientAcquisitionPage />}
          />
          <Route
            path="/marketing/patient-acquisition/patient-detail"
            element={<PatientDetailPage />}
          />

          <Route path="/hello-doctor" element={<HelloDoctorPage />} />

          <Route path="/dashboard/settings" element={<SettingsPage />} />

          <Route path="/user-engagement" element={<UserEngagementPage />} />
          <Route
            path="marketing/in-app-campaign"
            element={<InAppCampaignPage />}
          />

          <Route
            path="/patient-education/overview"
            element={<EducationOverviewPage />}
          />
          <Route
            path="/patient-education/resources"
            element={<EducationResourcesPage />}
          />
          <Route
            path="/feedback/create-survey"
            element={<FeedbackCreateSurvey />}
          />
          <Route
            path="/feedback/create-survey-page"
            element={<CreateSurveyIndex />}
          />
          <Route
            path="/feedback/create-survey/single-survey-details"
            element={<SingleSurvey />}
          />
          <Route
            path="/feedback/create-survey/populated-survey-data"
            element={<SurveyPopulatedData />}
          />
          <Route
            path="/feedback/patient-surveys"
            element={<PatientSurveys />}
          />
          <Route
            path="/feedback/view-feedback"
            element={<ViewFeedbackIndex />}
          />
          <Route
            path="/feedback/negative-feedback"
            element={<UserNegativeFeedbackPage />}
          />
          <Route
            path="/teleconsultation/appointment-status"
            element={<AppointmentStatusPage />}
          />

          {/* operational Routes */}
          <Route
            path="/operational/appointment-reports"
            element={<AppointmentReports />}
          />

          <Route
            path="/teleconsultation/appointment-feedback"
            element={<AppointmentFeedbackPage />}
          />
          <Route
            path="/teleconsultation/virtual-management"
            element={<VirtualManagementPage />}
          />
          <Route
            path="/teleconsultation/doctor-detail"
            element={<DoctorDetailPage />}
          />
          <Route
            path="/teleconsultation/doctor-detail/:id"
            element={<DoctorDetailPage />}
          />
          <Route
            path="/teleconsultation/view-doctor-detail/:id"
            element={<ViewDoctorDetailPage />}
          />
          <Route
            path="/medication-tracker"
            element={<MedicationTrackerPage />}
          />
          <Route
            path="/medication-tracker/patient-detail"
            element={<MedicationTrackerPatientDetailPage />}
          />
          <Route
            path="/medication-tracker/add-patient-detail"
            element={<AddPatientDetailPage />}
          />
          <Route path="/sidebar/notification" element={<NotificationIndex />} />
          <Route
            path="/header/notification"
            element={<HeaderNotificationPage />}
          />
          <Route
            path="/operational/service-utilization"
            element={<ServiceUtilizationPage />}
          />
          <Route
            path="/operational/financial-performance"
            element={<FinancialPerformancePage />}
          />
          <Route
            path="/teleconsultation/technical-support"
            element={<ChatPage />}
          />
          <Route path="/chat" element={<ChattingPage />} />
          <Route path="/news" element={<NewsPage />} />

          <Route path="/community-post" element={<CommunityPostPage />} />
          <Route path="/health-package" element={<HealthPackagePage />} />
          <Route
            path="/department-details"
            element={<DepartmentDetailsPage />}
          />
          <Route path="/view-all-treatments" element={<TreatmentList />} />
          <Route path="/view-all-blog-lists" element={<BlogsTable />} />
          <Route path="/view-all-service-lists" element={<ServiceTable />} />

          <Route
            path="/view-all-gastro-illness"
            element={<GastroIllnessTable />}
          />
          <Route path="/view-all-events" element={<TableEventsList />} />
          <Route path="/view-all-features" element={<FeaturesTable />} />

          <Route
            path="/view-all-outstation-clinic"
            element={<OutstationClinicTable />}
          />

          <Route path="/view-all-hello-doctor" element={<HelloDoctorTable />} />
          <Route path="/teleconsultation/doctors-list" element={<DoctorsTableView />} />

          <Route path="/view-all-camp-table" element={<ViewAllCampTable />} />

          <Route path="/view-all-readingmaterials" element={<ReadingMaterialsList />} />
          <Route path="/view-all-facility-list" element={<FacilityTable />} />
          <Route path="/view-all-technology-list" element={<TechnologyTable />} />
          <Route path="/view-all-condition-we-treat-list" element={<ConditionWeTreatTable />} />
          <Route path="/view-all-recommended-videos-table" element={<RecommendedVideosTable />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};
