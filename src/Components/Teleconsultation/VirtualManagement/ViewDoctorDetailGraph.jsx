import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", New: 30, FollowUp: 10 },
  { name: "Feb", New: 50, FollowUp: 20 },
  { name: "Mar", New: 40, FollowUp: 30 },
  { name: "Apr", New: 70, FollowUp: 50 },
  { name: "May", New: 90, FollowUp: 68 },
  { name: "Jun", New: 50, FollowUp: 40 },
  { name: "Jul", New: 40, FollowUp: 35 },
  { name: "Aug", New: 60, FollowUp: 50 },
  { name: "Sep", New: 80, FollowUp: 60 },
  { name: "Oct", New: 70, FollowUp: 45 },
  { name: "Nov", New: 90, FollowUp: 30 },
  { name: "Dec", New: 80, FollowUp: 30 },
];

const ViewDoctorDetailGraph = () => {
  return (
    <div className="view-doctor-detail-graph-container">
      <div className="d-flex justify-content-between align-items-center mb-3 view-doctor-detail-graph-header ">
        <div>
          <h3>Appointment Stats</h3>
          <p>
            <span style={{ color: "var(--light-graph-green)" }}>
              (+5) more{" "}
            </span>
            in This Week
          </p>
        </div>
        <div className="d-flex gap-2">
          <button className="view-doctor-detail-btn">Daily</button>
          <button className="view-doctor-detail-btn active">Weekly</button>
          <button className="view-doctor-detail-btn">Annually</button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00963F" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00963F" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorFollowUp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00963F" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00963F" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={true}
            vertical={false}
          />
          <XAxis
            dataKey="name"
            style={{ fontSize: "10px", fontWeight: "500" }}
          />
          <YAxis
            ticks={[0, 20, 40, 60, 80, 100]}
            style={{ fontSize: "10px", fontWeight: "500" }}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="New"
            stroke="#2D3748"
            fillOpacity={1}
            fill="url(#colorNew)"
          />
          <Area
            type="monotone"
            dataKey="FollowUp"
            stroke="#00963F"
            fillOpacity={1}
            fill="url(#colorFollowUp)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ViewDoctorDetailGraph;
