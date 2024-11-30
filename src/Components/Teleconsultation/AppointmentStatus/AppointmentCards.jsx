
import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { HiOutlineLightBulb } from "react-icons/hi";
import { AiOutlinePieChart } from "react-icons/ai";
import { PiHandTap } from "react-icons/pi";
import { AiOutlineSound } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
// import CreateCampaign from "./CreateCampaign";
import { FaArrowUp } from "react-icons/fa";
import clickicon from "../../../Assets/Icons/click-icon.png"
import handIcon from "../../../Assets/Icons/handIcon.png"
const AppointmentCards = () => {
  const cardsData = [
    {
      title: "Total Campaign",
      value: 20,
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
      title: "Total Reach",
      value: "22,500",
      percentage: "340",
      description: "Users",
      icon: <img src={clickicon} alt="Click Icon" style={{ width: "20px" }} />,
      borderColor: "var(--sky-blue-color)",
      iconColor: "var(--sky-blue-color)",
      iconBackground: "#e8f6ff",
    },
    {
      title: "Engagement Rate",
      value: "15%",
      percentage: "+165",
      description: "New",
      icon: <img src={handIcon} alt="Click Icon" style={{ width: "15px" }} />,
      borderColor: "var(--light-orange-color)",
      iconColor: "#FFD66B",
      iconBackground: "#FFF4DB",
    },
    {
      title: "Conversion Rate",
      value: "5%",
      percentage: "+340",
      description: "New",
      icon: <AiOutlinePieChart />,
      borderColor: "var(--sky-blue-color)",
      iconColor: "var(--sky-blue-color)",
      iconBackground: "#e8f6ff",
    },
  ];


  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <div className="container">
      <div className="d-flex mt-4 justify-content-between campaign-performance-head">
        <div>
          <h3>Marketing Overview</h3>
          <p>There is the latest update for the last 7 days. Check now.</p>
        </div>
        <div>
          <button className="rfh-basic-button" onClick={showModal}>
            <GoPlus size={20} /> Create Campaign
          </button>
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
       {/* <CreateCampaign open={isModalOpen} handleCancel={handleCancel} /> */}
    </div>
  );
};

export default AppointmentCards;
