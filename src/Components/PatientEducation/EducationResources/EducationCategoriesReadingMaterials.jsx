import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import Acidity from "../../../Assets/Images/Acidity.png";
import Jaundice from "../../../Assets/Images/Jaundice.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddReadingMaterials from "./AddReadingMaterials";
import { IoEllipsisVerticalSharp } from "react-icons/io5";

const EducationCategoriesReadingMaterials = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);


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

  const [activeQuestion, setActiveQuestion] = useState(null);
  const [showMenu, setShowMenu] = useState(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const renderImageCard = (image) => (
    <div className="col-lg-4" key={image.id}>
      <div
        className="recommend-image-card p-3"
        style={{
          backgroundImage: `url(${image.image})`,
        }}
      >
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-between mb-2 w-100">
            <div style={{ position: "absolute", bottom: "0px" }}>
              <h4>{image.title}</h4>
              <p>{image.time}</p>
            </div>
          </div>
          <div
            className="education-categories-faq-menu"
            onClick={toggleMenu}
            style={{ cursor: "pointer" }}
          >
            <IoEllipsisVerticalSharp size={20} />
            {showMenu && (
              <div className="education-categories-menu-options">
                <button>Edit</button>
                <button>Delete</button>
              </div>
            )}
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
    <div className="container ">
      <div className="row mt-4 marketing-categories-section">
        <div className="d-flex justify-content-between ">
          <h6>Reading Materials</h6>
          <button className="rfh-basic-button" onClick={showModal}>
            <GoPlus size={20} /> Add
          </button>
        </div>

        <div className="row mt-3">
          <Slider {...sliderSettings}>
            {imageData.map((image) => renderImageCard(image))}
          </Slider>
        </div>
      </div>
      <AddReadingMaterials open={isModalOpen} handleCancel={handleCancel} />
    </div>
  );
};

export default EducationCategoriesReadingMaterials;
