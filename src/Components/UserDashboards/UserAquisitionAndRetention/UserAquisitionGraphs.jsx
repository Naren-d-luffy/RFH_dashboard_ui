import React from "react";
import { Dropdown, Menu, Button } from "antd";
import {
    XAxis,
    YAxis,
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    Tooltip,
} from "recharts";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { FiArrowUpRight } from "react-icons/fi";
const churnRateData = [
    { month: "Jan", value: 6000 },
    { month: "Feb", value: 8000 },
    { month: "Mar", value: 7000 },
    { month: "Apr", value: 6500 },
    { month: "May", value: 10000 },
    { month: "Jun", value: 7000 },
    { month: "Jul", value: 6134 },
    { month: "Aug", value: 7500 },
    { month: "Sep", value: 7200 },
    { month: "Oct", value: 7300 },
    { month: "Nov", value: 6000 },
    { month: "Dec", value: 5000 },
];
const churnRateValues = churnRateData.map((data) => data.value);

const UserAquisitionGraphs = () => {
    const actionMenu = (
        <Menu>
            <Menu.Item key="edit">Edit</Menu.Item>
            <Menu.Item key="delete">Delete</Menu.Item>
        </Menu>
    );
    const formatYAxis = (tick) => `${tick / 1000}k`;

    return (
        <div className="container">
            <div className="row mb-4 mt-4">
                <div className="col-lg-6">
                    <div className="application-dashboard-graph d-flex flex-column gap-4 align-items-center">
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <h2 className="card-title text-start mb-2">Churn Rate</h2>
                            <Dropdown overlay={actionMenu} trigger={["click"]}>
                                <Button type="text">
                                    <PiDotsThreeOutlineLight size={24} style={{ color: 'var(--secondary-text-color)' }} />
                                </Button>
                            </Dropdown>
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                            <AreaChart data={churnRateData}>
                                <CartesianGrid
                                    strokeDasharray="1 1"
                                    vertical={true}
                                    horizontal={false}
                                />
                                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                                <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 11 }} />
                                <Tooltip
                                    contentStyle={{
                                        background: " #30363D",
                                        boxShadow: "0px 13.28px 13.28px 0px #00000040",
                                        borderRadius: "8px",
                                        color: "#fff"

                                    }}

                                    formatter={(value) => (
                                        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                            <FiArrowUpRight className="application-dashboard-graph-arrow" />
                                            {value.toLocaleString()}
                                        </span>
                                    )}
                                    labelFormatter={() => ""}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#00A56A"
                                    fill="#00A56A"
                                    strokeWidth={2}
                                    dot={{ r: 5 }}
                                    activeDot={{ r: 8 }}
                                    fillOpacity={0.1}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="d-flex flex-column gap-4 align-items-center">
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <h2 className="card-title text-start mb-2">
                                User retention rates
                            </h2>
                            <Dropdown overlay={actionMenu} trigger={["click"]}>
                                <Button type="text">
                                    <PiDotsThreeOutlineLight size={24} />
                                </Button>
                            </Dropdown>
                        </div>
                        <div className="d-flex justify-content-center gap-5 align-items-center w-100">
                            <div className="position-relative">
                                <svg
                                    width="160"
                                    height="160"
                                    viewBox="0 0 42 42"
                                    className="donut"
                                >
                                    {/* Outer Ring */}
                                    <circle
                                        className="donut-ring"
                                        cx="21"
                                        cy="21"
                                        r="15.9155"
                                        fill="transparent"
                                        stroke="#f0f0f0"
                                        strokeWidth="4"
                                    ></circle>
                                    {/* Green Segment (Weekly) */}
                                    <circle
                                        className="donut-segment"
                                        cx="21"
                                        cy="21"
                                        r="15.9155"
                                        fill="transparent"
                                        stroke="#00A56A"
                                        strokeWidth="4"
                                        strokeDasharray="40 60"
                                        strokeDashoffset="0"
                                    ></circle>
                                    {/* Dark Blue Segment (Daily) */}
                                    <circle
                                        className="donut-segment"
                                        cx="21"
                                        cy="21"
                                        r="15.9155"
                                        fill="transparent"
                                        stroke="#212529"
                                        strokeWidth="4"
                                        strokeDasharray="45 55"
                                        strokeDashoffset="-40"
                                    ></circle>
                                    {/* Light Gray Segment (Monthly) */}
                                    <circle
                                        className="donut-segment"
                                        cx="21"
                                        cy="21"
                                        r="15.9155"
                                        fill="transparent"
                                        stroke="#ADB5BD"
                                        strokeWidth="4"
                                        strokeDasharray="15 85"
                                        strokeDashoffset="-85"
                                    ></circle>
                                    {/* Inner Text */}
                                    <text
                                        x="50%"
                                        y="50%"
                                        textAnchor="middle"
                                        fill="#212529"
                                        fontSize="4px"
                                        dy=".3em"
                                    >
                                        2,234
                                    </text>
                                    <text
                                        x="50%"
                                        y="60%"
                                        textAnchor="middle"
                                        fill="#adb5bd"
                                        fontSize="3px"
                                        dy=".3em"
                                    >
                                        Total
                                    </text>
                                </svg>
                            </div>
                            <div className="d-flex flex-column align-items-start mt-4">
                                <div className="d-flex align-items-center flex-column">
                                    <span className="lengend-title">Daily retention</span>
                                    <div className="d-flex align-items-center">
                                        <span
                                            className="legend-dot"
                                            style={{
                                                backgroundColor: "#212529",
                                            }}
                                        ></span>
                                        <span className="ms-auto fw-bold">45%</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center flex-column">
                                    <span className="lengend-title">Weekly retention</span>
                                    <div className="d-flex align-items-center">
                                        <span
                                            className="legend-dot"
                                            style={{
                                                backgroundColor: "#00A56A",
                                            }}
                                        ></span>
                                        <span className="ms-auto fw-bold">40%</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center flex-column">
                                    <span className="lengend-title">Monthly retention</span>
                                    <div className="d-flex align-items-center">
                                        <span
                                            className="legend-dot"
                                            style={{
                                                backgroundColor: "#ADB5BD",
                                            }}
                                        ></span>
                                        <span className="ms-auto fw-bold">15%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAquisitionGraphs;