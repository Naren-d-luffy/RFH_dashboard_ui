import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Healthtool1 from "../../../Assets/Images/Healthtool1.png";
import Healthtool2 from "../../../Assets/Images/Healthtool2.png";
import Healthtool3 from "../../../Assets/Images/Healthtool3.png";
import AddHealthTools from "./AddHealthTools";
import { IoEllipsisVerticalSharp } from "react-icons/io5";

const EducationCategoriesHealthTools = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(null);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const eventData = [
    {
      img: Healthtool1,
      title: "Symptoms Checker",
      date: "Nov 25",
      description:
        "Ongoing research is focusing on the gut microbiome's role in various gastrointestinal diseases",
      department: "Gastroscience Department",
    },
    {
      img: Healthtool2,
      title: "Diet Guide",
      date: "Nov 25",
      description:
        "Ongoing research is focusing on the gut microbiome's role in various gastrointestinal diseases",
      department: "Gastroscience Department",
    },
    {
      img: Healthtool3,
      title: "Lifestyle Tips",
      date: "Nov 25",
      description:
        "Ongoing research is focusing on the gut microbiome's role in various gastrointestinal diseases",
      department: "Gastroscience Department",
    },
  ];

  const toggleMenu = (id) => {
    setShowMenu(showMenu === id ? null : id); 
  };

  const renderEventCard = (event, index) => (
    <div className="col-lg-4" key={index}>
      <div className="upcoming-event-card p-3" style={{ position: "relative" }}>
        <div
          className="education-categories-faq-menu"
          onClick={(e) => {
            e.stopPropagation(); 
            toggleMenu(index); 
          }}
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 10,
          }}
        >
          <IoEllipsisVerticalSharp size={20} />
          {showMenu === index && (
            <div className="education-categories-menu-options">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          )}
        </div>

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
              {eventData.map((event, index) => renderEventCard(event, index))}
            </Slider>
          </div>
        </div>
      </div>

      <AddHealthTools open={isModalOpen} handleCancel={handleCancel} />
    </div>
  );
};

export default EducationCategoriesHealthTools;
