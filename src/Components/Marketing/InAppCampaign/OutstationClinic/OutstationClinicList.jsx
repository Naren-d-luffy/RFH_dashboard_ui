import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import clinic1 from "../../../../Assets/Images/clinic1.png";
import clinic2 from "../../../../Assets/Images/clinic2.png";
import { Rate, Dropdown, Menu } from "antd";
import { FiMapPin } from "react-icons/fi";
import { GiPathDistance } from "react-icons/gi";
import { RiHospitalFill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddOutstationClinic from "./AddOutstationClinic";
export const OutstationClinicList = () => {
  const [modals, setModals] = useState({
    program: false,
    camp: false,
    clinic: false,
  });
  const toggleModal = (modalType) =>
    setModals((prev) => ({ ...prev, [modalType]: !prev[modalType] }));

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
          <AddOutstationClinic
            open={modals.clinic}
            handleCancel={() => toggleModal("clinic")}
          />
        </div>
      </div>
    </div>
  );
};
