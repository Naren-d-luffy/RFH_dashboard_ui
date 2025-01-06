import React, { useEffect, useState } from "react";
import "./auth.css";
import logo from "../../Assets/Images/logo.png";
import { useNavigate } from "react-router-dom";
import { Form, Spin, Carousel, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import login1 from "../../Assets/Images/login-1.png";
import login2 from "../../Assets/Images/login-5.png";
import login3 from "../../Assets/Images/login-2.png";
import login4 from "../../Assets/Images/login-4.png";
import { InputOTP } from "antd-input-otp";
import { Instance } from "../../AxiosConfig";
import { showErrorMessage, showSuccessMessage } from "../../globalConstant";
import { useLocation } from "react-router-dom";
const CustomDot = ({ active }) => (
  <span className={`dot ${active ? "active" : ""}`}></span>
);

const OtpScreen = () => {
  const [otpCode, setOtpCode] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const sliderItems = [
    {
      image: login1,
      title: "Welcome to RFH Hospital",
      text: "At Sir H. N. Reliance Foundation Hospital, we understand that emergencies require immediate attention and efficient care. Our hospital management app is designed to ensure you receive prompt and effective assistance during critical times.",
    },
    {
      image: login2,
      title: "Gastro Science Info",
      text: "Gastrointestinal (GI) health involves the well-being of the digestive system, including organs like the esophagus, stomach, intestines, liver, pancreas, and gallbladder. It is crucial for nutrient absorption, waste elimination, and immune function.",
    },
    {
      image: login3,
      title: "See Latest Appointments",
      text: "Easily manage your schedule with our intuitive tool. View and organize your upcoming appointments with detailed info at a glance. Schedule new appointments quickly and receive instant confirmations and reminders to stay on track.",
    },
    {
      image: login4,
      title: "Updates Latest News",
      text: "Stay updated with RFH Hospital by regularly checking their website and social media for the latest news and announcements. Subscribe to their newsletter for direct updates, and explore health news websites for additional information.",
    },
  ];

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOtpChange = (value) => {
    setOtpCode(value);
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      const response = await Instance.post("/admin/sendForgotPasswordOtp", { email });
        if(response.status===200|| response.status===201){
            message.success("otp has been sent to your registered email")
        }
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
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await Instance.post("admin/validateotp", {
        otp: otpCode.join(""),
        email,
      });
      showSuccessMessage(response.data.message)
      navigate("/confirm-password", { state: { email } });
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("error",error.response)
        showErrorMessage(
          error.response || "An error occurred. Please try again."
        );
      } else {
        showErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
      }
    }
    setLoading(false);
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
              <p className="login--p">
                Welcome to Institute of Gastro Sciences
              </p>
              <h1 className="signup-title">OTP Verification</h1>
              <p>Enter Otp Code sent to abc@gmial.com</p>
            </center>
             
            <Form layout="vertical">
              <Form.Item  name="otp">
                <InputOTP className="otp-input-group" inputType="numeric"   value={otpCode}
                  onChange={handleOtpChange} />
              </Form.Item>

              <div className="resend-info">
                <p>
                  Didn’t get OTP?{" "}
                  {resendTimer > 0 ? (
                    <span>Resend in {resendTimer} seconds</span>
                  ) : (
                    <span className="resend-link" onClick={handleResend}>
                      Resend Code
                    </span>
                  )}
                </p>
              </div>
              <button
                type="button"
                className="login-button"
                onClick={handleSubmit}
              >
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
                  "Verify & Proceed"
                )}
              </button>
            </Form>
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

export default OtpScreen;
