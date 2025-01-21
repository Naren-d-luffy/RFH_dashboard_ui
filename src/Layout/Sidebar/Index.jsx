import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../layout.css";
import lightLogo from "../../Assets/Images/logo.png";
import darkLogo from "../../Assets/Images/darkLogo.png"
import { FiActivity, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { GoShieldCheck } from "react-icons/go";
import { TbCirclePercentage } from "react-icons/tb";
import {
  Bell,
  Handshake,
  LogOut,
  LucideHouse,
  MemoryStick,
  MessageCircleCode,
  MessageSquareMore,
  Settings,
} from "lucide-react";
import { SlGraduation } from "react-icons/sl";
import { IoMenu, IoNewspaperOutline, IoTelescopeOutline } from "react-icons/io5";
import { BiCapsule } from "react-icons/bi";
import { useDarkMode } from "../../DarkMode";
import { HiOutlineUserGroup } from "react-icons/hi";


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
      "/hello-doctor": "hello doctor",
      "/marketing/in-app-campaign": "marketing",
      "/view-all-hello-doctor": "marketing",
      "/view-all-features": "marketing",
      "/view-all-events": "marketing",
      "/view-all-outstation-clinic": "marketing",
      "/view-all-camp-table": "marketing",
      "/marketing/patient-acquisition/patient-detail": "marketing",
      "/dashboard/settings": "",
      "/patient-education/overview": "education",
      "/patient-education/resources": "education",
      "/view-all-gastro-illness": "education",
      "/view-all-treatments": "education",
      "/view-all-treatments": "education",
      "/feedback/create-survey": "feedback",
      "/feedback/create-survey-page": "feedback",
      "/education-resources/reading-materials": "education",
      "/feedback/create-survey/single-survey-details": "feedback",
      "/feedback/create-survey/populated-survey-data": "feedback",
      "/feedback/patient-surveys": "feedback",
      "/feedback/view-feedback": "feedback",
      "/feedback/negative-feedback": "feedback",
      "/teleconsultation/doctors-list":"teleconsultation",
      "/teleconsultation/appointment-status": "teleconsultation",
      "/teleconsultation/doctor-detail": "teleconsultation",
      "/teleconsultation/technical-support": "teleconsultation",
      "/operational/appointment-reports": "operational",
      "/operational/service-utilization": "operational",
      "/operational/financial-performance": "operational",
      "/community-post": "community post",
      "/teleconsultation/appointment-feedback": "teleconsultation",
      "/teleconsultation/virtual-management": "teleconsultation",
      "/teleconsultation/view-doctor-detail": "teleconsultation",
      "/medication-tracker": "medicationtracker",
      "/medication-tracker/add-patient-detail": "medicationtracker",
      "/medication-tracker/patient-detail": "medicationtracker",
      "/sidebar/notification": "",
      "/logout": "logout",
      "/department-details":"department",
    };

    const currentPath = location.pathname;
    const activeMenu = pathToMenuMap[currentPath];

    setExpandedMenu(activeMenu);
  }, [location.pathname]);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const menuConfig = [
  
    {
      id: "userDashboards",
      label: (
        <span
        onClick={() => navigate("/user-dashboards/user-aquisition")}
          style={{ cursor: "pointer" }}
        >
          User Dashboards
        </span>
      ),
      to: "/user-dashboards/user-aquisition",
      icon: <MdOutlineDashboard className="sidebar-icon" />,
      subMenu: [
        { label: "User Acquisition & Retention", to: "/user-dashboards/user-aquisition" },
        { label: "User Engagement", to: "/user-dashboards/user-engagement" },
      ],
    },
    {
      id: "admin",
      label: (
        <span
        onClick={() => navigate("/admin/user-management")}
          style={{ cursor: "pointer" }}
        >
          Admin
        </span>
      ),
      to: "/admin/user-management",
      icon: <GoShieldCheck className="sidebar-icon" />,
      subMenu: [{ label: "User Management", to: "/admin/user-management" }],
    },
    {
      id: "marketing",
      label: (
        <span
        onClick={() => navigate("/marketing/in-app-campaign")}
          style={{ cursor: "pointer" }}
        >
          Marketing
        </span>
      ),
      to: "/marketing/in-app-campaign",
      icon: <TbCirclePercentage className="sidebar-icon" />,
      subMenu: [
        // { label: "Campaign Performance", to: "/marketing/campaign-performance" },
        { label: "InApp Campaign", to: "/marketing/in-app-campaign" },
        // { label: "Patient Acquisition", to: "/marketing/patient-acquisition" },
      ],
    },
    // {
    //   id: "hello doctor",
    //   label: "Hello Doctor",
    //   icon: <IoVideocamOutline className="sidebar-icon" />,
    //   subMenu: [{ label: "Hello Doctor", to: "/hello-doctor" }],
    // },
    {
      label: "Department Details",
      icon: <LucideHouse className="sidebar-icon" size={14} />,
      to: "/department-details",
    },
    {
      id: "education",
      label: (
        <span
        onClick={() => navigate("/patient-education/overview")}
          style={{ cursor: "pointer" }}
        >
          Patient Education
        </span>
      ),
      to: "/patient-education/overview",
      icon: <SlGraduation className="sidebar-icon" />,
      subMenu: [
        { label: "Education Overview", to: "/patient-education/overview" },
        { label: "Education Resources", to: "/patient-education/resources" },
      ],
    },
    {
      id: "teleconsultation",
      label: (
        <span
        onClick={() => navigate("/teleconsultation/virtual-management")}
          style={{ cursor: "pointer" }}
        >
          Teleconsultation
        </span>
      ),
      to: "/teleconsultation/appointment-status",
      icon: <IoTelescopeOutline className="sidebar-icon" />,
      subMenu: [
        {
          label: "Doctors List",
          to: "/teleconsultation/virtual-management",
        },
        // {
        //   label: "Appointment Status",
        //   to: "/teleconsultation/appointment-status",
        // },
        // {
        //   label: "Doctors List",
        //   to: "/teleconsultation/doctors-list",
        // },
        { label: "Technical Support", to: "/teleconsultation/technical-support" },
      ],
    },
    {
      id: "feedback",
      label: (
        <span
        onClick={() => navigate("/feedback/create-survey")}
          style={{ cursor: "pointer" }}
        >
          Feedback
        </span>
      ),
      to: "/feedback/create-survey",
      icon: <MessageCircleCode className="sidebar-icon" size={14} />,
      subMenu: [
        { label: "Create Survey", to: "/feedback/create-survey" },
        { label: "Patient Survey", to: "/feedback/patient-surveys" },
      ],
    },
    // {
    //   id: "operational",
    //   label: (
    //     <span
    //     onClick={() => navigate("/operational/appointment-reports")}
    //       style={{ cursor: "pointer" }}
    //     >
    //       Operational
    //     </span>
    //   ),
    //   to: "/operational/appointment-reports",
    //   icon: <Handshake className="sidebar-icon" size={14} />,
    //   subMenu: [
    //     { label: "Appointment Reports", to: "/operational/appointment-reports" },
    //     { label: "Service Utilization", to: "/operational/service-utilization" },
    //     {
    //       label: "Financial Performance",
    //       to: "/operational/financial-performance",
    //     },
    //   ],
    // },
    {
      id: "news",
      label: "News",
      icon: <IoNewspaperOutline className="sidebar-icon" size={14} />,
      to: "/news",
    },
    {
      id: "community post",
      label: "Community Post",
      icon: <HiOutlineUserGroup className="sidebar-icon" size={14} />,
      to: "/community-post",
    },
  //  {
  //     id: "healthPackage",
  //     label: "Health Package",
  //     icon: <FiActivity className="sidebar-icon" size={14} />,
  //     to: "/health-package",
  //   },
    {
      id: "technical",
      label: (
        <span
        onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          Technical
        </span>
      ),
      to: "/",
      icon: <MemoryStick className="sidebar-icon" size={14} />,
      subMenu: [
        { label: "Raise TIcket", to: "/" },
        // { label: "User Engagement", to: "/" },
        // { label: "User Feedback", to: "/" },
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
 
    // {
    //   id: "department",
    //   label: (
    //     <span
    //     onClick={() => navigate("/department-details")}
    //       style={{ cursor: "pointer" }}
    //     >
    //       Department Details
    //     </span>
    //   ),
    //   to: "",
    //   icon: <LucideHouse className="sidebar-icon" size={14} />,
    //   subMenu: [
    //     { label: "Details", to: "/department-details" },
    //     { label: "Technology", to: "/department-technology" },
    //     { label: "Facility", to: "/department-facility" },
    //     { label: "Services", to: "/department-services" },
    //     { label: "Condition We Treat", to: "/department-conditions" },

    //   ],
    // },
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
