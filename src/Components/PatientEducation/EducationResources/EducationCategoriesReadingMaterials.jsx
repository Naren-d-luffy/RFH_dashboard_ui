import React from "react";
import Acidity from "../../../Assets/Images/Acidity.png";
import Jaundice from "../../../Assets/Images/Jaundice.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {  Dropdown, Menu } from "antd";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import image1 from "../../../Assets/Images/comingsoon.png"
const EducationCategoriesReadingMaterials = () => {


  const imageData = [
    {
      id: 1,
      title: "Acidity",
      time: "acid reflux or heartburn, is a condition where the acid .....",
      image: Acidity,
    },
    {
      id: 2,
      title: "Jaundice",
      time: "is a medical condition characterized by the yellowi.....",
      image: Jaundice,
    },
    {
      id: 3,
      title: "Acidity",
      time: "acid reflux or heartburn, is a condition where the acid .....",
      image: Acidity,
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

  const renderImageCard = (image) => (
    <div className="col-lg-4" key={image.id}>
      <div
        className="recommend-image-card p-3"
        style={{
          backgroundImage: `url(${image.image})`,
        }}
      >
       <div className="treatment-info-icon-container">
          <Dropdown overlay={sortMenu} trigger={["click"]}>
            <button className="action-icon-button">
              <BsThreeDotsVertical />
            </button>
          </Dropdown>
        </div>

        <div>
          <div className="d-flex justify-content-between mb-2 w-100">
            <div style={{ position: "absolute", bottom: "0px", color: "#fff" }}>
              <h4>{image.title}</h4>
              <p>{image.time}</p>
            </div>
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
        style={{ ...style, display: "block", zIndex: "100" }}
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
        style={{ ...style, display: "block", zIndex: "100" }}
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
    <div className="container ">
      <div className="row mt-4 mb-4 marketing-categories-section">
        <div className="d-flex justify-content-between ">
          <h6>Reading Materials</h6>
          {/* <button className="rfh-basic-button" onClick={showModal}>
            <GoPlus size={20} /> Add
          </button> */}
        </div>

        {/* <div className="row mt-3">
          <Slider {...sliderSettings}>
            {imageData.map((image) => renderImageCard(image))}
          </Slider>
        </div> */}
        <div className="d-flex  justify-content-center readig-material-coming-soon">
               <img src={image1} alt="" />
               
        </div>
        <div className="readig-material-coming-soon">
        <h4>Coming Soon....</h4>
        </div>
      </div>
      {/* <AddReadingMaterials open={isModalOpen} handleCancel={handleCancel} /> */}
    </div>
  );
};

export default EducationCategoriesReadingMaterials;
