import { Avatar, Dropdown } from "antd";
import React, {useState} from "react";
import { TbReportMedical } from "react-icons/tb";
import patient from "../../../Assets/Images/patient.png";
import doctor from "../../../Assets/Images/ladydoctor.png";
import { FiSearch } from "react-icons/fi";
import { RxGrid } from "react-icons/rx";
import { LuMenu } from "react-icons/lu";
import { AppoinmentDataList } from "./AppoinmentDataList";

const appointmentData = [
  {
    id: "#1001",
    patientName: "Raj",
    registrationDate: "12 Jan, 2024",
    email: "raj@example.com",
    mobile: "+91 9876543210",
    doctorName: "Dr. Ramya",
    consultationDateTime: "14 Jan, 2024 - 9:45 AM",
  },
  {
    id: "#1002",
    patientName: "Amit",
    registrationDate: "13 Jan, 2024",
    email: "amit@example.com",
    mobile: "+91 8765432109",
    doctorName: "Dr. Anil",
    consultationDateTime: "15 Jan, 2024 - 10:30 AM",
  },
  {
    id: "#1003",
    patientName: "Priya",
    registrationDate: "14 Jan, 2024",
    email: "priya@example.com",
    mobile: "+91 7654321098",
    doctorName: "Dr. Sunita",
    consultationDateTime: "16 Jan, 2024 - 11:15 AM",
  },
  {
    id: "#1004",
    patientName: "Raj",
    registrationDate: "12 Jan, 2024",
    email: "raj@example.com",
    mobile: "+91 9876543210",
    doctorName: "Dr. Ramya",
    consultationDateTime: "14 Jan, 2024 - 9:45 AM",
  },
  {
    id: "#1005",
    patientName: "Amit",
    registrationDate: "13 Jan, 2024",
    email: "amit@example.com",
    mobile: "+91 8765432109",
    doctorName: "Dr. Anil",
    consultationDateTime: "15 Jan, 2024 - 10:30 AM",
  },
  {
    id: "#1006",
    patientName: "Priya",
    registrationDate: "14 Jan, 2024",
    email: "priya@example.com",
    mobile: "+91 7654321098",
    doctorName: "Dr. Sunita",
    consultationDateTime: "16 Jan, 2024 - 11:15 AM",
  },
];

const VirtualConsult = () => {
  const [isTableView, setIsTableView] = useState(false);
  const handleTableViewToggle = () => {
    setIsTableView(true);
  };
  const handleGridViewToggle = () => {
    setIsTableView(false);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex mb-2 flex-lg-row flex-xl-row flex-column justify-content-end gap-4">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search anything here"
            className="search-input-table"
          />
        </div>
        <div className="search-table-container d-flex gap-4">
        <div
            onClick={handleGridViewToggle}
          >
            <RxGrid className={`d-flex align-items-center  ${
              !isTableView ? "appointment-active-icon" : "table-card-list"
            }`} />
          </div>
          <div
            onClick={handleTableViewToggle}
          >
            <LuMenu className={`d-flex align-items-center ${
              isTableView ? "appointment-active-icon" : "table-data-list"
            }`} />
          </div>
        </div>
      </div>
  
      {isTableView ? (
        <AppoinmentDataList />
      ) : (
        <div className="row">
          {appointmentData.map((appointment, index) => (
            <div className="col-lg-4" key={index}>
              <div className="appointment-cards mb-4">
                <div className="appointment-card-header d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-3 appointment-title align-items-center">
                    <div className="appointment-title-icon">
                      <TbReportMedical size={22} />
                    </div>
                    <h5>{appointment.id}</h5>
                  </div>
                  <button className="">Virtual Consult</button>
                </div>
                <hr />
                <div className="appointment-card-body">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center gap-2">
                      <Avatar size="large" src={patient} />
                      <div>
                        <h6 className="mb-1">Patient Name</h6>
                        <p className="mb-0">{appointment.patientName}</p>
                      </div>
                    </div>
                    <div>
                      <h6 className="mb-1">Date of Register</h6>
                      <p className="mb-0">{appointment.registrationDate}</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div>
                      <h6 className="mb-1">E-Mail</h6>
                      <p className="mb-0">{appointment.email}</p>
                    </div>
                    <div>
                      <h6 className="mb-1">Mobile No</h6>
                      <p className="mb-0">{appointment.mobile}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <Avatar size="large" src={doctor} />
                      <div>
                        <h6 className="mb-1">Doctor Name</h6>
                        <p className="mb-0">{appointment.doctorName}</p>
                      </div>
                    </div>
                    <div>
                      <h6 className="mb-1">Consulted Date & Time</h6>
                      <p className="mb-0">{appointment.consultationDateTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default VirtualConsult;
