import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {  Dropdown, Menu } from "antd";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddLatestCamps from "./AddLatestCamp";
export const LatestCampsList = () => {
  const [modals, setModals] = useState({
    program: false,
    camp: false,
    clinic: false,
  });
  const toggleModal = (modalType) =>
    setModals((prev) => ({ ...prev, [modalType]: !prev[modalType] }));


  const campData = [
    {
      key: 1,
      campName: "Blood Test Camp",
      Description: "RFH Organised a camp at RK ground",
      lat: "28.6139",
      lng: "77.2090",
    },
    {
      key: 2,
      campName: "Health Checkup Camp",
      Description: "Camp at City Center",
      lat: "19.0760",
      lng: "72.8777",
    },
    {
      key: 3,
      campName: "Blood Test Camp",
      Description: "RFH Organised a camp at RK ground",
      lat: "28.6139",
      lng: "77.2090",
    },
  ];

  const filterMenu = (
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
 
  const renderLatestCamps = (camp) => (
    <div className="col-lg-4">
      <div className="recommend-video-card">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.423259243416!2d72.81684837418092!3d18.956905855702594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce11a208b68b%3A0x231538ea71de5051!2sRaja%20Ram%20Mohan%20Roy%20Rd%2C%20Girgaon%2C%20Mumbai%2C%20Maharashtra%20400004%2C%20India!5e0!3m2!1sen!2sjp!4v1733119289892!5m2!1sen!2sjp"
          allowFullScreen
          title="Map showing Raja Ram Mohan Roy Road in Girgaon, Mumbai"
        ></iframe>
         <div className="featured-program-icon-container" style={{right:0}}>
          <Dropdown overlay={filterMenu} trigger={["click"]}>
            <button className="action-icon-button">
              <BsThreeDotsVertical />
            </button>
          </Dropdown>
        </div>
        <div className="recommend-video-card-content">
          <h4>{camp.campName}</h4>
          <p>{camp.Description}</p>
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
       

        {/* Latest camps */}
        <div className="row mt-4">
          <div className="d-flex justify-content-between">
            <h6>Latest Camps</h6>
            <button
              className="rfh-basic-button"
              onClick={() => toggleModal("camp")}
            >
              <GoPlus size={20} /> Add Camp
            </button>
          </div>
          <div className="mt-4">
            <Slider {...sliderSettings}>
              {campData.map((camp) => renderLatestCamps(camp))}
            </Slider>
          </div>
          <AddLatestCamps
            open={modals.camp}
            handleCancel={() => toggleModal("camp")}
          />
        </div>

       
      </div>
    </div>
  );
};
