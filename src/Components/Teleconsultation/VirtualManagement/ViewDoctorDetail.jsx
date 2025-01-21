import React, { useEffect, useState } from "react";
import { Avatar } from "antd";
import {Instance} from "../../../AxiosConfig";
import { IoIosArrowBack, IoMdTime } from "react-icons/io";
import { PiPhoneCallFill } from "react-icons/pi";
import { TbMailFilled } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import ViewDoctorDetailCards from "./ViewDoctorDetailCards";
import ViewDoctorDetailGraph from "./ViewDoctorDetailGraph";
import ViewDoctorDetailReview from "./ViewDoctorDetailReview";

const ViewDoctorDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [doctor, setDoctor] = useState(state || null);

  useEffect(() => {
    // If no data in state, fetch doctor details using record._id
    if (!doctor) {
      const fetchDoctorDetails = async () => {
        try {
          const response = await Instance.get(`/doctor/${state._id}`);
          if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
          }
          const text = await response.text(); // Get response as plain text
          console.log("Response text:", text);
          const data = JSON.parse(text); // Parse JSON manually
          setDoctor(data);
        } catch (error) {
          console.error("Error fetching doctor details:", error);
        }
      };      
      fetchDoctorDetails();
    }
  }, [doctor, state]);

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <div className="doctor-detail-page">
            <div className="view-doctor-detail-doctor-card">
             <div className="view-doctor-detail-doctor-image">
                <Avatar
                  siz e={74}
                  src={doctor.image || "/default-doctor.png"} // Default image fallback
                  className="view-doctor-profile-image"
                />
              </div>
              <div className="view-doctor-detail-info-section">
                <h3>{doctor.name}</h3>
                <p className="view-doctor-detail-status">
                  <span>{doctor._id}</span>
                  <span className="between-line"></span>
                  <span className="view-doctor-detail-availability">
                    <IoMdTime /> {doctor.availableTime || "Unavailable"}
                  </span>
                </p>
              </div>
              <hr color="var(--border-color)" />
              <div className="view-doctor-detail-specialist-section">
                <h3>Specialist</h3>
                <p>{doctor.specialty}</p>
                <h3 className="mt-3">About</h3>
                <p>{doctor.content}</p>
              </div>
              <hr />
              <div className="view-doctor-detail-contact-info">
                <p>
                  <PiPhoneCallFill
                    className="view-doctor-detail-contact-icon mb-2"
                    size={25}
                  />{" "}
                  {doctor.phoneNumber}
                </p>
                <p>
                  <TbMailFilled
                    className="view-doctor-detail-contact-icon mb-2"
                    size={25}
                  />{" "}
                  {doctor.email}
                </p>
                <p>
                  <IoLocationSharp
                    className="view-doctor-detail-contact-icon"
                    size={25}
                  />{" "}
                  {doctor.location}
                </p>
              </div>
              <hr />
              {/* <div className="view-doctor-detail-work-experience">
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
              </div> */}
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div>
            <ViewDoctorDetailCards doctor={doctor} />
          </div>
          <div>
            <ViewDoctorDetailGraph doctor={doctor} />
          </div>
          <div>
            <ViewDoctorDetailReview reviews={doctor.reviews} />
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
