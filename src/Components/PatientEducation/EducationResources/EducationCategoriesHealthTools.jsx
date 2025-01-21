import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Healthtool2 from "../../../Assets/Images/Healthtool2.png";
import Healthtool3 from "../../../Assets/Images/Healthtool3.png";
import AddHealthTools from "./AddHealthTools";
import { Dropdown, Menu } from "antd";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
const EducationCategoriesHealthTools = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const eventData = [
    {
      img: Healthtool3,
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

  const sortMenu = (
    <Menu>
      <Menu.Item key="edit" className="filter-menu-item">
        <BiEdit style={{ color: "var(--primary-green)", marginRight: "4px" }} />
        Edit
      </Menu.Item>
      <Menu.Item key="delete" className="filter-menu-item">
        <RiDeleteBin7Line
          style={{ color: "var(--red-color)", marginRight: "4px" }}
        />
        Delete
      </Menu.Item>
    </Menu>
  );
  const renderEventCard = (event, index) => (
    <div className="col-lg-4" key={index}>
      <div className="upcoming-event-card p-3" style={{ position: "relative" }}>
      <div className="treatment-info-icon-container">
          <Dropdown overlay={sortMenu} trigger={["click"]}>
            <button className="action-icon-button">
              <BsThreeDotsVertical />
            </button>
          </Dropdown>
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
              {Object.values(eventData).map((event, index) => renderEventCard(event, index))}
            </Slider>
          </div>
        </div>
      </div>

      <AddHealthTools open={isModalOpen} handleCancel={handleCancel} />
    </div>
  );
};

export default EducationCategoriesHealthTools;
