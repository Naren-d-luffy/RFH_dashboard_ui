import React, { useState } from "react";
import { Button, Dropdown, Input } from "antd";
import { FiSearch } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { VscSettings } from "react-icons/vsc";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import AddEventsGastroIllness from "./AddEventsGastroIllness";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../../Assets/Images/img1.png";
import img2 from "../../../Assets/Images/img2.png";
import img3 from "../../../Assets/Images/img3.png";
import {filterDropdown} from "../../../globalConstant"

const EducationCategoriesGastroIllness = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(null); 
  const [selectedValues, setSelectedValues] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const eventData = [
    {
      img: img1,
      title: "Gastritis",
      date: "Nov 25",
      description: "Gastritis is an inflammation of the stomach lining",
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
      description: "Pancreatitis is one of the swelling of the pancreas",
      department: "Gastroscience Department",
    },
  ];

  const toggleMenu = (index) => {
    setShowMenu(showMenu === index ? null : index);
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
            <div
              className="education-categories-menu-options"
            >
              <button
                onClick={() => console.log(`Edit ${event.title}`)}
              >
                Edit
              </button>
              <button
                onClick={() => console.log(`Delete ${event.title}`)}
              >
                Delete
              </button>
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

  const handleCheckboxChange = (value, checked) => {
    if (checked) {
      setSelectedValues((prev) => [...prev, value]);
    } else {
      setSelectedValues((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleApply = () => {
    console.log('Applied Filters:', selectedValues);
    setIsDropdownOpen(false);
  };
  const handleReset = () => {
    setSelectedValues([]);
  };
  const options = [
    {
      label: 'Type',
      options: [
        { label: 'All', value: 'all' },
        { label: 'OPD', value: 'opd' },
        { label: 'IPD', value: 'ipd' },
      ],
    },
    {
      label: 'Last Visit',
      options: [
        { label: 'Last 7 days', value: 'last7days' },
        { label: 'Last 30 days', value: 'last30days' },
      ],
    },
    {
      label: 'All Users',
      options: [
        { label: 'Active Users', value: 'activeusers' },
        { label: 'Inactive Users', value: 'inactiveusers' },
      ],
    },
  ];

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
            <Dropdown
              overlay={filterDropdown(options, selectedValues, handleCheckboxChange, handleApply, handleReset)}
              trigger={['click']}
              open={isDropdownOpen}
              onOpenChange={setIsDropdownOpen}
              placement="bottomLeft"
            >
              <Button style={{ width: 160 }}>
                <VscSettings />
                Filters
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
              {eventData.map((event, index) => renderEventCard(event, index))}
            </Slider>
          </div>
        </div>
      </div>

      <AddEventsGastroIllness open={isModalOpen} handleCancel={handleCancel} />
    </div>
  );
};

export default EducationCategoriesGastroIllness;
