import { useState, useEffect } from "react";
import "../layout.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DefaultUser from "../../Assets/Images/DefaultUser.png";
import { GoBell } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { Switch } from "antd";
import { useDarkMode } from "../../DarkMode";
const HeaderAdmin = () => {
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();


  const handleNotificationClick = () => {
    navigate("/header/notification");
  };


  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div style={{ position: "sticky", top: "0", zIndex: "999" }}>
      <nav className="navbar-header">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search anything here.."
            className="search-input-header"
          />
        </div>
       
        <div className="d-flex w-100 justify-content-end align-items-center gap-2">
        <div className="toggle-container">
          <Switch
            checked={isDarkMode}
            onClick={toggleDarkMode}
            className={`custom-switch ${isDarkMode ? "ant-switch-dark" : "ant-switch-light"}`}
            />
         
        </div>
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              aria-controls="navbar-notification"
              aria-expanded="false"
              className="notification-button"
              onClick={handleNotificationClick}
            >
              <GoBell className="notification-icon" color="var(--black-color)"/>
              <span className="notification-badge">4</span>
            </button>

            <div
              className="d-flex align-items-center gap-2"
              style={{ borderLeft: "1px solid var(--border-color)" }}
            >
              <button
                className="user-image"
                type="button"
                aria-controls="user-menu"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
              >
                <img className="profile--icon" src={DefaultUser} alt="" />
              </button>
              <div className="user-info">
                <span
                  style={{
                    color: "var(--black-color)",
                    fontSize: "15px",
                    fontWeight: "600",
                    letterSpacing: "0.5px",
                  }}
                >
                  Alexandro
                </span>
              </div>

              {isDropdownOpen && (
                <div
                  className="dropdown-menu"
                  role="menu"
                  aria-labelledby="user-menu"
                >
                  <div
                    className="dropdown-menu-items"
                    style={{ cursor: "pointer" }}
                  >
                    <Link
                      to="/"
                      className="dropdown-item"
                      role="menuitem"
                      tabIndex="0"
                    >
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
