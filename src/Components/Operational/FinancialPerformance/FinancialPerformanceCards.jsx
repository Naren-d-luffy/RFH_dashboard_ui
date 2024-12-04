import React from "react";
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import { FaSackDollar } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import PendingPaymentIcon from "../../../Assets/Icons/PendingPaymentIcon.png";

const FinancialPerformanceCards = () => {
  const cardsData = [
    {
      title: "Total Revenue",
      value: "₹8.00.000",
      percentage: (
        <>
          70%{" "}
          <FiArrowUpRight
            style={{ color: "var(--primary-green)", fontSize: "12px" }}
          />
        </>
      ),
      description: "In This Month",
      icon: <FaSackDollar />,
      borderColor: "var(--primary-green)",
      iconColor: "var(--primary-green)",
      iconBackground: "#dffaf0",
    },
    {
      title: "Completed Payment",
      value: 225,
      percentage: (
        <>
          70%{" "}
          <FiArrowUpRight
            style={{ color: "var(--primary-green)", fontSize: "12px" }}
          />
        </>
      ),
      description: "In This Month",
      icon: <FaCheckCircle />,
      borderColor: "var(--sky-blue-color)",
      iconColor: "var(--sky-blue-color)",
      iconBackground: "#e8f6ff",
    },
    {
      title: "Pending Payment",
      value: 109,
      percentage: (
        <>
          48%{" "}
          <FiArrowDownRight
            style={{ color: "var(--red-color)", fontSize: "12px" }}
          />
        </>
      ),
      description: "In This Month",
      icon: (
        <img
          src={PendingPaymentIcon}
          alt="Click Icon"
          style={{ width: "15px" }}
        />
      ),
      borderColor: "var(--light-orange-color)",
      iconColor: "#FFD66B",
      iconBackground: "#FFF4DB",
    },
    {
      title: "Faild Payment",
      value: 80,
      percentage: (
        <>
          8%{" "}
          <FiArrowDownRight
            style={{ color: "var(--red-color)", fontSize: "12px" }}
          />
        </>
      ),
      description: "In This Month",
      icon: <IoIosCloseCircle size={25} />,
      borderColor: "var(--sky-blue-color)",
      iconColor: "var(--sky-blue-color)",
      iconBackground: "#e8f6ff",
    },
  ];

  return (
    <div className="">
      <div className="d-flex mt-4 justify-content-between campaign-performance-head">
        <div>
          <h3>Financial Performance</h3>
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

export default FinancialPerformanceCards;
