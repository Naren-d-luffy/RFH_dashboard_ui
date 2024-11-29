import React from "react";
import { HiOutlineLightBulb } from "react-icons/hi";
import { AiOutlinePieChart } from "react-icons/ai";
import { PiHandTap } from "react-icons/pi";
import { AiOutlineSound } from "react-icons/ai";
import { FaArrowUp } from "react-icons/fa6";

const EducationResourcesCards = () => {
  const cardsData = [
    {
      title: "Total Campaign",
      value: '20',
      percentage: (
        <>
           <FaArrowUp style={{ color: "var(--primary-green)", fontSize: "12px" }} /> {" "}2%
        </>
      ),
      description: "Since last week",
      icon: <AiOutlineSound />,
      borderColor: "var(--primary-green)",
      iconColor: "var(--primary-green)",
      iconBackground: "#dffaf0",
    },
    {
      title: "Total Clicks",
      value: "22,500",
      percentage: "340",
      description: "Users",
      icon: <HiOutlineLightBulb />,
      borderColor: "var(--sky-blue-color)",
      iconColor: "var(--sky-blue-color)",
      iconBackground: "#e8f6ff",
    },
    {
      title: "Total impression",
      value: "15%",
      percentage: "+165",
      description: "New",
      icon: <PiHandTap />,
      borderColor: "var(--light-orange-color)",
      iconColor: "#FFD66B",
      iconBackground: "#FFF4DB",
    },
    {
      title: "CTR",
      value: "5%",
      percentage: "+340",
      description: "New",
      icon: <AiOutlinePieChart />,
      borderColor: "var(--sky-blue-color)",
      iconColor: "var(--sky-blue-color)",
      iconBackground: "#e8f6ff",
    },
  ];

  return (
    <div className="container mt-4">
      <div className="campaign-performance-head">
        <h3>InApp Campaign overview</h3>
        <p>there is the latest update for the last 7 days. check now</p>
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

export default EducationResourcesCards;


