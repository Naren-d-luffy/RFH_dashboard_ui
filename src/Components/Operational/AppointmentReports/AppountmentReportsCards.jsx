import React, { useState } from "react";
import { AiOutlinePieChart } from "react-icons/ai";
import { AiOutlineSound } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import icon2 from "../../../Assets/Icons/DirectAppointment.png"
import { FaArrowUp, FaVideo } from "react-icons/fa";
import icon1 from "../../../Assets/Icons/appointmentReports.png"
import { FaCircleCheck } from "react-icons/fa6";
export const AppointmentReportCards = () => {
    const cardsData = [
        {
          title: "Total Appointments Reports",
          value: "2,898",
          percentage: "+165",
          
          description: "in this month",
          icon: <img src={icon1} alt="Click Icon" style={{ width: "18px" }} />,
          borderColor: "var(--primary-green)",
          iconColor: "var(--primary-green)",
          iconBackground: "#dffaf0",
        },
        {
          title: "Completed Appointments",
          value: "2,789",
          percentage: "+265",
          description: "In This Month",
          icon: <FaCircleCheck />,
          borderColor: "var(--sky-blue-color)",
          iconColor: "var(--sky-blue-color)",
          iconBackground: "#e8f6ff",
        },
        {
          title: "Virtual Appointment",
          value: "119",
          percentage: "+168",
          description: "In This Month",
          icon: <FaVideo />,
          borderColor: "var(--light-orange-color)",
          iconColor: "#FFD66B",
          iconBackground: "#FFF4DB",
        },
        {
          title: "Direct Appointment",
          value: "200",
          percentage: "+240",
          description: "In This Month",
          icon: <img src={icon2} alt="Click Icon" style={{ width: "22px" }} />,
          borderColor: "var(--sky-blue-color)",
          iconColor: "var(--sky-blue-color)",
          iconBackground: "#e8f6ff",
        },
      ];
      const navigate = useNavigate();
      return (
        <div className="">
          <div className="campaign-performance-head">
            <div>
              <h3>Appointment Reports</h3>
              <p>there is the latest update for the last 7 days. check now</p>
            </div>
            
          </div>
    
          <div className="row campaign-performance-container">
            {cardsData.map((card, index) => (
              <div className="col-lg-3 col-md-6 col-sm-12 mt-2" key={index}>
                <div
                  className="campaign-performance-card"
                  style={{ borderRightColor: card.borderColor,padding:"14px" }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <p style={{fontSize:"13px"}}>{card.title}</p>
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