import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { Dropdown, Menu, Button } from "antd";
import traffic from "../../../Assets/Icons/homehashtag.png";

const trafficData = [
    { name: "New Login", value: 2000, color: "#4862ea" },
    { name: "Repeated Login", value: 3000, color: "#288cd5" },
    { name: "Active User", value: 4000, color: "#93d528" },
    { name: "Inactive User", value: 1000, color: "#23b4a2" },
];

const UserAquisitionSecondGraphs = () => {
    const actionMenu = (
        <Menu>
            <Menu.Item key="edit">Edit</Menu.Item>
            <Menu.Item key="delete">Delete</Menu.Item>
        </Menu>
    );

    return (
        <div className="container">
            <div className="row mb-4">
                <div className="col-lg-6">
                    <div className="d-flex flex-column gap-4">
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <div className="d-flex gap-2 align-items-center">
                                <div className="traffic-graph-image">
                                    <img src={traffic} alt="Traffic Icon" />
                                </div>
                                <h2 className="card-title text-start mb-2">Traffic</h2>
                            </div>
                            <Dropdown overlay={actionMenu} trigger={["click"]}>
                                <Button type="text">
                                    <PiDotsThreeOutlineLight size={24} />
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
                                            backgroundColor: "#fff",
                                            borderColor: "#00A56A",
                                        }}
                                        formatter={(value) => `${value.toLocaleString()} users`}
                                    />
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
            </div>
        </div>
    );
};

export default UserAquisitionSecondGraphs;