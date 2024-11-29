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
      "/userdashboards/userengagement": "userDashboards",
      "/admin/usermanagement": "admin",
      "/marketing/campaignperformance": "marketing",
      "/marketing/patientacquisition": "marketing",
      "/marketing/patientacquisition/patientdetail": "marketing",
      "/dashboard/settings": "",
      "/patient-education/overview": "education",
      "/patient-education/resources": "education",
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
                        location.pathname === "/"
                          ? "active-sub-link"
                          : ""
                      }`}
                    >
                      User Acquisition & Retention
                    </Link>
                  </li>
                  <li className="sub-nav-list">
                    <Link
                      to="/userdashboards/userengagement"
                      className={`sub-nav-link ${
                        location.pathname === "/userdashboards/userengagement"
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
                      to="/admin/usermanagement"
                      className={`sub-nav-link ${
                        location.pathname === "/admin/usermanagement"
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
                      to="/marketing/campaignperformance"
                      className={`sub-nav-link ${
                        location.pathname === "/marketing/campaignperformance"
                          ? "active-sub-link"
                          : ""
                      }`}
                    >
                      Campaign Performance
                    </Link>
                  </li>
                  <li className="sub-nav-list">
                    <Link to="/" className="sub-nav-link">
                      InApp Campaign
                    </Link>
                  </li>
                  <li className="sub-nav-list">
                    <Link
                      to="/marketing/patientacquisition"
                      className={`sub-nav-link ${
                        location.pathname === "/marketing/patientacquisition"
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
                    <Link to="/patient-education/overview" className={`sub-nav-link ${
                        location.pathname === "/patient-education/overview"
                          ? "active-sub-link"
                          : ""
                      }`}>
                      Education Overview
                    </Link>
                  </li>
                  <li className="sub-nav-list">
                    <Link to="/patient-education/resources"  className={`sub-nav-link ${
                        location.pathname === "/patient-education/resources"
                          ? "active-sub-link"
                          : ""
                      }`}>
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
                {/* <ul
                  className={`sub-menu ${
                    expandedMenu === "clients" ? "active" : ""
                  }`}
                >
                  <li className="sub-nav-list">
                    <Link to="/admin/add-new-client" className="sub-nav-link">
                      Add New Client
                    </Link>
                  </li>
                  <li className="sub-nav-list">
                    <Link to="/admin/top-clients" className="sub-nav-link">
                      Top Client
                    </Link>
                  </li>
                </ul> */}
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
                {/* <ul
                  className={`sub-menu ${
                    expandedMenu === "database" ? "active" : ""
                  }`}
                >
                  <li className="sub-nav-list">
                    <Link to="/admin/total-jobs" className="sub-nav-link">
                      Total Jobs
                    </Link>
                  </li>
                  <li className="sub-nav-list">
                    <Link to="/admin/total-applicants" className="sub-nav-link">
                      Total Applicants
                    </Link>
                  </li>
                  <li className="sub-nav-list">
                    <Link to="/admin/total-clients" className="sub-nav-link">
                      Total Clients
                    </Link>
                  </li>
                </ul> */}
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
                  to=""
                  className={`nav-link ${
                    location.pathname === "" ? "active-nav-links" : ""
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
