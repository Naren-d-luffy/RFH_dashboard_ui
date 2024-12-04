import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { MdKeyboardArrowDown } from "react-icons/md";

const appointmentStatusData = [
  { month: "JAN", completed: 6, cancelled: 8 },
  { month: "FEB", completed: 9, cancelled: 4 },
  { month: "MAR", completed: 10, cancelled: 5 },
  { month: "APR", completed: 6, cancelled: 2 },
  { month: "MAY", completed: 8, cancelled: 3 },
  { month: "JUN", completed: 7, cancelled: 2 },
  { month: "JUL", completed: 10, cancelled: 3 },
  { month: "AUG", completed: 9, cancelled: 4 },
  { month: "SEP", completed: 11, cancelled: 3 },
  { month: "OCT", completed: 12, cancelled: 4 },
  { month: "NOV", completed: 10, cancelled: 2 },
  { month: "DEC", completed: 11, cancelled: 3 },
];

const VirtualManagementGraph = () => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "var(--black-color)",
            padding: "8px",
            borderRadius: "4px",
            color: "var(--white-color)",
          }}
        >
          <p>{label}</p>
          {payload.map((data, index) => (
            <p key={index}>
              {data.name}: {data.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className=" mt-3">
      <div className="row">
        <div className="col-lg-8 ">
          <div className="virtual-management-graph">
          <div className="d-flex justify-content-between virtual-management-graph-head">
            <h3>Appointment Status</h3>
            <button>
              Year{" "}
              <MdKeyboardArrowDown size={20} color="var(--button-text-color)" />
            </button>
          </div>
          <div className="d-flex gap-3 mt-2">
            <div className="d-flex align-items-center gap-2 virtual-management-graph-btn-text">
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "20%",
                  backgroundColor: "var(--primary-green)",
                }}
              ></span>
              Completed
            </div>
            <div className="d-flex align-items-center gap-2 virtual-management-graph-btn-text">
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "20%",
                  backgroundColor: "var(--black-color)",
                }}
              ></span>
              Canceled
            </div>
          </div>
          <div className="mt-3">
            <ResponsiveContainer height={250}>
              <LineChart
                data={appointmentStatusData}
                margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, angle: 0 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  domain={[0, 12]}
                  ticks={[0, 2, 4, 6, 8, 10, 12]}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="var(--primary-green)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="cancelled"
                  stroke="var(--black-color)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          </div>
        </div>
        <div className="col-lg-4 ">
          <div className="virtual-management-chart">
          <div className="d-flex justify-content-between virtual-management-graph-head">
            <h3>Doctor Insight</h3>
            <button>
              Year{" "}
              <MdKeyboardArrowDown size={20} color="var(--button-text-color)" />
            </button>
          </div>

          <div className="d-flex flex-column align-items-center gap-3 position-relative mt-3">
            <svg
              height="235"
              viewBox="0 0 36 36"
              className="custom-donut-chart"
            >
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="transparent"
                stroke="var(--light-gray)"
                strokeWidth="5.5"
              ></circle>

              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="transparent"
                stroke="var(--primary-green)"
                strokeWidth="5.2"
                strokeDasharray="58 28"
                strokeDashoffset="10"
                strokeLinecap="round"
              ></circle>
              <text
                x="25"
                y="33"
                textAnchor="middle"
                fontSize="2"
                fill="var(--white-color)"
                fontWeight="600"
              >
                80%
              </text>

              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="transparent"
                stroke="var(--black-color)"
                strokeWidth="5.2"
                strokeDasharray="16 72"
                strokeDashoffset="-54"
                strokeLinecap="round"
              ></circle>
              <text
                x="10"
                y="6"
                textAnchor="middle"
                fontSize="2"
                fill="var(--white-color)"
                fontWeight="600"
              >
                20%
              </text>
            </svg>

            <div className="custom-donut-center-content">
              <div className="custom-donut-center-circle">
                <h4 className="mb-0">56%</h4>
                <p>December</p>
              </div>
            </div>
          </div>

          <div className="d-flex gap-5 align-items-center mt-3">
            <div className="d-flex align-items-center gap-1 custom-donut-legend-item">
              <span
                className="custom-donut-legend-color"
                style={{ backgroundColor: "var(--primary-green)" }}
              ></span>
              New Doctor
            </div>

            <div className="d-flex align-items-center gap-1 custom-donut-legend-item">
              <span
                className="custom-donut-legend-color"
                style={{ backgroundColor: "var(--black-color)" }}
              ></span>
              Old Doctor
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualManagementGraph;
