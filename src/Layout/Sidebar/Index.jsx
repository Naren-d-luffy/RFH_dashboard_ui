import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../layout.css";
import logo from "../../Assets/Images/logo.png";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
// import Swal from "sweetalert2";
import { IoMdClose } from "react-icons/io";
import { IoTelescopeOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { GoShieldCheck } from "react-icons/go";
import { TbCirclePercentage } from "react-icons/tb";
import { SlGraduation } from "react-icons/sl";
import { BiCapsule } from "react-icons/bi";
import {
  Bell,
  Handshake,
  LogOut,
  MemoryStick,
  MessageCircleCode,
  MessageSquareMore,
  Settings,
} from "lucide-react";

function SidebarAdmin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleSidebar = () => {
    console.log("Toggle Sidebar Clicked");
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleMenu = (menu) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  useEffect(() => {
    const pathToMenuMap = {
      "/": "userDashboards",
      "/user-dashboards/user-engagement": "userDashboards",
      "/admin/user-management": "admin",
      "/marketing/campaign-performance": "marketing",
      "/marketing/patient-acquisition": "marketing",
      "/marketing/in-app-campaign": "marketing",
      "/marketing/patient-acquisition/patient-detail": "marketing",
      "/dashboard/settings": "",
      "/patient-education/overview": "education",
      "/patient-education/resources": "education",
      "/feedback/create-survey": "feedback",
      "/feedback/create-survey-page": "feedback",
      "/education-resources/reading-materials": "education",
      "/feedback/create-survey/single-survey-details": "feedback",
      "/feedback/create-survey/populated-survey-data": "feedback",
      "/feedback/patient-surveys": "feedback",
      "/feedback/view-feedback": "feedback",
      "/feedback/negative-feedback": "feedback",
      "/teleconsultation/appointment-status": "teleconsultation",
      "/operational/appointment-reports":"operational",
      "/operational/service-utilization":"operational",
      "/operational/financial-performance":"operational",
      "/teleconsultation/appointment-feedback": "teleconsultation",
      "/teleconsultation/virtual-management": "teleconsultation",

      "/medication-tracker": "medicationtracker",

      "/sidebar/notification":"",

    };

    const currentPath = location.pathname;
    const activeMenu = pathToMenuMap[currentPath];

    setExpandedMenu(activeMenu);
  }, [location.pathname]);

  return (
    <>
      {/* <div className="toggle-btn" onClick={toggleSidebar}>
        <FiMenu size={26} />
      </div> */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""} `}>
        <aside className={`sidebar-content ${isSidebarOpen ? "open" : ""} `}>
          {isSidebarOpen && (
            <div className="overlay overlay-open" onClick={closeSidebar}></div>
          )}

          <div className="sidebar-header d-flex justify-content-center align-items-center">
            <img
              style={{ cursor: "pointer" }}
              src={logo}
              alt="RFH"
              className="sidebar-logo"
              onClick={()=>navigate("/")}
            />

            <div className="d-lg-none" onClick={closeSidebar}>
              <IoMdClose size={26} />
            </div>
          </div>
          <nav className="sidebar-nav">
            <ul>
              <li>
                <div
                  className={`nav-link ${
                    expandedMenu === "userDashboards" ? "active-nav-links" : ""
                  }`}
                  onClick={() => toggleMenu("userDashboards")}
                >
                  <span className="d-flex align-items-center justify-content-between">
                    <span className="d-flex align-items-center">
                      <MdOutlineDashboard className="sidebar-icon" />
                      <span> User Dashboards</span>
                    </span>
                    {expandedMenu === "userDashboards" ? (
                      <FiChevronUp className="dropdown-icon" />
                    ) : (
                      <FiChevronDown className="dropdown-icon" />
                    )}
                  </span>
                </div>
                <ul
                  className={`sub-menu ${
                    expandedMenu === "userDashboards" ? "active" : ""
                  }`}
                >
                  <li className="sub-nav-list">
                    <Link
                      to="/"
                      className={`sub-nav-link ${
                        location.pathname === "/" ? "active-sub-link" : ""
                      }`}
                    >
                      User Acquisition & Retention
                    </Link>
                  </li>
                  <li className="sub-nav-list">
                    <Link
                      to="/user-dashboards/user-engagement"
                      className={`sub-nav-link ${
                        location.pathname === "/user-dashboards/user-engagement"
                          ? "active-sub-link"
                          : ""
                      }`}
                    >
                      User Engagement
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <div
                  className={`nav-link ${
                    expandedMenu === "admin" ? "active-nav-links" : ""
                  }`}
                  onClick={() => toggleMenu("admin")}
                >
                  <span className="d-flex align-items-center justify-content-between">
                    <span className="d-flex align-items-center">
                      <GoShieldCheck className="sidebar-icon" />
                      <span> Admin</span>
                    </span>
                    {expandedMenu === "admin" ? (
                      <FiChevronUp className="dropdown-icon" />
                    ) : (
                      <FiChevronDown className="dropdown-icon" />
                    )}
                  </span>
                </div>
                <ul
                  className={`sub-menu ${
                    expandedMenu === "admin" ? "active" : ""
                  }`}
                >
                  <li className="sub-nav-list">
                    <Link
                      to="/admin/user-management"
                      className={`sub-nav-link ${
                        location.pathname === "/admin/user-management"
                          ? "active-sub-link"
                          : ""
                      }`}
                    >
                      User Management
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <div
                  className={`nav-link ${
                    expandedMenu === "marketing" ? "active-nav-links" : ""
                  }`}
                  onClick={() => toggleMenu("marketing")}
                >
                  <span className="d-flex align-items-center justify-content-between">
                    <span className="d-flex align-items-center">
                      <TbCirclePercentage className="sidebar-icon" />
                      <span> Marketing</span>
                    </span>
                    {expandedMenu === "marketing" ? (
                      <FiChevronUp className="dropdown-icon" />
                    ) : (
                      <FiChevronDown className="dropdown-icon" />
                    )}
                  </span>
                </div>
                <ul
                  className={`sub-menu ${
                    expandedMenu === "marketing" ? "active" : ""
                  }`}
                >
                  <li className="sub-nav-list">
                    <Link
                      to="/marketing/campaign-performance"
                      className={`sub-nav-link ${
                        location.pathname === "/marketing/campaign-performance"
                          ? "active-sub-link"
                          : ""
                      }`}
                    >
                      Campaign Performance
                    </Link>
                  </li>
                  <li className="sub-nav-list">
                    <Link
                      to="/marketing/in-app-campaign"
                      className={`sub-nav-link ${
                        location.pathname === "/marketing/in-app-campaign"
                          ? "active-sub-link"
                          : ""
                      }`}
                    >
                      InApp Campaign
                    </Link>
                  </li>
                  <li className="sub-nav-list">
                    <Link
                      to="/marketing/patient-acquisition"
                      className={`sub-nav-link ${
                        location.pathname === "/marketing/patient-acquisition"
                          ? "active-sub-link"
                          : ""
                      }`}
                    >
                      Patient Aquisition
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <div
                  className={`nav-link ${
                    expandedMenu === "education" ? "active-nav-links" : ""
                  }`}
                  onClick={() => toggleMenu("education")}
                >
                  <span className="d-flex align-items-center justify-content-between">
                    <span className="d-flex align-items-center">
                      <SlGraduation className="sidebar-icon" />
                      <span>Patient Education</span>
                    </span>
                    {expandedMenu === "education" ? (
                      <FiChevronUp className="dropdown-icon" />
                    ) : (
                      <FiChevronDown className="dropdown-icon" />
                    )}
                  </span>
                </div>
                <ul
                  className={`sub-menu ${
                    expandedMenu === "education" ? "active" : ""
                  }`}
                >
                  <li className="sub-nav-list">
                    <Link
                      to="/patient-education/overview"
                      className={`sub-nav-link ${
                        location.pathname === "/patient-education/overview"
                          ? "active-sub-link"
                          : ""
                      }`}
                    >
                      Education Overview
                    </Link>
                  </li>
                  <li className="sub-nav-list">
                    <Link
                      to="/patient-education/resources"
                      className={`sub-nav-link ${
                        location.pathname === "/patient-education/resources"
                          ? "active-sub-link"
                          : ""
                      }`}
                    >
                      Education Resources
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <div
                  className={`nav-link ${
                    expandedMenu === "teleconsultation"
                      ? "active-nav-links"
                      : ""
                  }`}
                  onClick={() => toggleMenu("teleconsultation")}
                >
                  <span className="d-flex align-items-center justify-content-between">
                    <span className="d-flex align-items-center">
                      <IoTelescopeOutline className="sidebar-icon" />
                      <span>Teleconsultation</span>
                    </span>
                    {expandedMenu === "teleconsultation" ? (
                      <FiChevronUp className="dropdown-icon" />
                    ) : (
                      <FiChevronDown className="dropdown-icon" />
                    )}
                  </span>
                </div>
                <ul
                  className={`sub-menu ${
                    expandedMenu === "teleconsultation" ? "active" : ""
                  }`}
                >
                  <li className="sub-nav-list">
                    <Link
                      to="/teleconsultation/virtual-management"
                      className={`sub-nav-link ${
                        location.pathname ===
                        "/teleconsultation/virtual-management"
                          ? "active-sub-link"
                          : ""
                      }`}
                    >
                      Virtual Management
                    </Link>
                  </li>
                  <li className="sub-nav-list">
                    <Link
                      to="/teleconsultation/appointment-status"
                      className={`sub-nav-link ${
                        location.pathname ===
                        "/teleconsultation/appointment-status"
                          ? "active-sub-link"
                          : ""
                      }`}
                    >
                      Appointment Status
                    </Link>
                  </li>
                  <li className="sub-nav-list">
                    <Link
                      to="/"
                      className={`sub-nav-link ${
                        location.pathname === "/" ? "active-sub-link" : ""
                      }`}
                    >
                      Technical Support
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <div
                  className={`nav-link ${
                    expandedMenu === "feedback" ? "active-nav-links" : ""
                  }`}
                  onClick={() => toggleMenu("feedback")}
                >
                  <span className="d-flex align-items-center justify-content-between">
                    <span className="d-flex align-items-center">
                      <MessageCircleCode className="sidebar-icon" size={14} />
                      <span> Feedback</span>
                    </span>
                    {expandedMenu === "feedback" ? (
                      <FiChevronUp className="dropdown-icon" />
                    ) : (
                      <FiChevronDown className="dropdown-icon" />
                    )}
                  </span>
                </div>
                <ul
                  className={`sub-menu ${
                    expandedMenu === "feedback" ? "active" : ""
                  }`}
                >
                  <li className="sub-nav-list">
                    <Link
                      to="/feedback/create-survey"
                      className={`sub-nav-link ${
                        location.pathname === "/feedback/create-survey"
                          ? "active-sub-link"
                          : ""
                      }`}
                    >
                      Create Survey
                    </Link>
                  </li>
                  <li className="sub-nav-list">
                    <Link
                      to="/feedback/patient-surveys"
                      className={`sub-nav-link ${
                        location.pathname === "/feedback/patient-surveys"
                          ? "active-sub-link"
                          : ""
                      }`}
                    >
                      Patient Survey
                    </Link>
                  </li>
                  {/* <li className="sub-nav-list">
                    <Link to="/admin/total-applicants" className="sub-nav-link">
                      Total Applicants
                    </Link>
                  </li>
                  <li className="sub-nav-list">
                    <Link to="/admin/total-clients" className="sub-nav-link">
                      Total Clients
                    </Link>
                  </li> */}
                </ul>
              </li>
              <li>
                <div
                  className={`nav-link ${
                    expandedMenu === "operational" ? "active-nav-links" : ""
                  }`}
                  onClick={() => toggleMenu("operational")}
                >
                  <span className="d-flex align-items-center justify-content-between">
                    <span className="d-flex align-items-center">
                      <Handshake className="sidebar-icon" size={14} />
                      <span> Operational</span>
                    </span>
                    {expandedMenu === "operational" ? (
                      <FiChevronUp className="dropdown-icon" />
                    ) : (
                      <FiChevronDown className="dropdown-icon" />
                    )}
                  </span>
                </div>
                <ul
                  className={`sub-menu ${
                    expandedMenu === "operational" ? "active" : ""
                  }`}
                >
                  <li className="sub-nav-list">
                    <Link to="/operational/appointment-reports" className="sub-nav-link">
                      Appointment Reports
                    </Link>
                  </li>
                  <li className="sub-nav-list">
                    <Link to="/operational/service-utilization" className="sub-nav-link">
                      Service Utilization
                    </Link>
                  </li>
                  <li className="sub-nav-list">
                    <Link to="/operational/financial-performance" className="sub-nav-link">
                      Financial Performance
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <div
                  className={`nav-link ${
                    expandedMenu === "technical" ? "active-nav-links" : ""
                  }`}
                  onClick={() => toggleMenu("technical")}
                >
                  <span className="d-flex align-items-center justify-content-between">
                    <span className="d-flex align-items-center">
                      <MemoryStick className="sidebar-icon" size={14} />
                      <span> Technical</span>
                    </span>
                    {expandedMenu === "technical" ? (
                      <FiChevronUp className="dropdown-icon" />
                    ) : (
                      <FiChevronDown className="dropdown-icon" />
                    )}
                  </span>
                </div>
                <ul
                  className={`sub-menu ${
                    expandedMenu === "technical" ? "active" : ""
                  }`}
                >
                  <li className="sub-nav-list">
                    <Link to="/" className="sub-nav-link">
                      User Acquisition & Retention
                    </Link>
                  </li>
                  <li className="sub-nav-list">
                    <Link to="/" className="sub-nav-link">
                      User Engagement
                    </Link>
                  </li>
                  <li className="sub-nav-list">
                    <Link to="/" className="sub-nav-link">
                      User Feedback
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link
                  to="/medication-tracker"
                  className={`nav-link ${
                    location.pathname === "/medication-tracker"
                      ? "active-nav-links"
                      : ""
                  }`}
                >
                  <BiCapsule size={14} className="sidebar-icon" /> Medication
                  Tracker
                </Link>
              </li>

              <li>
                <Link
                  to=""
                  className={`nav-link ${
                    location.pathname === "" ? "active-nav-links" : ""
                  }`}
                >
                  <MessageSquareMore size={14} className="sidebar-icon" /> Chat
                </Link>
              </li>
              <li>
                <Link
                  to="/sidebar/notification"
                  className={`nav-link ${
                    location.pathname === "/sidebar/notification" ? "active-nav-links" : ""
                  }`}
                >
                  <Bell size={14} className="sidebar-icon" /> Notification
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/settings"
                  className={`nav-link ${
                    location.pathname === "/dashboard/settings"
                      ? "active-nav-links"
                      : ""
                  }`}
                >
                  <span className="d-flex align-items-center">
                    <Settings className="sidebar-icon" />
                    <span> Settings</span>
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to=""
                  className={`nav-link ${
                    location.pathname === "" ? "active-nav-links" : ""
                  }`}
                >
                  <LogOut size={14} className="sidebar-icon" /> LogOut
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}

export default SidebarAdmin;
