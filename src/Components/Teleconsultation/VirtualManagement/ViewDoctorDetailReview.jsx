import React, { useRef, useState } from "react";
import { Avatar } from "antd";
import { PiStarFill } from "react-icons/pi";
import image from "../../../Assets/Images/image.png";

const reviews = [
  {
    name: "Siddu M",
    company: "Smartbrain Tech",
    rating: 4.5,
    review:
      "I highly recommend this hospital for anyone seeking top-notch medical care. They truly prioritize patient health and satisfaction!",
  },
  {
    name: "Kiran",
    company: "Corporate Agency",
    rating: 4.5,
    review:
      "The facilities are state-of-the-art, and the environment is clean and calming. Dr. John Smith, the cardiologist, is exceptional.",
  },
  {
    name: "Navan",
    company: "CompanyX",
    rating: 4.5,
    review:
      "The hospital staff was incredibly kind and attentive. The treatment plan was explained thoroughly, and I felt well cared for.",
  },
  {
    name: "Megha S",
    company: "TechCorp",
    rating: 4.5,
    review:
      "This hospital has a great atmosphere and very supportive staff. I appreciate their commitment to patient care!",
  },
];

const ViewDoctorDetailReview = () => {

  const scrollRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);

  const handleScroll = () => {
    const container = scrollRef.current;
    const cardWidth = container.firstChild.offsetWidth; 
    const scrollPosition = container.scrollLeft;

    const currentIndex = Math.round(scrollPosition / cardWidth);
    setActiveCard(currentIndex);
  };

  return (
    <div className="mt-3">
      <h3 className="view-doctor-detail-review-heading">Review</h3>
      <div
        className="view-doctor-detail-review-cards-container"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {reviews.map((review, index) => (
          <div key={index} className="view-doctor-detail-review-card">
            <div className="d-flex gap-3">
              <Avatar size={54} src={image} />
              <div className="view-doctor-detail-card-header-info">
                <h4>{review.name}</h4>
                <p>{review.company}</p>
                <p>
                  {review.rating}{" "}
                  <PiStarFill color="var(--yellow-color)" size={18} />
                </p>
              </div>
            </div>
            <p className="view-doctor-detail-review-text">{review.review}</p>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-3 gap-3">
        {reviews.map((_, index) => (
          <div
            key={index}
            className={`view-doctor-detail-slider-line ${
              index === activeCard ? "active" : ""
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ViewDoctorDetailReview;
