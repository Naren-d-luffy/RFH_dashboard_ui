import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { FaSackDollar } from "react-icons/fa6";
import DollorIcon from "../../../Assets/Icons/DollorIcon.png"
import Dollor from "../../../Assets/Icons/Dollor.png"
import PeakHours from "../../../Assets/Icons/PeakHours.png"

const ServiceUtilizationCards = () => {
  const cardsData = [
    {
      title: "Total Service Utilize",
      value: "3455",
      percentage: (
        <>
           70%  {" "} <FiArrowUpRight style={{ color: "var(--primary-green)", fontSize: "12px" }} />
        </>
      ),
      description: "In This Year",
      icon: <FaSackDollar />,
      borderColor: "var(--primary-green)",
      iconColor: "var(--primary-green)",
      iconBackground: "#dffaf0",
    },
    {
      title: "Popular Service",
      value: 23,
      percentage: (
        <>
           55%  {" "} <FiArrowUpRight style={{ color: "var(--primary-green)", fontSize: "12px" }} />
        </>
      ),
      description: "In This Month",
      icon: (
        <img
          src={DollorIcon}
          alt="Click Icon"
          style={{ width: "15px" }}
        />
      ),
      borderColor: "var(--sky-blue-color)",
      iconColor: "var(--sky-blue-color)",
      iconBackground: "#e8f6ff",
    },
    {
      title: "Average service",
      value: 19,
      percentage: (
        <>
           48%  {" "} <FiArrowUpRight style={{ color: "var(--primary-green)", fontSize: "12px" }} />
        </>
      ),
      description: "In This Month",
      icon: (
        <img
          src={Dollor}
          alt="Click Icon"
          style={{ width: "15px" }}
        />
      ),
      borderColor: "var(--light-orange-color)",
      iconColor: "#FFD66B",
      iconBackground: "#FFF4DB",
    },
    {
      title: "Peak hours",
      value: "9 AM - 12 PM",
      percentage: (
        <>
           8%  {" "} <FiArrowUpRight style={{ color: "var(--primary-green)", fontSize: "12px" }} />
        </>
      ),
      description: "In This Month",
      icon: (
        <img
          src={PeakHours}
          alt="Profile Tick"
          style={{ width: "18px", height: "18px" }}
        />
      ),
      borderColor: "var(--sky-blue-color)",
      iconColor: "var(--sky-blue-color)",
      iconBackground: "#e8f6ff",
    },
  ];

  return (
    <div className="">
      <div className="d-flex mt-4 justify-content-between campaign-performance-head">
        <div>
          <h3>Service Utilization</h3>
          <p>there is the latest update for the last 7 days. check now</p>
        </div>
      </div>

      <div className="row campaign-performance-container">
        {cardsData.map((card, index) => (
          <div className="col-lg-3 col-md-6 col-sm-12 mt-2" key={index}>
            <div
              className="campaign-performance-card"
              style={{ borderRightColor: card.borderColor }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <p>{card.title}</p>
                <span
                  className="campaign-performance-icon"
                  style={{
                    color: card.iconColor,
                    backgroundColor: card.iconBackground,
                  }}
                >
                  {card.icon}
                </span>
              </div>
              <h3>{card.value}</h3>
              <div className="campaign-performance-stats">
                <p>
                  <span className="campaign-performance-percentage">
                    {card.percentage}
                  </span>{" "}
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceUtilizationCards;
