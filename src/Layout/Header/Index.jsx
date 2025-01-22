import { useState } from "react";
import "../layout.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DefaultUser from "../../Assets/Images/DefaultUser.png";
import { GoBell } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { useDarkMode } from "../../DarkMode";
import { showLogoutMessage } from "../../globalConstant";
import { allAdminRoutes } from "./allAdminRoutes";
import { Switch, message, List } from "antd";

const HeaderAdmin = () => {
  const navigate = useNavigate();
  const username = JSON.parse(localStorage.getItem("userInfo"));
  const infoUsers = {
    userName: username?.name || "Guest",
    role: "Admin",
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState([]);

  const handleNotificationClick = () => {
    navigate("/header/notification");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const handleLogout = () => {
    showLogoutMessage({
      title: "Confirm Logout",
      content: "Are you sure you want to log out?",
      onDelete: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        navigate("/");
      },
    });
  };
  const handleSearch = (value) => {
    const searchQuery = value.toLowerCase().trim().replace(/\s+/g, "");
    setSearchQuery(searchQuery);

    if (!searchQuery || searchQuery === "") {
      setFilteredRoutes([]);
      return;
    }
    const suggestions = allAdminRoutes.filter((route) =>
      route.keyWords.some((keyword) =>
        keyword.toLowerCase().replace(/\s+/g, "").includes(searchQuery)
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
            placeholder="Search anything here.."
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
          <div className="d-flex align-items-center gap-2">
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
                  {infoUsers.userName}
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
                    <div
                      className="dropdown-item"
                      role="menuitem"
                      tabIndex="0"
                      onClick={handleLogout}
                    >
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
