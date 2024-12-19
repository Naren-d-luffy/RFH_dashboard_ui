import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import program1 from "../../../../Assets/Images/program1.png";
import program2 from "../../../../Assets/Images/program2.png";
import {  Dropdown, Menu } from "antd";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddFeaturesModal from "./AddFeaturedProgram";
export const FeaturedProgramsList = () => {
  const [modals, setModals] = useState({
    program: false,
    camp: false,
    clinic: false,
  });
  const toggleModal = (modalType) =>
    setModals((prev) => ({ ...prev, [modalType]: !prev[modalType] }));

  const eventData = [
    {
      img: program1,
      title: "Gut Microbiome",
      date: "Nov 25",
      description:
        "Ongoing research is focusing on the gut microbiome's role in various gastrointestinal diseases",
      department: "Gastroscience Department",
    },
    {
      img: program2,
      title: "Gut Microbiome",
      date: "Nov 26",
      description:
        "Ongoing research is focusing on the gut microbiome's role in various gastrointestinal diseases",
      department: "Healthcare Services",
    },
    {
      img: program1,
      title: "Gut Microbiome",
      date: "Nov 27",
      description:
        "Ongoing research is focusing on the gut microbiome's role in various gastrointestinal diseases",
      department: "Nutrition Department",
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
  
  const renderEventCard = (event) => (
    <div className="col-lg-4">
      <div className="feature-program-card" key={event.title}>
       
        <div className="mb-3">
          <img src={event.img} alt={event.title} />
          <div className="featured-program-icon-container">
          <Dropdown overlay={sortMenu} trigger={["click"]}>
            <button className="action-icon-button">
              <BsThreeDotsVertical />
            </button>
          </Dropdown>
        </div>
        </div>
        <div className="p-3">
          <div className="d-flex justify-content-between mb-2">
            <h4>{event.title}</h4>
            <h6>{event.date}</h6>
          </div>
          <p>{event.description}</p>
          <ul>
            <li>{event.department}</li>
          </ul>
        </div>
      </div>
    </div>
  );
 


  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", zIndex: "1000" }}
        onClick={onClick}
      >
        &#8592;
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", zIndex: "1000" }}
        onClick={onClick}
      >
        &#8594;
      </div>
    );
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="row mt-4">
      <div className="marketing-categories-section">
        <div className="row mt-4">
          <div className="d-flex justify-content-between">
            <h6>Featured Programs</h6>
            <button
              className="rfh-basic-button"
              onClick={() => toggleModal("program")}
            >
              <GoPlus size={20} /> Add Program
            </button>
          </div>
          <div className="mt-4">
            <Slider {...sliderSettings}>
              {eventData.map((event) => renderEventCard(event))}
            </Slider>
          </div>
          <AddFeaturesModal
            open={modals.program}
            handleCancel={() => toggleModal("program")}
          />
        </div>

       
      </div>
    </div>
  );
};
