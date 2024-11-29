import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, Input, Space } from "antd";
import { FiSearch } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { VscSettings } from "react-icons/vsc";
import AddEventsGastroIllness from "./AddEventsGastroIllness";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../Assets/Images/img1.png"
import img2 from "../../Assets/Images/img2.png"
import img3 from "../../Assets/Images/img3.png"

const EducationCategoriesGastroIllness = () => {
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
      img: img1,
      title: "Gastritis",
      date: "Nov 25",
      description: "Gastritis is an inflammation of the stomach linin",
      department: "Gastroscience Department",
    },
    {
      img: img2,
      title: "Hepatitis",
      date: "Nov 25",
      description: "Hepatitis is a general term for liver inflammation",
      department: "Gastroscience Department",
    },
    {
      img: img3,
      title: "Pancreatitis",
      date: "Nov 25",
      description: "Pancreatitis is one of the swelling of the pancreas ",
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
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>Education Categories</h4>
            <div className="d-flex gap-3 align-items-center">
              <div
                className="d-flex align-items-center px-3"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  height: "33px",
                }}
              >
                <FiSearch style={{ color: "#888", marginRight: "10px" }} />
                <Input
                  type="text"
                  placeholder="Search anything here"
                  style={{ border: "none", outline: "none" }}
                />
              </div>
              <Dropdown menu={menuProps}>
                <Button>
                  <Space>
                    <VscSettings />
                    Filter
                  </Space>
                </Button>
              </Dropdown>
            </div>
          </div>

          <div className="row mt-4">
            <div className="d-flex justify-content-between">
              <h6>Gastro Illness</h6>
              <button className="rfh-basic-button" onClick={showModal}>
                <GoPlus size={20} /> Add Events
              </button>
            </div>
            <div className="mt-3">
              <Slider {...sliderSettings}>
                {eventData.map((event) => renderEventCard(event))}
              </Slider>
            </div>
          </div>
        </div>

      <AddEventsGastroIllness open={isModalOpen} handleCancel={handleCancel} />
    </div>
  );
};

export default EducationCategoriesGastroIllness;

