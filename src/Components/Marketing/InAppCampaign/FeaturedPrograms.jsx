import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import program1 from "../../../Assets/Images/program1.png";
import program2 from "../../../Assets/Images/program2.png";
import clinic1 from "../../../Assets/Images/clinic1.png";
import clinic2 from "../../../Assets/Images/clinic2.png";
import FeaturedProgramModel from "./FeaturedProgramModel";
import LatestCamps from "./LatestCamps";
import { Rate, Dropdown, Menu } from "antd";
import { FiMapPin } from "react-icons/fi";
import { GiPathDistance } from "react-icons/gi";
import { RiHospitalFill } from "react-icons/ri";
import OutstationClinic from "./OutstationClinic";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
export const FeaturedPrograms = () => {
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

  const ClinicData = [
    {
      img: clinic1,
      title: "Acidity Clinic",
      rating: 5.0,
      reviews: 128,
      description: "Ongoing research is focusing on the gut microbiome's role",
      location: "Mumbai, India",
      distance: "2.5 km/40min",
      category: "Hospital",
    },
    {
      img: clinic2,
      title: "Constipation Clinic",
      rating: 4.9,
      reviews: 58,
      description: "Ongoing research is focusing on the gut microbiome's role",
      location: "Mumbai, India",
      distance: "2.5 km/40min",
      category: "Hospital",
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

  const renderOutstationClinic = (clinic) => (
    <div className="col-lg-4">
      <div className="feature-program-card" key={clinic.title}>
        <div className=" mb-3">
          <img src={clinic.img} alt={clinic.title} />
          <div className="featured-program-icon-container">
          <Dropdown overlay={sortMenu} trigger={["click"]}>
            <button className="action-icon-button">
              <BsThreeDotsVertical style={{color:"#fff"}}/>
            </button>
          </Dropdown>
        </div>
        </div>
        <div className="clinic-content p-3">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="clinic-title">{clinic.title}</h4>
            <div className="clinic-category mt-2">
              <h6 className="badge">
                <RiHospitalFill style={{ width: "16px", height: "16px" }} />
                {clinic.category}
              </h6>
            </div>
          </div>
          <div className="clinic-rating d-flex align-items-center my-2 gap-2">
            <h6 className="reviews">{clinic.rating}</h6>
            <Rate
              allowHalf
              disabled
              defaultValue={clinic.rating}
              style={{ fontSize: "16px", paddingLeft: "0", color: "#FEB052" }}
            />
            <h6 className="reviews">({clinic.reviews} Reviews)</h6>
          </div>
          <p className="clinic-description">{clinic.description}</p>
          <div className="clinic-details d-flex gap-2 align-items-center mt-2">
            <h6 className="location">
              <FiMapPin /> {clinic.location}
            </h6>
            <div className="clinic-vertical-line"></div>
            <h6 className="distance">
              <GiPathDistance /> {clinic.distance}
            </h6>
          </div>
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
        {/* featured programs */}
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
          <FeaturedProgramModel
            open={modals.program}
            handleCancel={() => toggleModal("program")}
          />
        </div>

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
          <LatestCamps
            open={modals.camp}
            handleCancel={() => toggleModal("camp")}
          />
        </div>

        {/* Outstation clinic */}
        <div className="row mt-4">
          <div className="d-flex justify-content-between">
            <h6>Outstation Clinic</h6>
            <button
              className="rfh-basic-button"
              onClick={() => toggleModal("clinic")}
            >
              <GoPlus size={20} /> Add Clinic
            </button>
          </div>
          <div className="mt-4">
            <Slider {...sliderSettings}>
              {ClinicData.map((clinic) => renderOutstationClinic(clinic))}
            </Slider>
          </div>
          <OutstationClinic
            open={modals.clinic}
            handleCancel={() => toggleModal("clinic")}
          />
        </div>
      </div>
    </div>
  );
};
