import React from "react";
import { FaCheckCircle, FaPeopleCarry, FaVideo } from "react-icons/fa";
import { PiCalendarPlusFill } from "react-icons/pi";

const AppointmentCards = () => {
  const cardsData = [
    {
      title: "Total Appointments",
      value: "2,898",
      percentage: "+165",
      description: "In This Month",
      icon: <PiCalendarPlusFill />,
      borderColor: "var(--primary-green)",
      iconColor: "var(--primary-green)",
      iconBackground: "#dffaf0",
    },
    {
      title: "Completed Appointments",
      value: "2,789",
      percentage: "+265",
      description: "In This Month",
      icon: <FaCheckCircle />,
      borderColor: "var(--sky-blue-color)",
      iconColor: "var(--sky-blue-color)",
      iconBackground: "#e8f6ff",
    },
    {
      title: "Virtual Appointment",
      value: "109",
      percentage: "+169",
      description: "In This Month",
      icon: <FaVideo />,
      borderColor: "var(--light-orange-color)",
      iconColor: "#FFD66B",
      iconBackground: "#FFF4DB",
    },
    {
      title: "Direct Appointment",
      value: "50%",
      percentage: "+240",
      description: "In This Month",
      icon: <FaPeopleCarry />,
      borderColor: "var(--sky-blue-color)",
      iconColor: "var(--sky-blue-color)",
      iconBackground: "#e8f6ff",
    },
  ];

  return (
    <div className="">
      <div className="d-flex mt-4 justify-content-between campaign-performance-head">
        <div>
          <h3>Appointment Status</h3>
          <p>There is the latest update for the last 7 days check now</p>
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

export default AppointmentCards;
