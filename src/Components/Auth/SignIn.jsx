import React, { useEffect, useState } from "react";
import "./auth.css";
import logo from "../../Assets/Images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { message, Spin, Carousel } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Instance, loginInstance } from "../../AxiosConfig";
import login1 from "../../Assets/Images/login-1.png";
import login2 from "../../Assets/Images/login-5.png";
import login3 from "../../Assets/Images/login-2.png";
import login4 from "../../Assets/Images/login-4.png";
import { showErrorMessage, showSuccessMessage } from "../../globalConstant";

const CustomDot = ({ active }) => (
  <span className={`dot ${active ? "active" : ""}`}></span>
);

const SignIn = () => {
     
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const loginUser = async (email, password) => {
    try {
      setLoading(true);
      const response = await Instance.post("/admin/login", {
        email,
        password,
      });
      console.log("Server response:", response);
      if (response.status === 200 && response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        const userInfo = {
          name: response.data.admin.name,
          email: response.data.admin.email,
          uid: response.data.admin._id,
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        showSuccessMessage(
            `Welcome, ${response.data.admin.name}!`,
            "You have successfully logged in."
          );
        navigate("/user-dashboards/user-aquisition");
      } else {
        showErrorMessage(response.data.error);
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error
      );
      showErrorMessage(error.response.data.error);
      
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    if (!email.match(emailRegex)) {
      message.error("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      message.error("Password must be at least 8 characters long.");
      return;
    }
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
    loginUser(email, password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

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
            <div className="form-group">
              <label htmlFor="password">Password*</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>
            </div>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
            <button className="login-button" onClick={handleLogin}>
              {loading ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{ fontSize: 24, color: "#fff" }}
                      spin
                    />
                  }
                />
              ) : (
                "Log In"
              )}
            </button>
            <p className="login-link">
              Do not have an account? <Link to="/register">Sign Up</Link>
            </p>
            <p className="terms">
              By Continuing you agree to Reliance Terms of Service and Privacy
              Policy
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

export default SignIn;
