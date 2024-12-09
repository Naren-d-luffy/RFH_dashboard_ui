import React from "react";
import { FaArrowUp } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";
import patient from '../../../Assets/Icons/patient.png'

const ViewDoctorDetailCards = () => {
  const cardsData = [
    {
      title: "Total Patient",
      value: 20,
      percentage: (
        <>
           <FaArrowUp style={{ color: "var(--primary-green)", fontSize: "12px" }} /> {" "}5%
        </>
      ),
      description: "Since last week",
      icon: <img src={patient} alt="Profile Tick" style={{ width: '18px', height: '18px' }} />,
      borderColor: "var(--primary-green)",
      iconColor: "var(--primary-green)",
      iconBackground: "#dffaf0",
    },
    {
      title: "Total Reach",
      value: "22,500",
      percentage: (
        <>
           <FaArrowUp style={{ color: "var(--primary-green)", fontSize: "12px" }} /> {" "}2%
        </>
      ),
      description: "Since last week",
      icon: <FaUserPlus />,
      borderColor: "var(--sky-blue-color)",
      iconColor: "var(--sky-blue-color)",
      iconBackground: "#e8f6ff",
    },
    {
      title: "Follow-Up Patient",
      value: "15%",
      percentage: (
        <>
           <FaArrowUp style={{ color: "var(--primary-green)", fontSize: "12px" }} /> {" "}2%
        </>
      ),
      description: "Since last week",
      icon: <FaCirclePlus/>,
      borderColor: "var(--light-orange-color)",
      iconColor: "#FFD66B",
      iconBackground: "#FFF4DB",
    },
  ];

  return (
      <div className="row">
        {cardsData.map((card, index) => (
          <div className="col-lg-4 col-md-4 col-sm-12 mt-2" key={index}>
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
  );
};

export default ViewDoctorDetailCards;

