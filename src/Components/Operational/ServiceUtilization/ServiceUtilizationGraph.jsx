import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { PiGenderFemaleBold } from "react-icons/pi";


const demographicData = [
    { day: "Mon", Male: 1.5, Female: 1, Seniors: 0.5 },
    { day: "Tue", Male: 2, Female: 1.5, Seniors: 0.8 },
    { day: "Wed", Male: 1.8, Female: 1.2, Seniors: 0.6 },
    { day: "Thu", Male: 2.2, Female: 1.3, Seniors: 0.7 },
    { day: "Fri", Male: 2.5, Female: 1.8, Seniors: 0.9 },
    { day: "Sat", Male: 3, Female: 2, Seniors: 1 },
    { day: "Sun", Male: 2.8, Female: 1.9, Seniors: 0.8 },
  ];
  

const trafficData = [
  { name: "9 AM - 12PM", value: 4000, color: "#288cd5" },
  { name: "12 PM- 4 PM", value: 2000, color: "#93d528" },
  { name: "4 PM - 10 PM", value: 1000, color: "#23b4a2" },
];

const formatYAxis = (value) => `${value}M`;

export const ServiceUtilizationGraph = () => {
  return (
    <div className="row mt-4 ">
      {/* First Graph */}
      <div className="col-lg-7">
      <div className="appointment-bboking-graph">
        <div className="d-flex justify-content-between align-items-center mb-3 view-doctor-detail-graph-header">
          <div>
            <h3>Demographic Insights</h3>
          </div>
          <div className="d-flex gap-2">
            <button className="view-doctor-detail-btn">Daily</button>
            <button className="view-doctor-detail-btn active">Weekly</button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={demographicData}
            barSize={26}
            margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 12 }}  interval={0}/>
            <YAxis
              tickFormatter={formatYAxis}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                background: "#f7f7f7",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
              formatter={(value) => `${value}M`}
            />
            <Legend
              verticalAlign="top"
              align="left"
              iconType="circle"
              wrapperStyle={{ top: -10, fontSize: "12px" }}
            />

            <defs>
              <linearGradient id="colorMale" x1="0" y1="0" x2="0" y2="1">
                <stop offset="15%" stopColor="#1E1E1E" stopOpacity={0.38} />
                <stop offset="40%" stopColor="#1E1E1E" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="colorFemale" x1="0" y1="0" x2="0" y2="1">
                <stop offset="15%" stopColor="#00963F" stopOpacity={0.38} />
                <stop offset="40%" stopColor="#00963F" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="colorSeniors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="100%" stopColor="#E6E5FB" stopOpacity={0.38} />
                <stop offset="100%" stopColor="#E6E5FB" stopOpacity={1} />
              </linearGradient>
            </defs>

            <Bar dataKey="Male" stackId="a" fill="url(#colorMale)" />
            <Bar dataKey="Female" stackId="a" fill="url(#colorFemale)" />
            <Bar dataKey="Seniors" stackId="a" fill="url(#colorSeniors)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

      {/* Second Graph */}
      <div className="col-lg-5 mb-4">
        <div className="d-flex flex-column gap-4 top-used-screens">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="d-flex gap-2 align-items-center">
              <div className="traffic-graph-image">
                <PiGenderFemaleBold style={{ color: "var(--primary-green)" }} />
              </div>
              <h6>Peak Engagement</h6>
            </div>
            <DatePicker
              defaultValue={dayjs("2024-12-09")}
              format="DD, MMM YYYY"
            />
          </div>
          <div className="top-used-screens-chart">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                  paddingAngle={2}
                  cornerRadius={10}
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    background: "var(--black-color)",
                    boxShadow: "0px 13.28px 13.28px 0px #00000040",
                    borderRadius: "8px",
                    color: "var(--white-color)",
                    border: "none",
                  }}
                  formatter={(value) => `${value.toLocaleString()}`}
                  labelFormatter={() => ""}
                />

                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  content={({ payload }) => (
                    <div>
                      {payload.map((entry, index) => (
                        <div className="d-flex flex-column">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontWeight: "bold",
                              fontSize: "14px",
                              color: entry.color,
                              marginBottom: "10px",
                            }}
                          >
                            <span
                              style={{
                                width: "10px",
                                height: "10px",
                                backgroundColor: entry.color,
                                borderRadius: "50%",
                                display: "inline-block",
                                marginRight: "5px",
                              }}
                            ></span>
                            {entry.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="last-updated-display">
              <p className="mb-0">Active Days</p>
              <h1 className="mb-0">Mon- Sat</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
