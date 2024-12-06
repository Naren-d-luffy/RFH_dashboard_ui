import React from "react";
import { Dropdown, Button, Space, Tag } from "antd";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import handicon from "../../../Assets/Icons/hand.png";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
export const UserEngagementChart = () => {
  const data = [
    { label: "Appointment Booking", value: 1100, color: "#B6B0FB" },
    { label: "Marketing Portal", value: 2300, color: "#BBEEED" },
    { label: "Education Portal", value: 1500, color: "#FBDE9D" },
    { label: "Department Detail", value: 1600, color: "#95A1FC" },
  ];
  const items = [
    {
      label: "Last Day",
      key: "1",
    },
    {
      label: "Last week",
      key: "2",
    },
    {
      label: "Last Month",
      key: "3",
    },
  ];
  const handleMenuClick = ({ key }) => {};
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  const trafficData = [
    { name: "Education Page", value: 4000, color: "#288cd5" },
    { name: "Home Page", value: 2000, color: "#93d528" },
    { name: "Booking Page", value: 2000, color: "#23b4a2" },
  ];
  const totalValue = data.reduce((acc, item) => acc + item.value, 0);
  return (
    <div className="row mt-4">
      <div className="col-lg-8 mb-4">
        <div className="most-user-engagement-card">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="mb-0">Most User Engagement</h5>
            <Dropdown menu={menuProps}>
              <Button>
                <Space>
                  Last Day
                  <MdOutlineKeyboardArrowDown />
                </Space>
              </Button>
            </Dropdown>
          </div>

          {/* Total Count */}
          <div className="d-flex gap-2 align-items-center ">
            <h1 className="">6.4K</h1>
            <Tag className="most-user-success-tag">+3.4%</Tag>
          </div>

          {/* Segmented Progress Bar */}
          <div className="row gx-0">
            {data.map((item, index) => (
              <div
                key={index}
                className="col"
                style={{
                  backgroundColor: item.color,
                  width: `${(item.value / totalValue) * 100}%`,
                  height: "10px",
                  marginRight: index < data.length - 1 ? "5px" : "0",
                }}
              ></div>
            ))}
          </div>

          {/* Individual Data Sections */}
          <div className="row mt-4">
            {data.map((item, index) => (
              <div key={index} className="col-lg-6 col-md-6 mb-2">
                <div className="individual-most-user-card">
                  <div className="d-flex gap-2 align-items-center mb-2">
                    <div
                      className="individual-most-user-bullet"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <h6>{item.label}</h6>
                  </div>

                  <div className="d-flex gap-2">
                    <h4>{`${(item.value / 1000).toFixed(1)}K`}</h4>
                    <div>
                      <Tag
                        className={`${
                          item.value > 0
                            ? "most-user-success-tag"
                            : "most-user-fail-tag"
                        }`}
                      >
                        {item.value > 0
                          ? `+${((item.value / totalValue) * 100).toFixed(1)}%`
                          : "-1.4%"}
                      </Tag>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-lg-4 mb-4">
        <div className="d-flex flex-column gap-4 top-used-screens">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="d-flex gap-2 align-items-center">
              <div className="traffic-graph-image">
                <img src={handicon} alt="hand Icon" />
              </div>
              <h6>Top Used Screens</h6>
            </div>
            <Dropdown menu={menuProps}>
              <Button type="text">
                <PiDotsThreeOutlineLight size={24} />
              </Button>
            </Dropdown>
          </div>
          <div className="top-used-screens-chart">
            <ResponsiveContainer width="100%" height={290}>
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
                  formatter={(value, name, props) => {
                    const color = props.payload?.color || "#000";
                    return (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: color,
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                          }}
                        ></div>

                        <p
                          style={{
                            fontSize: "14px",
                            marginBottom: "0px",
                            color: "var(--white-color)",
                          }}
                        >
                          {value.toLocaleString()}{" "}
                         
                        </p>
                      </span>
                    );
                  }}
                  labelFormatter={() => ""} 
                />

                <Legend
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                  wrapperStyle={{
                    marginTop: "25px",
                  }}
                  content={({ payload }) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      {payload.map((entry, index) => (
                        <div className="d-flex flex-column">
                          <span
                            style={{
                              color: "#9D9D9D",
                              fontSize: "12px",
                            }}
                          >
                            {entry.value}
                          </span>

                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontWeight: "bold",
                              fontSize: "14px",
                              color: entry.color,
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
                            {`${(
                              (entry.payload.value /
                                payload.reduce(
                                  (acc, item) => acc + item.payload.value,
                                  0
                                )) *
                              100
                            ).toFixed(0)}%`}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="total-users-display">
              <p className="mb-0 total-users">Total User</p>
              <h1 className="mb-0 total-users-count">10K</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
