import React from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export const UserEngagementCards = () => {
  const cardData = [
    {
      heading: "Total Active Users",
      value: "5,715",
      percentage: (
        <span style={{ color: "blue" }}>
          68.95% <TiArrowSortedUp />
        </span>
      ),
      description: "Since Yesterday",
      trend: "up",
      graphData: [
        { value: 100 },
        { value: 200 },
        { value: 100 },
        { value: 400 },
        { value: 100 },
        { value: 300 },

      ],
      graphColor: "#2D5BFF",
    },
    {
      heading: "Weekly Active Users",
      value: "250",
      percentage: (
        <span style={{ color: "green" }}>
          25.85 % <TiArrowSortedUp />
        </span>
      ),
      description: "Since Last Week",
      trend: "up",
      graphData: [
        { value: 100 },
        { value: 200 },
        { value: 100 },
        { value: 400 },
        { value: 100 },
        { value: 300 },
        { value: 400 },
        { value: 200 },
        { value: 500 },

      ],
      graphColor: "#04CE00",
    },
    {
      heading: "Monthly Active Users",
      value: "180",
      percentage: (
        <span style={{ color: "red" }}>
          17.95% <TiArrowSortedDown />
        </span>
      ),
      description: "Since Last Month",
      trend: "down",
      graphData: [
        { value: 100 },
        { value: 200 },
        { value: 100 },
        { value: 400 },
        { value: 100 },
        { value: 300 },
        { value: 400 },
        { value: 100 },
        
      ],
      graphColor: "#ED0A0A",
    },
    {
      heading: "Peak Activity Time",
      value: (
        <div>
          <span style={{ fontSize: "18px" }}>6</span>
          <span style={{ fontSize: "12px" }}> PM</span>{" "}
          <span style={{ fontSize: "18px" }}>To</span>{" "}
          <span style={{ fontSize: "18px" }}>8</span>
          <span style={{ fontSize: "12px" }}> PM</span>
        </div>
      ),
      percentage: (
        <span style={{ color: "orange" }}>
          68.85% <TiArrowSortedUp />
        </span>
      ),
      description: "Since Last 7 Days",
      trend: "up",
      graphData: [
        { value: 100 },
        { value: 400 },
        { value: 100 },
        { value: 400 },
        { value: 50 },
        { value: 200 },
        { value: 100 },
      ],
      graphColor: "#FEB052",
    },
  ];

  return (
    <div className="row">
      <div className="user-engagement-header">
        <h3>User Engagement</h3>
        <p className="userAquisition-card-body-p">
          there is the latest update for the last 7 days. check now
        </p>
      </div>
      <div className="row">
        {cardData.map((card, index) => (
          <div key={index} className="col-lg-6 col-xl-3 mt-2 col-md-6" >
            <div className="user-engagement-card">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h5>{card.heading}</h5>
                  <h2>{card.value}</h2>
                  <h6>{card.description}</h6>
                </div>
                <div>
                  <ResponsiveContainer width="100%" height={60}>
                    <LineChart data={card.graphData}>
                      <Line
                        type="linear" 
                        dataKey="value"
                        stroke={card.graphColor}
                        strokeWidth={2}
                        dot={false} 
                      />
                    </LineChart>
                  </ResponsiveContainer>

                  <p>{card.percentage} </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
