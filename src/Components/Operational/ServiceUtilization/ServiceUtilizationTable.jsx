import React from "react";
import { Table, Input, Button, Dropdown, Space } from "antd";
import { FiSearch } from "react-icons/fi";
import image from "../../../Assets/Images/image.png"; // Adjust path if needed
import { VscSettings } from "react-icons/vsc";

const ServiceUtilizationTable = () => {
  const columns = [
    {
      title: "Patient ID",
      dataIndex: "patientId",
      key: "patientId",
      className: "campaign-performance-table-column",
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
      render: (text, record) => (
        <div className="d-flex align-items-center gap-2">
          <img
            src={image}
            alt="Patient"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span>{text}</span>
        </div>
      ),
      className: "campaign-performance-table-column",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      className: "campaign-performance-table-column",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      className: "campaign-performance-table-column",
    },
    {
      title: "Clinics",
      dataIndex: "clinics",
      key: "clinics",
      className: "campaign-performance-table-column",
    },
    {
      title: "Consult Type",
      dataIndex: "consultType",
      key: "consultType",
      className: "campaign-performance-table-column",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color = status === "Completed" ? "green" : "red";
        return (
          <span
            className="campaign-performance-table-status"
            style={{
              color: color,
              fontWeight: "bold",
            }}
          >
            {status}
          </span>
        );
      },
      className: "campaign-performance-table-column",
    },
  ];

  const data = [
    {
      key: "1",
      patientId: "#RFH001",
      patientName: "Saikiran K",
      gender: "Male",
      date: "22-11-2024",
      clinics: "IPD",
      consultType: "Virtual",
      status: "Completed",
    },
    {
      key: "2",
      patientId: "#RFH001",
      patientName: "Chandan P",
      gender: "Male",
      date: "22-11-2024",
      clinics: "IPD",
      consultType: "Direct",
      status: "Failed",
    },
    {
      key: "3",
      patientId: "#RFH001",
      patientName: "Shravya V",
      gender: "Female",
      date: "22-11-2024",
      clinics: "IPD",
      consultType: "Virtual",
      status: "Completed",
    },
    {
      key: "4",
      patientId: "#RFH001",
      patientName: "Nandini G",
      gender: "Female",
      date: "22-11-2024",
      clinics: "OPD",
      consultType: "Virtual",
      status: "Completed",
    },
    {
      key: "5",
      patientId: "#RFH001",
      patientName: "Mahesh G",
      gender: "Male",
      date: "22-11-2024",
      clinics: "OPD",
      consultType: "Direct",
      status: "Failed",
    },
  ];

  return (
    <div className="mt-3">
      <div className="campaign-performance-table-head">
        <div className="d-flex justify-content-between align-items-center">
          <h6>Patient Details</h6>
          <div className="d-flex gap-3 align-items-center">
            <div
              className="d-flex align-items-center px-3"
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                height: "33px",
              }}
            >
              <FiSearch style={{ color: "#888", marginRight: "10px" }} />
              <Input
                type="text"
                placeholder="Search anything here"
                style={{
                  border: "none",
                  outline: "none",
                }}
              />
            </div>

            <Dropdown menu={{ items: [{ label: "Filter", key: "1" }] }}>
              <Button>
                <Space>
                  <VscSettings />
                  Filter
                </Space>
              </Button>
            </Dropdown>
          </div>
        </div>
        <div className="mt-3">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            className="campaign-performance-table overflow-y-auto"
            bordered={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceUtilizationTable;
