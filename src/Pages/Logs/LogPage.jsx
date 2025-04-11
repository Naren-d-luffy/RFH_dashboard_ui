import React, { useEffect, useState } from "react";
import "./LogCss.css";
import { Instance } from "../../AxiosConfig";
import { Pagination } from "antd";

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

  const fetchLogs = async (currentPage = 1, pageSize = 50) => {
    try {
      setIsLoading(true);
      const response = await Instance.get(`/logs?page=${currentPage}&limit=${pageSize}`);
      const data = response.data;

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
    fetchLogs(page, limit);
  }, [page, limit]);

  const handlePaginationChange = (pageNumber, pageSize) => {
    setPage(pageNumber);
    setLimit(pageSize);
  };

  return (
    <div className="view-logs-container">
      <h1>Server Logs</h1>
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
          pageSizeOptions={['10', '20', '50', '100']}
        />
      </div>
    </div>
  );
};
