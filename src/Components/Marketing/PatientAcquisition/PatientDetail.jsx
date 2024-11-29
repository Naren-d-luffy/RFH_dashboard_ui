import React from "react";
import { Avatar } from "antd";
import image from "../../../Assets/Images/image.png";
import PatientDetailsTable from "./PatientDetailsTable";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const PatientDetail = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container mt-3">
        <div className="row ">
          <div className="d-flex gap-3 align-items-center col-lg-4">
            <Avatar size={64} src={image} />
            <div className="patient-detail-head-text align-items-center">
              <h6>Sai Kiran</h6>
              <p>kiran@gmail.com</p>
            </div>
          </div>
          <div className="patient-detail-personal-information-text col-lg-4">
            <h6>PERSONAL INFORMATION</h6>
            <div className="d-flex gap-3">
              <p>Contact Number</p>
              <p>+91 89898989898</p>
            </div>
            <div className="d-flex gap-3">
              <p>Gender</p>
              <p>Male</p>
            </div>
            <div className="d-flex gap-3">
              <p>Date Of Birth</p>
              <p>1 Jan, 1999</p>
            </div>
            <div className="d-flex gap-3">
              <p>Member Since</p>
              <p>17 March, 2024</p>
            </div>
          </div>
          <div className="patient-detail-address-text col-lg-4">
            <h6>ADDRESS</h6>
            <p>345 W. 2nd street. HSR, Bengluru 560090</p>
            <div className="d-flex gap-3 align-items-center">
              <div>
                <h5>23</h5>
                <h6>Total visited</h6>
              </div>
              <div>
                <h5>20</h5>
                <h6>Completed</h6>
              </div>
              <div>
                <h5>3</h5>
                <h6>Cancelled</h6>
              </div>
            </div>
          </div>
        </div>

        <div>
        <PatientDetailsTable />
      </div>
      <div >
          <button className="rfh-basic-button mt-5"
            onClick={() =>
              navigate("/marketing/patientacquisition")
            }
          >
            <IoIosArrowBack />
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default PatientDetail;
