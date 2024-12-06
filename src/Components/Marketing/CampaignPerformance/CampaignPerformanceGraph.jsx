import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaChevronDown } from "react-icons/fa";

const CampaignPerformanceGraph = () => {
  const data = [
    { name: "Jan", Subscribe: 60, Unsubscribe: 20 },
    { name: "Feb", Subscribe: 50, Unsubscribe: 20 },
    { name: "Mar", Subscribe: 60, Unsubscribe: 20 },
    { name: "Apr", Subscribe: 50, Unsubscribe: 30 },
    { name: "May", Subscribe: 50, Unsubscribe: 20 },
    { name: "Jun", Subscribe: 55, Unsubscribe: 30 },
    { name: "Jul", Subscribe: 70, Unsubscribe: 30 },
    { name: "Aug", Subscribe: 77, Unsubscribe: 23 },
    { name: "Sep", Subscribe: 60, Unsubscribe: 30 },
    { name: "Oct", Subscribe: 70, Unsubscribe: 20 },
    { name: "Nov", Subscribe: 40, Unsubscribe: 20 },
    { name: "Dec", Subscribe: 50, Unsubscribe: 30 },
  ];

  return (
    <div className="container mt-3">
      <div className="campaign-performance-graph-card">
        <div className="d-flex flex-lg-row flex-xl-row flex-column justify-content-between align-items-center mb-3">
          <h3>Campaign Statistics</h3>
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <span className="campaign-performance-graph-status-circle subscribe"></span>
              <span className="campaign-performance-graph-status-text">
                Subscribe
              </span>
              <span className="campaign-performance-graph-status-circle unsubscribe"></span>
              <span className="campaign-performance-graph-status-text">
                Unsubscribe
              </span>
            </div>
            <button className="campaign-performance-graph-dropdown-btn">
              This Month <FaChevronDown />
            </button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            barCategoryGap={10}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fontWeight: 500}}
            />
            <YAxis
              domain={[20, 100]}
              allowDataOverflow={true}
              tick={{ fontSize: 12, fontWeight: 500 }}
            />

            <Tooltip />

            <Bar
              dataKey="Subscribe"
              stackId="a"
              fill="#27AE60"
              radius={[8, 8, 8, 8]}
            />
            <Bar
              dataKey="Unsubscribe"
              stackId="a"
              fill="#F2EFFF"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CampaignPerformanceGraph;
