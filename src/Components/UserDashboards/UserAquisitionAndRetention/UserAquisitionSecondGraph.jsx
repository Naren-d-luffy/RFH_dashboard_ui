import React from "react";
import {
    PieChart,
    Pie,
    XAxis,
    YAxis,
    CartesianGrid,
    AreaChart,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
    Area,
} from "recharts";
import { FiArrowUpRight } from "react-icons/fi";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { Dropdown, Menu, Button } from "antd";
import traffic from "../../../Assets/Icons/homehashtag.png";
import { DatePicker } from "antd";
import appstatus from "../../../Assets/Icons/appstatus.png";
import dayjs from "dayjs";
const trafficData = [
    { name: "New Login", value: 2000, color: "#4862ea" },
    { name: "Repeated Login", value: 3000, color: "#288cd5" },
    { name: "Active User", value: 4000, color: "#93d528" },
    { name: "Inactive User", value: 1000, color: "#23b4a2" },
];

const UserAquisitionSecondGraphs = () => {
    const actionMenu = {
        items: [
            { key: 'year', label: 'Year' },
            { key: 'month', label: 'Month' },
        ],
    };
    const churnRateData = [
        { month: "Jan", value: 600, installs: 250 },
        { month: "Feb", value: 800, installs: 320 },
        { month: "Mar", value: 700, installs: 350 },
        { month: "Apr", value: 650, installs: 300 },
        { month: "May", value: 1000, installs: 450 },
        { month: "Jun", value: 700, installs: 350 },
        { month: "Jul", value: 613, installs: 290 },
        { month: "Aug", value: 750, installs: 330 },
        { month: "Sep", value: 720, installs: 290 },
        { month: "Oct", value: 730, installs: 300 },
        { month: "Nov", value: 600, installs: 350 },
        { month: "Dec", value: 500, installs: 150 },
    ];
    const formatYAxis = (tick) => (tick >= 1000 ? `${tick / 1000}k` : tick);

    return (
        <div className="container">
            <div className="row mb-4 mt-3">
                <div className="col-lg-5">
                    <div className="d-flex flex-column gap-4 application-dashboard-graph    ">
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <div className="d-flex gap-2 align-items-center">
                                <div className="traffic-graph-image">
                                    <img src={traffic} alt="Traffic Icon" />
                                </div>
                                <h2 className="card-title text-start">Traffic</h2>
                            </div>
                            <Dropdown menu={actionMenu} trigger={["click"]}>
                                <Button type="text">
                                    <PiDotsThreeOutlineLight size={24} style={{ color: 'var(--secondary-text-color)' }} />
                                </Button>
                            </Dropdown>
                        </div>
                        <div className="graph-container">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={trafficData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={120}
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
                                            background: " #30363D",
                                            boxShadow: "0px 13.28px 13.28px 0px #00000040",
                                            borderRadius: "8px",
                                            color: "var(--white-color)",
                                            border: "none",
                                        }}
                                        formatter={(value, name, props) => {
                                            const color = props.payload?.color || "#000"; 
                                            return (
                                                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                                    <div
                                                        className="userAquisition-tooltip-dot"
                                                        style={{ backgroundColor: color }}
                                                    ></div>
                                                    <p
                                                        style={{
                                                            fontSize: "14px",
                                                            marginBottom: "0px",
                                                            color: "var(--white-color)",
                                                        }}
                                                    >
                                                        {value.toLocaleString()}
                                                    </p>
                                                </span>
                                            );
                                        }}
                                        labelFormatter={() => ""}
                                    ></Tooltip>
                                    <Legend
                                        iconType="circle"
                                        layout="vertical"
                                        align="right"
                                        verticalAlign="middle"
                                        style={{ marginBottom: "20px" }}
                                        formatter={(value, entry) => (
                                            <span
                                                style={{
                                                    color: entry.color,
                                                    fontWeight: "bold",
                                                    fontSize: "14px",
                                                    justifyContent: "flex-start",

                                                }}
                                            >
                                                <span
                                                    style={{
                                                        color: "#9D9D9D",
                                                        marginRight: "5px",
                                                    }}
                                                >
                                                    {value}
                                                </span>
                                            </span>
                                        )}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="total-user-display">
                                <p className="mb-0 total-users">Total User</p>
                                <h1 className="mb-0 total-users-count">10K</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7">
                    <div className="d-flex flex-column gap-4">
                        <div className="application-dashboard-graph d-flex justify-content-between align-items-center w-100">
                            <div className="d-flex gap-2 align-items-center">
                                <div className="traffic-graph-image">
                                    <img src={appstatus} alt="Traffic Icon" />
                                </div>
                                <h2 className="card-title text-start">App Status</h2>
                            </div>
                            <div className="">
                                <DatePicker
                                    defaultValue={dayjs("2024-12-09")}
                                    format="DD, MMM YYYY"
                                />
                            </div>
                        </div>
                        <div className="d-flex gap-4">
                            <div className="app-status-items">
                                <p>Downloads</p>
                                <h1>210</h1>
                            </div>
                            <div className="app-status-items">
                                <p>Installs</p>
                                <h1>310</h1>
                            </div>
                            <div className="app-status-items">
                                <p>Uninstalls</p>
                                <h1>90</h1>
                            </div>
                        </div>
                        <div
                            className="d-flex justify-content-start w-100"
                            style={{ position: "relative"}}
                        >
                            <ResponsiveContainer width="100%" height={200} style={{ position: "relative"}}>
                                <AreaChart data={churnRateData} >
                                    <CartesianGrid
                                        strokeDasharray="1 1"
                                        vertical={false}
                                        horizontal={false}
                                    />
                                    <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} />
                                    <YAxis
                                        ticks={[0, 200, 300, 500, 800, 1000]}
                                        tickFormatter={formatYAxis}
                                        tick={{ fontSize: 11 }}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            background: " #30363D",
                                            boxShadow: "0px 13.28px 13.28px 0px #00000040",
                                            borderRadius: "8px",
                                            color: "#fff",
                                        }}
                                        formatter={(value) => (
                                            <span
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "5px",
                                                }}
                                            >
                                                <FiArrowUpRight className="application-dashboard-graph-arrow" />
                                                {value.toLocaleString()}
                                            </span>
                                        )}
                                        labelFormatter={() => ""}
                                    />
                                    <Area
                                        type="linear"
                                        dataKey="value"
                                        stroke="#f07e8d"
                                        fill="#f07e8d"
                                        strokeWidth={2}
                                        dot={{ r: 5 }}
                                        activeDot={{ r: 8 }}
                                        fillOpacity={0.1}
                                    />
                                    <Area
                                        type="linear"
                                        dataKey="installs"
                                        stroke="#4d81e7"
                                        fill="#4d81e7"
                                        strokeWidth={2}
                                        dot={{ r: 5 }}
                                        activeDot={{ r: 8 }}
                                        fillOpacity={0.1}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAquisitionSecondGraphs;