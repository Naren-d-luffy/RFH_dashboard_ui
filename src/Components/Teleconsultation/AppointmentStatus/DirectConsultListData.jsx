
import React from "react";
import { Table, Avatar } from "antd";
import patientImage from "../../../Assets/Images/DefaultUser.png";
import doctorImage from "../../../Assets/Images/image.png";
import { useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";

export const DirectConsultListData = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: <span style={{ color: 'var(--input-gray-color)', fontSize: '14px', fontWeight: '600' }}>Patient ID</span>,
      dataIndex: "id",
      render: (id) => <span style={{ color: 'var(--text-black)', fontSize:"14px", fontWeight:600 }}>{id}</span>,
    },
    {
      title: <span style={{ color: 'var(--input-gray-color)', fontSize: '14px', fontWeight: '600' }}>Patient Name</span>,
      dataIndex: "patientName",
      render: (name) => (
        <div className="d-flex align-items-center">
          <Avatar src={patientImage} size={40} className="me-2" />
          <span style={{ color: 'var(--faq-ans-color)', fontSize:"14px", fontWeight:500 }}>{name}</span>
        </div>
      ),
    },
    {
      title: <span style={{ color: 'var(--input-gray-color)', fontSize: '14px', fontWeight: '600' }}>Registration Date</span>,
      dataIndex: "registrationDate",
      render: (date) => <span style={{ color: 'var(--text-black)', fontSize:"14px", fontWeight:600 }}>{date}</span>,
    },
    {
      title: <span style={{ color: 'var(--input-gray-color)', fontSize: '14px', fontWeight: '600' }}>Email ID</span>,
      dataIndex: "email",
      render: (email) => <span style={{ color: 'var(--text-black)', fontSize:"14px", fontWeight:600 }}>{email}</span>,
    },
    {
      title: <span style={{ color: 'var(--input-gray-color)', fontSize: '14px', fontWeight: '600' }}>Mobile No</span>,
      dataIndex: "mobile",
      render: (mobile) => <span style={{ color: 'var(--text-black)', fontSize:"14px", fontWeight:600 }}>{mobile}</span>,
    },
    {
      title: <span style={{ color: 'var(--input-gray-color)', fontSize: '14px', fontWeight: '600' }}>Doctor Name</span>,
      dataIndex: "doctorName",
      render: (name) => (
        <div className="d-flex align-items-center">
          <Avatar src={doctorImage} size={40} className="me-2" />
          <span style={{ color: 'var(--faq-ans-color)', fontSize:"14px", fontWeight:500 }}>{name}</span>
        </div>
      ),
    },
    {
      title: <span style={{ color: 'var(--input-gray-color)', fontSize: '14px', fontWeight: '600' }}>Consult Date & Time</span>,
      dataIndex: "consultationDateTime",
      render: (datetime) => <span style={{ color: 'var(--text-black)', fontSize:"14px", fontWeight:600 }}>{datetime}</span>,
    },
    {
      title: <span style={{ color: 'var(--input-gray-color)', fontSize: '14px', fontWeight: '600' }}>Action</span>,
      key: "action",
      render: () => (
        <div className="campaign-performance-table-action-icons">
          <div
            className="campaign-performance-table-eye-icon"
            onClick={() => navigate(`/teleconsultation/appointment-feedback`)}
            style={{ cursor: "pointer" }}
          >
            <FiEye />
          </div>
        </div>
      ),
      className: "campaign-performance-table-column",
    },
  ];
  

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
  ];

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="rfh-table-section">
          <Table
            columns={columns}
            dataSource={appointmentData}
            pagination={{ pageSize: 5 }}
            className="applied-applicants-table overflow-y-auto"
          />
        </div>
      </div>
    </div>
  );
};
