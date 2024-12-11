import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const patientOverviewData = [
  { year: "2020", online: 2.3, offline: 2 },
  { year: "2021", online: 3, offline: 2.5 },
  { year: "2022", online: 3.5, offline: 3 },
  { year: "2023", online: 1, offline: 0.5 },
  { year: "2024", online: 1.5, offline: 0.75 },
];

const EducationOverviewGraph = () => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="patient-acquisition-custom-tooltip"
          style={{
            backgroundColor: "var(--black-color)",
            padding: "8px 12px",
            borderRadius: "4px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              color: "var(--white-color)",
              fontWeight: 500,
            }}
          >
            {label}
          </p>
          {payload.map((data, index) => (
            <p
              key={index}
              style={{
                margin: 0,
                fontSize: "12px",
                color: "var(--white-color)",
              }}
            >
              {`${data.name}: ${data.value}M`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mt-3">
      <div className="patient-acquisition-graphs">
        <div className="patient-acquisition-graph-overview">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Patient Overview</h2>
            <div className="d-flex gap-4">
              <div className="d-flex align-items-center gap-2">
                <span
                  className="patient-acquisition-legend-color"
                  style={{ backgroundColor: "var(--primary-green)" }}
                ></span>
                <span style={{color:'var(--black-color)'}}>Online Consult</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span
                  className="patient-acquisition-legend-color"
                  style={{ backgroundColor: "var(--dark-green)" }}
                ></span>
                <span style={{color:'var(--black-color)'}}>Offline Consult</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={patientOverviewData}
              barCategoryGap={10}
              barSize={15}
            >
              <CartesianGrid
                strokeDasharray="1 1"
                vertical={false}
                horizontal={true}
              />
              <XAxis dataKey="year" tickLine={false} />
              <YAxis
                tickLine={false}
                ticks={[0, 1, 2, 3, 4]}
                tickFormatter={(value) => (value === 0 ? "0" : `${value}M`)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="online"
                name="Online Consult"
                fill="var(--primary-green)"
                radius={[5, 5, 5, 5]}
              />
              <Bar
                dataKey="offline"
                name="Offline Consult"
                fill="var(--dark-green)"
                radius={[5, 5, 5, 5]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="patient-acquisition-graph-gender">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Gender</h2>
          </div>
          <div className="d-flex flex-column align-items-center gap-3 position-relative">
            <svg width="300" height="200" viewBox="0 0 42 42" className="donut">
              <circle
                className="donut-ring"
                cx="21"
                cy="21"
                r="16"
                fill="transparent"
                stroke="#f0f0f0"
                strokeWidth="5"
              ></circle>

              <circle
                className="donut-segment male"
                cx="21"
                cy="21"
                r="16"
                fill="transparent"
                stroke="var(--primary-green)"
                strokeWidth="5"
                strokeDasharray="20 80"
                strokeDashoffset="20"
              ></circle>

              <circle
                className="donut-segment female"
                cx="21"
                cy="21"
                r="16"
                fill="transparent"
                stroke="var(--dark-green)"
                strokeWidth="5"
                strokeDasharray="40 60"
                strokeDashoffset="0"
              ></circle>
            </svg>

            <div className="patient-acquisition-fixed-center-value">
              <div className="patient-acquisition-background-circle">
                <h4 className="mb-0">82.3%</h4>
              </div>
            </div>
          </div>
          <div className="d-flex gap-4 mt-3">
            <div className="d-flex align-items-center gap-1">
              <span
                className="patient-acquisition-legend-color"
                style={{ backgroundColor: "var(--primary-green)" }}
              ></span>
              <span style={{color:'var(--black-color)'}}>Male Patients</span>
            </div>
            <div className="d-flex align-items-center gap-1">
              <span
                className="patient-acquisition-legend-color"
                style={{ backgroundColor: "var(--dark-green)" }}
              ></span>
              <span style={{color:'var(--black-color)'}}>Female Patients</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationOverviewGraph;
