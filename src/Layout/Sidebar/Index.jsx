import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../layout.css";
import lightLogo from "../../Assets/Images/logo.png";
import darkLogo from "../../Assets/Images/darkLogo.png"
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { GoShieldCheck } from "react-icons/go";
import { TbCirclePercentage } from "react-icons/tb";
import {
  Bell,
  Handshake,
  LogOut,
  MemoryStick,
  MessageCircleCode,
  MessageSquareMore,
  Settings,
} from "lucide-react";
import { SlGraduation } from "react-icons/sl";
import { IoMenu, IoTelescopeOutline } from "react-icons/io5";
import { BiCapsule } from "react-icons/bi";
import { useDarkMode } from "../../DarkMode";

const menuConfig = [
  {
    id: "userDashboards",
    label: "User Dashboards",
    icon: <MdOutlineDashboard className="sidebar-icon" />,
    subMenu: [
      { label: "User Acquisition & Retention", to: "/user-dashboards/user-aquisition" },
      { label: "User Engagement", to: "/user-dashboards/user-engagement" },
    ],
  },
  {
    id: "admin",
    label: "Admin",
    icon: <GoShieldCheck className="sidebar-icon" />,
    subMenu: [{ label: "User Management", to: "/admin/user-management" }],
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: <TbCirclePercentage className="sidebar-icon" />,
    subMenu: [
      { label: "Campaign Performance", to: "/marketing/campaign-performance" },
      { label: "InApp Campaign", to: "/marketing/in-app-campaign" },
      { label: "Patient Acquisition", to: "/marketing/patient-acquisition" },
    ],
  },
  {
    id: "education",
    label: "Patient Education",
    icon: <SlGraduation className="sidebar-icon" />,
    subMenu: [
      { label: "Education Overview", to: "/patient-education/overview" },
      { label: "Education Resources", to: "/patient-education/resources" },
    ],
  },
  {
    id: "teleconsultation",
    label: "Teleconsultation",
    icon: <IoTelescopeOutline className="sidebar-icon" />,
    subMenu: [
      {
        label: "Virtual Management",
        to: "/teleconsultation/virtual-management",
      },
      {
        label: "Appointment Status",
        to: "/teleconsultation/appointment-status",
      },
      { label: "Technical Support", to: "/teleconsultation/technical-support" },
    ],
  },
  {
    id: "feedback",
    label: "Feedback",
    icon: <MessageCircleCode className="sidebar-icon" size={14} />,
    subMenu: [
      { label: "Create Survey", to: "/feedback/create-survey" },
      { label: "Patient Survey", to: "/feedback/patient-surveys" },
    ],
  },
  {
    id: "operational",
    label: "Operational",
    icon: <Handshake className="sidebar-icon" size={14} />,
    subMenu: [
      { label: "Appointment Reports", to: "/operational/appointment-reports" },
      { label: "Service Utilization", to: "/operational/service-utilization" },
      {
        label: "Financial Performance",
        to: "/operational/financial-performance",
      },
    ],
  },
  {
    id: "technical",
    label: "Technical",
    icon: <MemoryStick className="sidebar-icon" size={14} />,
    subMenu: [
      { label: "User Acquisition & Retention", to: "/" },
      { label: "User Engagement", to: "/" },
      { label: "User Feedback", to: "/" },
    ],
  },
  {
    id: "medication",
    label: "Medication Tracker",
    icon: <BiCapsule className="sidebar-icon" />,
    to: "/medication-tracker",
  },
  {
    id: "chat",
    label: "Chat",
    icon: <MessageSquareMore className="sidebar-icon" size={14} />,
    to: "/chat",
  },
  {
    label: "Notification",
    icon: <Bell className="sidebar-icon" size={14} />,
    to: "/sidebar/notification",
  },
  {
    label: "Settings",
    icon: <Settings className="sidebar-icon" size={14} />,
    to: "/dashboard/settings",
  },
  {
    id: "logout",
    label: "LogOut",
    icon: <LogOut size={14} className="sidebar-icon" />,
    to: "/logout",
  },
];

function SidebarAdmin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleMenu = (menu) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const pathToMenuMap = {
      "/user-dashboards/user-aquisition": "userDashboards",
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
      "/teleconsultation/doctor-detail": "teleconsultation",
      "/teleconsultation/technical-support": "teleconsultation",
      "/operational/appointment-reports": "operational",
      "/operational/service-utilization": "operational",
      "/operational/financial-performance": "operational",
      "/teleconsultation/appointment-feedback": "teleconsultation",
      "/teleconsultation/virtual-management": "teleconsultation",
      "/teleconsultation/view-doctor-detail": "teleconsultation",
      "/medication-tracker": "medicationtracker",
      "/sidebar/notification": "",
      "/logout": "logout",
    };

    const currentPath = location.pathname;
    const activeMenu = pathToMenuMap[currentPath];

    setExpandedMenu(activeMenu);
  }, [location.pathname]);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <button
        className="toggle-btn-header d-block d-sm-block d-md-block d-lg-none"
        onClick={toggleSidebar}
      >
        <IoMenu style={{ width: "30px", height: "30px", position: "fixed" }} />
        <span className="visually-hidden">Toggle sidebar</span>
      </button>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <aside className={`sidebar-content ${isSidebarOpen ? "open" : ""}`}>
          <div className="sidebar-header d-flex justify-content-center align-items-center">
          <img src={isDarkMode ? darkLogo : lightLogo}
              alt="Logo"
              className="sidebar-logo"
              onClick={() => navigate("/")}
            />
            <button
              className="close-btn menu-close-button-response"
              onClick={toggleSidebar}
            >
              <IoMdClose />
            </button>
          </div>
          <nav className="sidebar-nav">
            <ul>
              {menuConfig.map((menuItem) => (
                <li key={menuItem.id}>
                  {menuItem.subMenu ? (
                    <>
                      <div
                        className={`nav-link ${
                          expandedMenu === menuItem.id ? "active-nav-links" : ""
                        }`}
                        onClick={() => toggleMenu(menuItem.id)}
                      >
                        <span className="d-flex align-items-center justify-content-between">
                          <span className="d-flex align-items-center">
                            {menuItem.icon}
                            <span>{menuItem.label}</span>
                          </span>
                          {expandedMenu === menuItem.id ? (
                            <FiChevronUp className="dropdown-icon" />
                          ) : (
                            <FiChevronDown className="dropdown-icon" />
                          )}
                        </span>
                      </div>
                      <ul
                        className={`sub-menu ${
                          expandedMenu === menuItem.id ? "active" : ""
                        }`}
                      >
                        {menuItem.subMenu.map((subItem, subIndex) => (
                          <li key={subIndex} className="sub-nav-list">
                            <Link
                              to={subItem.to}
                              className={`sub-nav-link ${
                                location.pathname === subItem.to
                                  ? "active-sub-link"
                                  : ""
                              }`}
                              onClick={() => {
                                if (isSidebarOpen) toggleSidebar();
                              }}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      to={menuItem.to}
                      className={`nav-link ${
                        location.pathname === menuItem.to
                          ? "active-nav-links"
                          : ""
                      }`}
                      onClick={() => {
                        if (isSidebarOpen) toggleSidebar();
                      }}
                    >
                      {menuItem.icon}
                      {menuItem.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}

export default SidebarAdmin;
