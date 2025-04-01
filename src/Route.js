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
import ReadingMaterialsList from "./Components/PatientEducation/EducationResources/ReadingMaterials/ReadingMaterialsTable";
import FacilityTable from "./Components/DepartmentDetails/Facility/FacilityTable";
import BlogsTable from "./Components/Marketing/InAppCampaign/Blogs/BlogListTables";
import ServiceTable from "./Components/DepartmentDetails/DepartmentService/ServiceTable";
import TechnologyTable from "./Components/DepartmentDetails/Technology/TechnologyTable";
import ConditionWeTreatTable from "./Components/DepartmentDetails/ConditionWeTreat/ConditionWeTreatTable";
import RecommendedVideosTable from "./Components/Marketing/InAppCampaign/RecommendedVideos/RecommendedVideosTable";
import { TermsAndConditionsList } from "./Components/Settings/TermsAndConditions/TermsAndConditionsList";
import AboutHospital from "./Components/Settings/AboutHospital";
import AllConfigList from "./Components/Settings/Config/AllConfigList";
import RoleBasedPage from "./Pages/RoleBased/RoleBasedPage";
import { UnAuthorizedPage } from "./UnAuthorizedPage";
import ProtectedRoute from "./PrivateRoute";
import AddRoleBased from "./Components/RoleBased/AddRoleBased";
import EditRoleBased from "./Components/RoleBased/EditRoleAccess";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

export const AppRouter = () => {
    const auth = useAuth();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        {/* <Route path="/sign-up" element={<SignUp />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        <Route path="/otp-verification" element={<OtpScreen />} />
        {/* <Route path="/signup-otp" element={<SignUpOtpScreen />} /> */}
        <Route path="/confirm-password" element={<ConfirmPassword />} />

        <Route element={auth.isAuthenticated ? <Layout /> : <Navigate to="/" replace />} >
          <Route
            path="/user-dashboards/user-aquisition"
            element={<ProtectedRoute element={<UserAquisitionPage />} />}
          />
          <Route
            path="/user-dashboards/user-engagement"
            element={<ProtectedRoute element={<UserEngagementPage />} />}
          />
          <Route
            path="/admin/user-management"
            element={<ProtectedRoute element={<UserManagementPage />} />}
          />
          <Route
            path="/marketing/campaign-performance"
            element={<ProtectedRoute element={<CampaignPerformancePage />} />}
          />

          <Route
            path="/marketing/patient-acquisition"
            element={<ProtectedRoute element={<PatientAcquisitionPage />} />}
          />
          <Route
            path="/marketing/patient-acquisition/patient-detail"
            element={<ProtectedRoute element={<PatientDetailPage />} />}
          />

          <Route path="/hello-doctor" element={<ProtectedRoute element={<HelloDoctorPage />} />} />

          <Route path="/dashboard/settings" element={<ProtectedRoute element={<SettingsPage />} />} />

          <Route path="/user-engagement" element={<ProtectedRoute element={<UserEngagementPage />} />} />
          {/* <Route
            path="marketing/in-app-campaign"
            element={<InAppCampaignPage />}
          /> */}
          {/* <ProtectedRoute 
           path="marketing/in-app-campaign" 
          component={InAppCampaignPage} 
          requiredCategory="Marketing"
        /> */}
          <Route
            path="/marketing/in-app-campaign"
            element={<ProtectedRoute element={<InAppCampaignPage />} requiredCategory="Marketing" />}
          />

          <Route
            path="/patient-education/overview"
            element={<ProtectedRoute element={<EducationOverviewPage />} />}
          />
          {/* <Route
            path="/patient-education/resources"
            element={<EducationResourcesPage />}
          /> */}
          {/* <ProtectedRoute
            path="/patient-education/resources"
            element={<EducationResourcesPage />}
            requiredCategory="Education"
          /> */}
          <Route
            path="/patient-education/resources"
            element={<ProtectedRoute element={<EducationResourcesPage />} requiredCategory="Education" />}
          />
          <Route
            path="/feedback/create-survey"
            element={<ProtectedRoute element={<FeedbackCreateSurvey />} />}
          />
          <Route
            path="/feedback/create-survey-page"
            element={<ProtectedRoute element={<CreateSurveyIndex />} />}
          />
          <Route
            path="/feedback/create-survey/single-survey-details"
            element={<ProtectedRoute element={<SingleSurvey />} />}
          />
          <Route
            path="/feedback/create-survey/populated-survey-data"
            element={<ProtectedRoute element={<SurveyPopulatedData />} />}
          />
          <Route
            path="/feedback/patient-surveys"
            element={<ProtectedRoute element={<PatientSurveys />} />}
          />
          <Route
            path="/feedback/view-feedback"
            element={<ProtectedRoute element={<ViewFeedbackIndex />} />}
          />
          <Route
            path="/feedback/negative-feedback"
            element={<ProtectedRoute element={<UserNegativeFeedbackPage />} />}
          />
          <Route
            path="/teleconsultation/appointment-status"
            element={<ProtectedRoute element={<AppointmentStatusPage />} />}
          />

          {/* operational Routes */}
          <Route
            path="/operational/appointment-reports"
            element={<ProtectedRoute element={<AppointmentReports />} />}
          />

          <Route
            path="/teleconsultation/appointment-feedback"
            element={<ProtectedRoute element={<AppointmentFeedbackPage />} />}
          />
          <Route
            path="/teleconsultation/virtual-management"
            element={<ProtectedRoute element={<VirtualManagementPage />} requiredCategory="Teleconsultation" />}
          />
          <Route
            path="/teleconsultation/doctor-detail"
            element={<ProtectedRoute element={<DoctorDetailPage />} />}
          />
          <Route
            path="/teleconsultation/doctor-detail/:id"
            element={<ProtectedRoute element={<DoctorDetailPage />} />}
          />
          <Route
            path="/teleconsultation/view-doctor-detail/:id"
            element={<ProtectedRoute element={<ViewDoctorDetailPage />} />}
          />
          <Route
            path="/medication-tracker"
            element={<ProtectedRoute element={<MedicationTrackerPage />} />}
          />
          <Route
            path="/medication-tracker/patient-detail"
            element={<ProtectedRoute element={<MedicationTrackerPatientDetailPage />} />}
          />
          <Route
            path="/medication-tracker/add-patient-detail"
            element={<ProtectedRoute element={<AddPatientDetailPage />} />}
          />
          <Route path="/sidebar/notification" element={<ProtectedRoute element={<NotificationIndex />} />} />
          <Route
            path="/header/notification"
            element={<ProtectedRoute element={<HeaderNotificationPage />} />}
          />
          <Route
            path="/operational/service-utilization"
            element={<ProtectedRoute element={<ServiceUtilizationPage />} />}
          />
          <Route
            path="/operational/financial-performance"
            element={<ProtectedRoute element={<FinancialPerformancePage />} />}
          />
          <Route
            path="/teleconsultation/technical-support"
            element={<ProtectedRoute element={<ChatPage />} />}
          />
          <Route path="/chat" element={<ProtectedRoute element={<ChattingPage />} />} />
          <Route
            path="/news"
            element={<ProtectedRoute element={<NewsPage />} requiredCategory="News" />}
          />
          <Route path="/community-post" element={<ProtectedRoute element={<CommunityPostPage />} />} />
          <Route path="/health-package" element={<ProtectedRoute element={<HealthPackagePage />} />} />
          {/* <Route
            path="/department-details"
            element={<DepartmentDetailsPage />}
          /> */}
          <Route
            path="/department-details"
            element={<ProtectedRoute element={<DepartmentDetailsPage />} requiredCategory="Department" />}
          />
          <Route path="/view-all-treatments" element={<ProtectedRoute element={<TreatmentList />} />} />
          <Route path="/view-all-blog-lists" element={<ProtectedRoute element={<BlogsTable />} />} />
          <Route path="/view-all-service-lists" element={<ProtectedRoute element={<ServiceTable />} />} />

          <Route
            path="/view-all-gastro-illness"
            element={<ProtectedRoute element={<GastroIllnessTable />} />}
          />
          <Route path="/view-all-events" element={<ProtectedRoute element={<TableEventsList />} />} />
          <Route path="/view-all-features" element={<ProtectedRoute element={<FeaturesTable />} />} />

          <Route
            path="/view-all-outstation-clinic"
            element={<ProtectedRoute element={<OutstationClinicTable />} />}
          />

          <Route path="/view-all-hello-doctor" element={<ProtectedRoute element={<HelloDoctorTable />} />} />
          <Route
            path="/teleconsultation/doctors-list"
            element={<ProtectedRoute element={<DoctorsTableView />} />}
          />

          <Route path="/view-all-camp-table" element={<ProtectedRoute element={<ViewAllCampTable />} />} />

          <Route
            path="/view-all-readingmaterials"
            element={<ProtectedRoute element={<ReadingMaterialsList />} />}
          />
          <Route path="/view-all-facility-list" element={<ProtectedRoute element={<FacilityTable />} />} />
          <Route
            path="/view-all-technology-list"
            element={<ProtectedRoute element={<TechnologyTable />} />}
          />
          <Route
            path="/view-all-condition-we-treat-list"
            element={<ProtectedRoute element={<ConditionWeTreatTable />} />}
          />
          <Route
            path="/view-all-recommended-videos-table"
            element={<ProtectedRoute element={<RecommendedVideosTable />} />}
          />
          <Route
            path="/terms-conditions"
            element={<ProtectedRoute element={<TermsAndConditionsList />} requiredCategory="Terms" />}
          />
          <Route
            path="/about-hospital"
            element={<ProtectedRoute element={<AboutHospital />} requiredCategory="AboutHospital" />}
          />
          <Route
            path="/configuration"
            element={<ProtectedRoute element={<AllConfigList />} requiredCategory="Configuration" />}
          />
          <Route
            path="/role-based"
            element={<ProtectedRoute element={<RoleBasedPage />} requiredCategory="RoleBasedAccess" />}
          />

          <Route path="/admin/Unauthorized"  element={<UnAuthorizedPage />} />
          <Route
            path="/add-role-access"
            element={<ProtectedRoute element={<AddRoleBased />} />}
          />
          <Route
            path="/edit-role-access/:id"
            element={<ProtectedRoute element={<EditRoleBased />} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
