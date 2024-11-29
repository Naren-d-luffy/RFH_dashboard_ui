import React from "react";
import { FiSearch } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";
import { GoPlus } from "react-icons/go";
import { Button, Dropdown, Space } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import medicines from "../../../Assets/Images/medicines.png";
import fruits from "../../../Assets/Images/fruits.png";
import appointment from "../../../Assets/Images/appointment.png";
import videoImage1 from "../../../Assets/Images/recommendVideo1.png";
import videoImage2 from "../../../Assets/Images/recommendVideo2.jpeg"
import program1 from "../../../Assets/Images/program1.png"
import program2 from "../../../Assets/Images/program2.png"
import { FaPlay } from "react-icons/fa";
export const FeaturedPrograms = () => {
  const items = [
    { label: "Last Day", key: "1" },
    { label: "Last Week", key: "2" },
    { label: "Last Month", key: "3" },
  ];
  const handleMenuClick = ({ key }) => {};

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const eventData = [
    {
      img: program1,
      title: "Gut Microbiome",
      date: "Nov 25",
      description: "Ongoing research is focusing on the gut microbiome's role in various gastrointestinal diseases",
      department: "Gastroscience Department",
    },
    {
      img: program2,
      title: "Gut Microbiome",
      date: "Nov 26",
      description: "Ongoing research is focusing on the gut microbiome's role in various gastrointestinal diseases",
      department: "Healthcare Services",
    },
    {
      img: program1,
      title: "Gut Microbiome",
      date: "Nov 27",
      description: "Ongoing research is focusing on the gut microbiome's role in various gastrointestinal diseases",
      department: "Nutrition Department",
    },
  ];

  const videoData = [
    {
      key: 1,
      video: medicines,
      authorName: "Ravi Kumar",
      view: "10K",
      time: "1 hour",
      background:videoImage1
    },
    {
      key: 2,
      video: medicines,
      authorName: "Ravi Kumar",
      view: "10K",
      time: "1 hour",
      background:videoImage2
    },
    {
      key: 3,
      video: medicines,
      authorName: "Ravi Kumar",
      view: "10K",
      time: "1 hour",
      background:videoImage1
    },
  ];

  const renderEventCard = (event) => (
    <div className="col-lg-4">
      <div className="feature-program-card" key={event.title}>
        <div className="d-flex justify-content-center align-items-center mb-3">
          <img src={event.img} alt={event.title} />
        </div>
        <div className="p-3">
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
  const renderLatestCamps = (camp) => (
    <div className="col-lg-4">
  <div className="recommend-video-card p-3"  style={{
        backgroundImage: `url(${camp.background})`}}>
            
      
    <div>
      <div className="d-flex justify-content-between mb-2 w-100">
        <div style={{ position: "absolute", bottom: "0px" }}>
          <h4>{camp.authorName}</h4>
          <p>{`${camp.view} views  | ${camp.time} ago`}</p>
        </div>
      </div>
      <button className="edit-video-button">Edit</button>
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
            <button className="rfh-basic-button">
              <GoPlus size={20} /> Add Program
            </button>
          </div>
          <div className="mt-4">
            <Slider {...sliderSettings}>
              {eventData.map((event) => renderEventCard(event))}
            </Slider>
          </div>
        </div>

        {/* recommended videos */}
        <div className="row mt-4">
          <div className="d-flex justify-content-between">
            <h6>Latest Camps</h6>
            <button className="rfh-basic-button">
              <GoPlus size={20} /> Add Camp
            </button>
          </div>
          <div className="mt-4">
            <Slider {...sliderSettings}>
              {videoData.map((camp) => renderLatestCamps(camp))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};
