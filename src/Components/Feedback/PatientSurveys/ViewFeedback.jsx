import { Avatar, Progress, Rate, Tag } from "antd";
import React from "react";
import { FaAngleLeft, FaArrowTrendUp, FaStar } from "react-icons/fa6";
import image1 from "../../../Assets/Images/DefaultUser.png";
import { useNavigate } from "react-router-dom";
export const ViewFeedBack = () => {
    const handleClick=()=>{
        navigate("/feedback/patient-surveys")
    }
    const ratingData = [
        { stars: 5, count: 4000, color: "#28a745" },
        { stars: 4, count: 2500, color: "#e39bf8" },
        { stars: 3, count: 2000, color: "#ffca28" },
        { stars: 2, count: 500, color: "#42a5f5" },
        { stars: 1, count: 20, color: "#ff5722" },
    ];

    const reviews = [
        {
            id: 1,
            name: "Charan CC",
            role: "Graphic Designer",
            avatar: image1,
            rating: 4,
            comment:
                "I couldn't be happier with the services provided by Justin Law. They were professional, knowledgeable, and truly went above and beyond to help me with my case. I highly recommend them to anyone in need of legal assistance.",
            timeAgo: "1 day ago",
        },
        {
            id: 2,
            name: "Charan CC",
            role: "Content__Writer      ",
            avatar: image1,
            rating: 5,
            comment:
                "Excellent service! The team was very responsive and helped me through every step of the process.",
            timeAgo: "2 days ago",
        },
        {
            id: 3,
            name: "Charan CC",
            role: "Software Engineer",
            avatar: image1,
            rating: 3,
            comment: "The experience was good, but there were some delays in the process.",
            timeAgo: "3 days ago",
        },
    ];

    const maxCount = Math.max(...ratingData.map((data) => data.count));

    const renderReviews = () => {
        return reviews.map((review) => (
            <div key={review.id} className="row mb-4">
                <div className="col-lg-12 view-feedback-content">
                    <div className="d-flex gap-2">
                        <Avatar src={review.avatar} size={40} />
                        <div>
                            <h4>{review.name}</h4>
                            <p>{review.role}</p>
                        </div>
                        <ul>
                            <li>{review.timeAgo}</li>
                        </ul>
                    </div>
                    <Rate disabled defaultValue={review.rating} />
                    <h3>{`"${review.comment}"`}</h3>
                </div>
            </div>
        ));
    };

    const navigate = useNavigate();
    return (
        <div className="view-feedback-section">
            <div className="container">
                <h2>Reviews</h2>
                <div className="row my-4 pb-2 view-reviews-header-div" style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <div className="col-lg-4">
                        <div className="user-feedback-reviews">
                            <h4>Total Reviews</h4>
                            <div className="d-flex gap-2">
                                <h2>10.0K</h2>
                                <div>
                                    <Tag className="view-feedback-tag">
                                        42% <FaArrowTrendUp />
                                    </Tag>
                                </div>
                            </div>
                            <p>Growth in reviews on this year</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="user-feedback-reviews">
                            <h4>Average Rating</h4>
                            <div className="d-flex gap-2">
                                <h2>4.0</h2>
                                <Rate disabled defaultValue={4} />
                            </div>
                            <p>Average rating on this year</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="rating-distribution-container">
                            {ratingData.map((item, index) => (
                                <div key={index} className="feedback-rating-row">
                                    <div className="feedback-rating-star">
                                        <FaStar className="feedback-star-icon" />
                                        <span>{item.stars}</span>
                                    </div>
                                    <Progress
                                        percent={(item.count / maxCount) * 100}
                                        showInfo={false}
                                        strokeColor={item.color}
                                        trailColor="#e9ecef"
                                        className="feedback-progress"
                                    />
                                    <div className="feedback-rating-count">
                                        <span>
                                            {item.count >= 1000 ? `${item.count / 1000}k` : item.count}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {renderReviews()}

                <button className="d-flex gap-2 align-items-center export-button" onClick={handleClick}>
                        <FaAngleLeft />
                        Back
                    </button>
            </div>
        </div>
    );
};
