
import React, { useEffect, useState } from "react";
import "./auth.css";
import logo from "../../Assets/Images/logo.png";
import {  Link, useNavigate } from "react-router-dom";
import { message, Spin, Carousel } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import login1 from "../../Assets/Images/login-1.png";
import login2 from "../../Assets/Images/login-5.png";
import login3 from "../../Assets/Images/login-2.png";
import login4 from "../../Assets/Images/login-4.png";
import { Instance } from "../../AxiosConfig";
import { showErrorMessage } from "../../globalConstant";

const CustomDot = ({ active }) => (
  <span className={`dot ${active ? "active" : ""}`}></span>
);

const Register = () => {
     
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sliderItems = [
    {
      image: login1,
      title:"Welcome to RFH Hospital",
      text: "At Sir H. N. Reliance Foundation Hospital, we understand that emergencies require immediate attention and efficient care. Our hospital management app is designed to ensure you receive prompt and effective assistance during critical times.",
    },

    {
      image: login2,
      title:"Gastro Science Info",
      text: "Gastrointestinal (GI) health involves the well-being of the digestive system, including organs like the esophagus, stomach, intestines, liver, pancreas, and gallbladder. It is crucial for nutrient absorption, waste elimination, and immune function.",
    },
    {
      image: login3,
      title:"See Latest Appointments",
      text: "Easily manage your schedule with our intuitive tool. View and organize your upcoming appointments with detailed info at a glance. Schedule new appointments quickly and receive instant confirmations and reminders to stay on track.",
    },
    {
      image: login4,
      title:"Updates Latest News",
      text: "Stay updated with RFH Hospital by regularly checking their website and social media for the latest news and announcements. Subscribe to their newsletter for direct updates, and explore health news websites for additional information.",
    },
  ];

  const handleContinue = async () => {
    if (!email) {
      setEmailError("Please enter your email address.");
      showErrorMessage("Please enter your email address.");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      showErrorMessage("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const response = await Instance.post("admin/sendotp", { email });
      setResponseMessage(response.data);
      navigate("/signup-otp", { state: { email } });
    } catch (error) {
      console.error("Error during form submission:", error);
      if (error.response && error.response.data) {
        showErrorMessage(error.response.data.error || "An error occurred. Please try again.");
      } else {
        showErrorMessage("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="login-container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 col-sm-12 col-md-12 login-form">
            <center>
              <img
                src={logo}
                alt="Reliance Foundation Hospital"
                className="logo"
              />
            </center>
            <p className="login--p">Welcome to Institute of Gastro sciences</p>
            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="login-button" onClick={handleContinue}>
              {loading ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{ fontSize: 24, color: "#00963f" }}
                      spin
                    />
                  }
                />
              ) : (
                "Continue"
              )}
            </button>
            <p className="login-link">
              Already have an account? <Link to="/">Login In</Link>
            </p>
           
          </div>
          <div className="col-lg-6 col-sm-0 col-md-0 login-image">
            <Carousel
              autoplay
              dots={{ className: "custom-dots" }}
              customPaging={(i) => <CustomDot />}
              autoplaySpeed={2000}
              effect="fade"
            >
              {sliderItems.map((item, index) => (
                <div key={index} style={{ padding: "0px" }}>
                  <img src={item.image} alt={`Slide ${index + 1}`} />
                  <div className="image-overlay">
                    <h1>{item.title}</h1>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
