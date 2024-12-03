import React from "react";
import patient from "../../Assets/Icons/patient.png"
import { BsCapsulePill } from "react-icons/bs";
import Remainders from "../../Assets/Icons/Remainders.png"
import medicationalerts from "../../Assets/Icons/medicationalerts.png"


const MedicationTrackerCards = () => {
  const cardsData = [
    {
      title: "Total patients",
      value: "3,485",
      percentage: +254,
      description: "In This Month",
      icon: <img src={patient} alt="Profile Tick" style={{ width: '18px', height: '18px' }} />,
      borderColor: "var(--primary-green)",
      iconColor: "var(--primary-green)",
      iconBackground: "#dffaf0",
    },
    {
      title: "Patients On Medications",
      value: "2,789",
      percentage: "+265",
      description: "In This Month",
      icon: <BsCapsulePill />,
      borderColor: "var(--sky-blue-color)",
      iconColor: "var(--sky-blue-color)",
      iconBackground: "#e8f6ff",
    },
    {
      title: "Missed Medications Alerts",
      value: "88",
      percentage: "+5",
      description: "In This Month",
      icon: <img src={medicationalerts} alt="Click Icon" style={{ width: "15px" }} />,
      borderColor: "var(--light-orange-color)",
      iconColor: "#FFD66B",
      iconBackground: "#FFF4DB",
    },
    {
      title: "Upcoming Refill Reminders",
      value: "349",
      percentage: "+240",
      description: "In This Month",
      icon: <img src={Remainders} alt="Profile Tick" style={{ width: '18px', height: '18px' }} />,
      borderColor: "var(--sky-blue-color)",
      iconColor: "var(--sky-blue-color)",
      iconBackground: "#e8f6ff",
    },
  ];

  return (
    <div className="">
      <div className="d-flex mt-4 justify-content-between campaign-performance-head">
        <div>
          <h3>Medication Tracker</h3>
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

export default  MedicationTrackerCards;


