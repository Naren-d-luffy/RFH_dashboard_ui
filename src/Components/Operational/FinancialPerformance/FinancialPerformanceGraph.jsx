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

const paymentData = [
  { day: "Mon", Completed: 2, Pending: 1.5, Failed: 1 },
  { day: "Tue", Completed: 4, Pending: 2.5, Failed: 1.5 },
  { day: "Wed", Completed: 2.5, Pending: 2, Failed: 1 },
  { day: "Thu", Completed: 3, Pending: 2.2, Failed: 1.3 },
  { day: "Fri", Completed: 3.5, Pending: 2.5, Failed: 1.5 },
  { day: "Sat", Completed: 4, Pending: 3, Failed: 2 },
  { day: "Sun", Completed: 3.8, Pending: 2.8, Failed: 1.5 },
];

const trafficData = [
  { name: "UPI", value: 4000, color: "#288cd5" },
  { name: "Debit Card", value: 2000, color: "#93d528" },
  { name: "Credit Card", value: 1000, color: "#23b4a2" },
];

const formatYAxis = (value) => `${value}M`;

export const FinancialPerformanceGraph = () => {
  return (
    <div className="row mt-4 ">
      {/* First Graph */}
      <div className="col-xl-7">
        <div className="appointment-bboking-graph">
          <div className="d-flex justify-content-between align-items-center mb-3 view-doctor-detail-graph-header">
            <div>
              <h3>Payment Overview</h3>
            </div>
            <div className="d-flex gap-2">
              <button className="view-doctor-detail-btn">Daily</button>
              <button className="view-doctor-detail-btn active">Weekly</button>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={paymentData}
              barSize={12} 
              barGap={17} 
              barCategoryGap={20}
              margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} interval={0} />
              <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 12 }} />
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

              {/* Bars with rounded ends and specified colors */}
              <Bar
                dataKey="Completed"
                fill="var(--black-color)"
                radius={[8, 8, 8, 8]} 
              />
              <Bar
                dataKey="Pending"
                fill="var(--dark-green)"
                radius={[8, 8, 8, 8]} 
              />
              <Bar
                dataKey="Failed"
                fill="var(--primary-green)"
                radius={[8, 8, 8, 8]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Graph */}
      <div className="col-xl-5 mb-4">
        <div className="d-flex flex-column gap-4 top-used-screens">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="d-flex gap-2 align-items-center">
              <div className="traffic-graph-image">
                <PiGenderFemaleBold style={{ color: "var(--primary-green)" }} />
              </div>
              <h6>Payment Method </h6>
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
                  innerRadius={65}
                  outerRadius={90}
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
                        <div className="d-flex flex-column ms-3">
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
              <p className="mb-0">Total Revenue</p>
              <h1 className="mb-0">₹8.00.000</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
