import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import Frame1 from "../../../Assets/Images/Frame1.png";
import Frame2 from "../../../Assets/Images/Frame2.png";
import Frame3 from "../../../Assets/Images/Frame3.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddTreatmentsInfo from "./AddTreatmentsInfo";

const EducationCategoriesTreatmentsInfo = () => {

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const imageData = [
    {
      id: 1,
      title: "Gastritis",
      time: "1 hours ago",
      image: Frame1,
    },
    {
      id: 2,
      title: "Peptic Ulcers",
      time: "1 hours ago",
      image: Frame2,
    },
    {
      id: 3,
      title: "Stomach",
      time: "1 hours ago",
      image: Frame3,
    },
  ];

  const renderImageCard = (image) => (
    <div className="col-lg-4" key={image.id}>
      <div
        className="recommend-video-card p-3"
        style={{
          backgroundImage: `url(${image.image})`,
        }}
      >
        <div>
          <div className="d-flex justify-content-between mb-2 w-100">
            <div style={{ position: "absolute", bottom: "0px" }}>
              <h4>{image.title}</h4>
              <p>{image.time}</p>
            </div>
          </div>
          {/* <button className="edit-video-button">Edit</button> */}
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
          <h6>Treatments Info</h6>
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
      <AddTreatmentsInfo  open={isModalOpen} handleCancel={handleCancel} />
    </div>
  );
};

export default EducationCategoriesTreatmentsInfo;
