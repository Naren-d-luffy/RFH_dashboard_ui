import React, { useEffect, useState } from "react";
import "./LogCss.css";
import { Instance } from "../../AxiosConfig";
import { Pagination } from "antd";
import { AiFillPieChart } from "react-icons/ai";
import clickicon from "../../Assets/Icons/click-icon.png";
import handIcon from "../../Assets/Icons/handIcon.png";
import { FaArrowUp, FaMobileAlt } from "react-icons/fa";
import Notification from "../../Assets/Icons/Notification.png";
import { MdDashboard } from "react-icons/md";
import { TbLogs } from "react-icons/tb";

// Utility to strip ANSI escape codes
const stripAnsi = (str) => {
  return str.replace(/\x1B\[[0-9;]*m/g, "");
};

export const LogPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [totalLogs, setTotalLogs] = useState(0);
  const [selectedLogType, setSelectedLogType] = useState("combined");
  const [headerText, setHeaderText] = useState("All Logs");

  const fetchLogs = async (currentPage = 1, pageSize = 50, type = "combined") => {
    try {
      setIsLoading(true);
      const response = await Instance.get(`/logs?page=${currentPage}&limit=${pageSize}&type=${type}`);
      const data = response.data;
console.log(response)
      if (!Array.isArray(data.data)) {
        throw new Error("Invalid logs format received from API.");
      }

      const cleanedLogs = data.data.map((log) => stripAnsi(log));
      setLogs(cleanedLogs);
      setTotalLogs(data.totalLines || 0); // Assuming your API provides this
      setError(null);
    } catch (error) {
      console.error("Error fetching logs:", error);
      setError(error.message || "Failed to load logs.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(page, limit, selectedLogType);
  }, [page, limit, selectedLogType]);

  const handlePaginationChange = (pageNumber, pageSize) => {
    setPage(pageNumber);
    setLimit(pageSize);
  };

  const handleCardClick = (type, title) => {
    setSelectedLogType(type);
    setHeaderText(title);
    setPage(1); // Reset to first page when changing log type
  };
  
  const cardsData = [
    {
      title: "All Logs",
      type: "combined",
      description: "Click here to see Application & Dashboard logs",
      icon: <TbLogs size={24} />,
      borderColor: "var(--primary-green)",
      iconColor: "var(--primary-green)",
      iconBackground: "#dffaf0",
    },
    {
      title: "Application Logs",
      type: "application",
      description: "Click here to see all Application Logs",
      icon: <FaMobileAlt size={24} />,
      borderColor: "var(--sky-blue-color)",
      iconColor: "var(--sky-blue-color)",
      iconBackground: "#e8f6ff",
    },
    {
      title: "Dashboard Logs",
      type: "dashboard",
      description: "Click here to see all Dashboard Logs",
      icon: <MdDashboard size={24} />,
      borderColor: "var(--light-orange-color)",
      iconColor: "#FFD66B",
      iconBackground: "#FFF4DB",
    },
  ];

  return (
    <>
      <div className="campaign-performance-head">
        <div>
          <h3>Server Logs</h3>
        </div>
      </div>
      <div className="row campaign-performance-container">
        {cardsData?.map((card, index) => (
          <div className="col-lg-4 col-md-6 col-sm-12 mt-2" key={index}>
            <div
              className={`logs-performance-card position-relative ${selectedLogType === card.type ? "logs-active-card" : ""}`}
              style={{ borderRightColor: card.borderColor, cursor: "pointer" }}
              onClick={() => handleCardClick(card.type, card.title)}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h4>{card.title}</h4>
                <span
                  className="logs-performance-icon"
                  style={{
                    color: card.iconColor,
                    backgroundColor: card.iconBackground,
                  }}
                >
                  {card.icon}
                </span>
              </div>
              <div className="campaign-performance-stats">
                <p>{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="view-logs-container mt-5">
        <h1>{headerText}</h1>
        {isLoading && <p className="loading">Loading logs...</p>}
        {error && <p className="error-message">Error: {error}</p>}

        <div className="logs-wrapper">
          {logs
            .slice()
            .reverse()
            .map((log, index) => (
              <div
                key={index}
                className={`log-entry ${log.toLowerCase().includes("error") ? "error-log" : "info-log"}`}
              >
                {log}
              </div>
            ))}
        </div>

        {/* Ant Design Pagination */}
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Pagination
            current={page}
            pageSize={limit}
            total={totalLogs}
            showSizeChanger
            onChange={handlePaginationChange}
            pageSizeOptions={["10", "20", "50", "100"]}
          />
        </div>
      </div>
    </>
  );
};