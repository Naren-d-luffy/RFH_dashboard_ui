import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../layout.css";
import logo from "../../Assets/Images/logo.png";
import {
  FiGrid,
  FiUsers,
  FiSettings,
  FiHelpCircle,
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronRight,
  FiLogOut,
} from "react-icons/fi";
import {
  FaBookOpenReader,
  FaCircleUser,
  FaDatabase,
  FaHandHolding,
  FaIdCardClip,
  FaRegPenToSquare,
  FaTeamspeak,
} from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
// import Swal from "sweetalert2";
import logoutImg from "../../Assets/Images/logo.png";
import { IoMdClose } from "react-icons/io";
import { IoMenu } from "react-icons/io5";

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
      <div
  className={`sidebar ${isSidebarOpen ? "open" : ""} `}
>
  <aside
    className={`sidebar-content ${isSidebarOpen ? "open" : ""} `}
  >
    {isSidebarOpen && (
      <div className="overlay overlay-open" onClick={closeSidebar}></div>
    )}

    <div className="sidebar-header d-flex justify-content-between align-items-center">
        <img
          style={{ cursor: "pointer" }}
          src={logo}
          alt="BILKINS"
          className="sidebar-logo"
        />
      
      <div className=" d-lg-none" onClick={closeSidebar}>
        <IoMdClose size={26} />
      </div>
    </div>
          <nav className="sidebar-nav">
            <ul>
              <li>
                <Link
                  to="/admin/dashboard"
                  className={`nav-link ${
                    location.pathname === "/admin/dashboard"
                      ? "active-nav-links"
                      : ""
                  }`}
                >
                  <FiGrid className="sidebar-icon" />
                  Dashboard
                </Link>
              </li>
              <li>
                <div
                  className={`nav-link ${
                    expandedMenu === "recruiters" ? "active-nav-links" : ""
                  }`}
                  onClick={() => toggleMenu("recruiters")}
                >
                  <span className="d-flex align-items-center justify-content-between">
                    <span className="d-flex align-items-center">
                      <FiUsers className="sidebar-icon" />
                      <span> Recruiters</span>
                    </span>
                    {expandedMenu === "recruiters" ? (
                      <FiChevronDown className="dropdown-icon" />
                    ) : (
                      <FiChevronRight className="dropdown-icon" />
                    )}
                  </span>
                </div>
                <ul
                  className={`sub-menu ${
                    expandedMenu === "recruiters" ? "active" : ""
                  }`}
                >
                  <li className="sub-nav-list">
                    <Link to="/admin/add-recruiter" className="sub-nav-link">
                      Add Recruiter
                    </Link>
                  </li>
                  <li className="sub-nav-list">
                    <Link to="/admin/all-recruiters" className="sub-nav-link">
                      All Recruiter
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <div
                  className={`nav-link ${
                    expandedMenu === "jobs" ? "active-nav-links" : ""
                  }`}
                  onClick={() => toggleMenu("jobs")}
                >
                  <span className="d-flex align-items-center justify-content-between">
                    <span className="d-flex align-items-center">
                      <FaBookOpenReader className="sidebar-icon" />
                      <span> Jobs</span>
                    </span>
                    {expandedMenu === "jobs" ? (
                      <FiChevronDown className="dropdown-icon" />
                    ) : (
                      <FiChevronRight className="dropdown-icon" />
                    )}
                  </span>
                </div>
                <ul
                  className={`sub-menu ${
                    expandedMenu === "jobs" ? "active" : ""
                  }`}
                >
                  <li className="sub-nav-list">
                    <Link to="/admin/create-job" className="sub-nav-link">
                      Add New Job
                    </Link>
                  </li>
                  <li className="sub-nav-list">
                    <Link to="/admin/ongoing-jobs" className="sub-nav-link">
                      Ongoing Jobs
                    </Link>
                  </li>
                  <li className="sub-nav-list">
                    <Link to="/admin/paused-jobs" className="sub-nav-link">
                      Paused Jobs
                    </Link>
                  </li>
                  <li className="sub-nav-list">
                    <Link to="/admin/closed-jobs" className="sub-nav-link">
                      Closed Jobs
                    </Link>
                  </li>
                  <li className="sub-nav-list">
                    <Link to="/admin/my-jobs" className="sub-nav-link">
                      My Jobs
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link
                  to="/admin/applicants"
                  className={`nav-link ${
                    location.pathname === "/admin/applicants"
                      ? "active-nav-links"
                      : ""
                  }`}
                >
                  <FaCircleUser className="sidebar-icon" />{" "}
                  Applicants
                </Link>
              </li>

              <li>
                <div
                  className={`nav-link ${
                    expandedMenu === "clients" ? "active-nav-links" : ""
                  }`}
                  onClick={() => toggleMenu("clients")}
                >
                  <span className="d-flex align-items-center justify-content-between">
                    <span className="d-flex align-items-center">
                      <FaIdCardClip className="sidebar-icon" />
                      <span>Clients</span>
                    </span>
                    {expandedMenu === "clients" ? (
                      <FiChevronDown className="dropdown-icon" />
                    ) : (
                      <FiChevronRight className="dropdown-icon" />
                    )}
                  </span>
                </div>
                <ul
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
                </ul>
              </li>

              <li>
                <div
                  className={`nav-link ${
                    expandedMenu === "database" ? "active-nav-links" : ""
                  }`}
                  onClick={() => toggleMenu("database")}
                >
                  <span className="d-flex align-items-center justify-content-between">
                    <span className="d-flex align-items-center">
                      <FaDatabase className="sidebar-icon" />
                      <span> Database</span>
                    </span>
                    {expandedMenu === "database" ? (
                      <FiChevronDown className="dropdown-icon" />
                    ) : (
                      <FiChevronRight className="dropdown-icon" />
                    )}
                  </span>
                </div>
                <ul
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
                </ul>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}

export default SidebarAdmin;
