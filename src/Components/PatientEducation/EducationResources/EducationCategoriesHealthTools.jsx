import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Healthtool1 from "../../../Assets/Images/Healthtool1.png"
import Healthtool2 from "../../../Assets/Images/Healthtool2.png"
import Healthtool3 from "../../../Assets/Images/Healthtool3.png"
import AddHealthTools from "./AddHealthTools";

const EducationCategoriesHealthTools = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const items = [
    { label: "Last Day", key: "1" },
    { label: "Last Week", key: "2" },
    { label: "Last Month", key: "3" },
  ];
  const handleMenuClick = ({ key }) => {};
  const menuProps = { items, onClick: handleMenuClick };

  const eventData = [
    {
      img: Healthtool1,
      title: "Symptoms Checker",
      date: "Nov 25",
      description: "Ongoing research is focusing on the gut microbiome's role in various gastrointestinal diseases",
      department: "Gastroscience Department",
    },
    {
      img: Healthtool2,
      title: "Diet guide",
      date: "Nov 25",
      description: "Ongoing research is focusing on the gut microbiome's role in various gastrointestinal diseases",
      department: "Gastroscience Department",
    },
    {
      img: Healthtool3,
      title: "Lifestyle Tips",
      date: "Nov 25",
      description: "Ongoing research is focusing on the gut microbiome's role in various gastrointestinal diseases ",
      department: "Gastroscience Department",
    },
  ];

  const renderEventCard = (event) => (
    <div className="col-lg-4" key={event.title}>
      <div className="upcoming-event-card p-3">
        <div className="d-flex justify-content-center align-items-center mb-3">
          <img src={event.img} alt={event.title} />
        </div>
        <div>
          <div className="d-flex justify-content-between mb-2">
            <h4>{event.title}</h4>
            <span>{event.date}</span>
          </div>
          <p>{event.description}</p>
          <ul>
            <li>{event.department}</li>
          </ul>
          <button className="edit-event-button">Edit</button>
        </div>
      </div>
    </div>
  );

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="container mt-4">
        <div className="marketing-categories-section">

          <div className="row mt-4">
            <div className="d-flex justify-content-between">
              <h6>Health Tools</h6>
              <button className="rfh-basic-button" onClick={showModal}>
                <GoPlus size={20} /> Add
              </button>
            </div>
            <div className="mt-3">
              <Slider {...sliderSettings}>
                {eventData.map((event) => renderEventCard(event))}
              </Slider>
            </div>
          </div>
        </div>

      <AddHealthTools open={isModalOpen} handleCancel={handleCancel} />
    </div>
  );
};

export default EducationCategoriesHealthTools;


