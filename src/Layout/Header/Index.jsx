import { useState, useEffect } from "react";
import "../layout.css";
import { FaRegBell, FaRegMessage } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DefaultUser from "../../Assets/Images/DefaultUser.png"

const HeaderAdmin = () => {
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);


  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      setIsDarkMode(true);
    }
  }, []);

  const handleNotificationClick = () => {
    navigate('/admin/notifications');
  };
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "false");
    }
  }, [isDarkMode]);


  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleToggleChange = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div style={{ position: "sticky", top: "0", zIndex: "999" }}>
      <nav className="navbar-header">
        {/*<div className="search-container">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>*/}
        <div className="d-flex w-100 justify-content-end">
          <div className="d-flex align-items-center gap-2">
            <div className="toggle-container">
              <input
                type="checkbox"
                id="toggle"
                className="toggle-input"
                checked={isDarkMode}
                onChange={handleToggleChange}
              />
              <label htmlFor="toggle" className="toggle-label">
                <span className="toggle-button">
                  {isDarkMode ? <FaMoon className="toggle-icons" /> : <FaSun className="toggle-icons" />}
                </span>
              </label>
            </div>
            <button
              type="button"
              aria-controls="navbar-notification"
              aria-expanded="false"
              className="notification-button"
              onClick={handleNotificationClick}
            >
              <FaRegBell className="notification-icon" />
              <span className="notification-badge">4</span>
            </button>

            {/* <button
              type="button"
              aria-controls="navbar-notification"
              aria-expanded="false"
              className="notification-button"
            >
              <FaRegMessage className="notification-icon" />
              <span className="notification-badge">3</span>
            </button> */}

            <div className="d-flex align-items-center gap-2">
              <button
                className="user-image"
                type="button"
                aria-controls="user-menu"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
              >
                <img
                  className="profile--icon"
                  src={DefaultUser}
                />
              </button>
              <div className="user-info">
                <span
                  style={{
                    color: "#ce1b28",
                    fontSize: "16px",
                    fontWeight: "600",
                    letterSpacing: "0.5px",
                  }}
                >
                  
                </span>
                <br />
                <span className="xl-2">{'Admin'}</span>
              </div>

              {isDropdownOpen && (
                <div
                  className="dropdown-menu"
                  role="menu"
                  aria-labelledby="user-menu"
                >
                  <div className="dropdown-menu-items" style={{ cursor: "pointer" }}>
                    <Link to="/admin/settings" className="dropdown-item" role="menuitem" tabIndex="0">
                      Edit Profile
                    </Link>
                    <div className="dropdown-item" role="menuitem" tabIndex="0">
                      Log out
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HeaderAdmin;
