import React from "react";
import { Avatar } from "antd";
import { IoIosArrowBack, IoMdTime } from "react-icons/io";
import { PiPhoneCallFill } from "react-icons/pi";
import { TbMailFilled } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
import Doctor from "../../../Assets/Images/Doctor.png";
import Work1 from "../../../Assets/Images/Work1.png";
import Work2 from "../../../Assets/Images/Work2.png";
import ViewDoctorDetailCards from "./ViewDoctorDetailCards";
import ViewDoctorDetailGraph from "./ViewDoctorDetailGraph";
import ViewDoctorDetailReview from "./ViewDoctorDetailReview";
import { useNavigate } from "react-router-dom";

const ViewDoctorDetail = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <div className="doctor-detail-page">
            <div className="view-doctor-detail-doctor-card">
              <div className="view-doctor-detail-doctor-image">
                <Avatar
                  size={74}
                  src={Doctor}
                  className="view-doctor-profile-image"
                />
              </div>
              <div className="view-doctor-detail-info-section">
                <h3>Dr. Saikiran K</h3>
                <p className="view-doctor-detail-status">
                  <span>RHF 1001</span>
                  <span className="between-line"></span>
                  <span className="view-doctor-detail-availability">
                    <IoMdTime /> Available
                  </span>
                </p>
              </div>
              <hr color="var(--border-color)" />
              <div className="view-doctor-detail-specialist-section">
                <h3>Specialist</h3>
                <p>Cardiology</p>
                <h3 className="mt-3">About</h3>
                <p>
                  Dr. John Smith is a highly skilled cardiologist with over 15
                  years of experience in diagnosing and treating cardiovascular
                  diseases. He specializes in preventive cardiology,
                  interventional procedures, and managing complex heart
                  conditions.
                </p>
              </div>
              <hr />
              <div className="view-doctor-detail-contact-info">
                <p>
                  <PiPhoneCallFill
                    className="view-doctor-detail-contact-icon mb-2"
                    size={25}
                  />{" "}
                  +91 8448440277
                </p>
                <p>
                  <TbMailFilled
                    className="view-doctor-detail-contact-icon mb-2"
                    size={25}
                  />{" "}
                  mailto:saikirank@gmail.com
                </p>
                <p>
                  <IoLocationSharp
                    className="view-doctor-detail-contact-icon"
                    size={25}
                  />{" "}
                  House No 21/8, 123 Main Street, Mumbai
                </p>
              </div>
              <hr />
              <div className="view-doctor-detail-work-experience">
                <h3>Work Experience</h3>
                <div className="d-flex gap-2">
                  <div>
                    <Avatar shape="square" size="large" src={Work1} />
                  </div>
                  <div>
                    <h6>Senior Cardiologist</h6>
                    <p>Raja Ram Mohan Roy Rd, Girgaon, Mumbai, 400004</p>
                    <div className="d-flex gap-2 align-items-center">
                      <p>Full Time</p>
                      <span className="status-circle-list"></span>
                      <p> 2019 - Present</p>
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-2 mt-2">
                  <div>
                    <Avatar shape="square" size="large" src={Work2} />
                  </div>
                  <div>
                    <h6>Senior Cardiologist</h6>
                    <p>HeartCare Clinic, New York, NY</p>

                    <div className="d-flex gap-2 align-items-center">
                      <p>Full Time</p>
                      <span className="status-circle-list"></span>
                      <p> 2005 - 2018</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div>
            <ViewDoctorDetailCards />
          </div>
          <div>
            <ViewDoctorDetailGraph />
          </div>
          <div>
            <ViewDoctorDetailReview />
          </div>
        </div>
      </div>
      <div>
        <button
          className="rfh-basic-button mt-5"
          onClick={() => navigate("/teleconsultation/virtual-management")}
        >
          <IoIosArrowBack />
          Back
        </button>
      </div>
    </div>
  );
};

export default ViewDoctorDetail;
