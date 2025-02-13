import { useState, useEffect, useRef } from "react";
import "../layout.css";
import { Link, useNavigate } from "react-router-dom";
import DefaultUser from "../../Assets/Images/singleuser.png";
import { GoBell } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { useDarkMode } from "../../DarkMode";
import { showLogoutMessage } from "../../globalConstant";
import { allAdminRoutes } from "./allAdminRoutes";
import { Switch, message, List } from "antd";
import { useSelector } from "react-redux";

const HeaderAdmin = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState([]);

  const profileData = useSelector(
    (state) => state.settingsprofile.settingsprofile
  );
  const storedUserInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const userName = storedUserInfo?.name || profileData?.name || "Guest";
  const profileImage =
    storedUserInfo?.profile || profileData?.profile || DefaultUser;

  const handleNotificationClick = () => {
    navigate("/header/notification");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    showLogoutMessage({
      title: "Confirm Logout",
      content: "Are you sure you want to log out?",
      onDelete: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessTokenExpiration");
        localStorage.removeItem("refreshTokenExpiration");
        localStorage.removeItem("userInfo");
        navigate("/");
      },
    });
  };

  const handleSearch = (value) => {
    const query = value.toLowerCase().trim().replace(/\s+/g, "");
    setSearchQuery(query);

    if (!query) {
      setFilteredRoutes([]);
      return;
    }
    const suggestions = allAdminRoutes.filter((route) =>
      route.keyWords.some((keyword) =>
        keyword.toLowerCase().replace(/\s+/g, "").includes(query)
      )
    );

    setFilteredRoutes(suggestions);

    if (suggestions.length === 0) {
      message.error("No matching page found");
    }
  };

  const handleSelect = (route) => {
    navigate(route);
    setSearchQuery("");
    setFilteredRoutes([]);
  };

  return (
    <div style={{ position: "sticky", top: "0", zIndex: "999" }}>
      <nav className="navbar-header">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search here.."
            className="search-input-header"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {filteredRoutes.length > 0 && (
            <List
              style={{
                marginTop: "10px",
                width: "400px",
                maxHeight: "200px",
                overflowY: "auto",
                backgroundColor: "white",
                borderRadius: "4px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                position: "absolute",
                zIndex: 1,
              }}
              bordered
              dataSource={filteredRoutes}
              renderItem={(item) => (
                <List.Item
                  onClick={() => handleSelect(item.route)}
                  style={{ cursor: "pointer" }}
                >
                  {item.title}
                </List.Item>
              )}
            />
          )}
        </div>
        <div className="d-flex w-100 justify-content-end align-items-center gap-2">
          <div className="toggle-container">
            <Switch
              checked={isDarkMode}
              onClick={toggleDarkMode}
              className={`custom-switch ${
                isDarkMode ? "ant-switch-dark" : "ant-switch-light"
              }`}
            />
          </div>
          <div>
            <button
              type="button"
              aria-controls="navbar-notification"
              aria-expanded="false"
              className="notification-button"
              onClick={handleNotificationClick}
            >
              <GoBell
                className="notification-icon"
                color="var(--black-color)"
              />
              <span className="notification-badge">0</span>
            </button>
          </div>
          <div
            className="d-flex align-items-center gap-2"
            ref={dropdownRef}
            aria-expanded={isDropdownOpen}
            onClick={toggleDropdown}
            style={{ cursor: "pointer" }}
          >
            <button
              className="user-image"
              type="button"
              aria-controls="user-menu"
            >
              <img className="profile--icon" src={profileImage} alt="Profile" />
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
                {userName}
              </span>
            </div>

            {isDropdownOpen && (
              <div
                className="dropdown-menu"
                role="menu"
                aria-labelledby="user-menu"
              >
                <div className="dropdown-menu-items">
                  <Link
                    to="/dashboard/settings"
                    className="dropdown-item"
                    role="menuitem"
                  >
                    Edit Profile
                  </Link>
                  <div
                    className="dropdown-item"
                    role="menuitem"
                    onClick={handleLogout}
                  >
                    Log out
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HeaderAdmin;
