import React, { useState } from "react";
import { Table, Dropdown, Button, Space, Input, Avatar } from "antd";
import { FiEye, FiSearch } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";
import defaultUser from "../../../Assets/Images/DefaultUser.png";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { PatientReport } from "./PatientReport";
export const RecentPatientsList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = [
    {
      title: "Patient ID",
      dataIndex: "patientId",
      key: "patientId",
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
      render: (name, record) => (
        <div className="d-flex align-items-center">
          <Avatar src={defaultUser} size={24} /> &nbsp; &nbsp;
          <span>{name}</span>
        </div>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Phone No",
      dataIndex: "phoneNo",
      key: "phoneNo",
    },
    {
      title: "Consult Type",
      dataIndex: "consultType",
      key: "consultType",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color = status === "Close" ? "#E61313" : "var(--primary-green)";
        return (
          <span
            style={{
              color: color,
            }}
          >
            {status}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="campaign-performance-table-action-icons">
          <div
            className="campaign-performance-table-eye-icon"
            onClick={() => setIsModalVisible(true)}
          >
            <FiEye />
          </div>
          <div className="campaign-performance-table-edit-icon">
            <IoCloudDownloadOutline />
          </div>
        </div>
      ),
      className: "campaign-performance-table-column",
    },
  ];

  const data = [
    {
      key: "1",
      patientId: "1001",
      patientName: "Saikiran K",
      image: "https://via.placeholder.com/32",
      gender: "Male",
      date: "22-11-2024",
      phoneNo: "8080808080",
      consultType: "Virtual",
      status: "In-Process",
    },
    {
      key: "2",
      patientId: "390",
      patientName: "Chandan P",
      image: "https://via.placeholder.com/32",
      gender: "Male",
      date: "22-11-2024",
      phoneNo: "8080808080",
      consultType: "Direct",
      status: "Close",
    },
    {
      key: "3",
      patientId: "250",
      patientName: "Shravya V",
      image: "https://via.placeholder.com/32",
      gender: "Female",
      date: "22-11-2024",
      phoneNo: "8080808080",
      consultType: "Virtual",
      status: "Active",
    },
    {
      key: "4",
      patientId: "100",
      patientName: "Nandini G",
      image: "https://via.placeholder.com/32",
      gender: "Female",
      date: "22-11-2024",
      phoneNo: "8080808080",
      consultType: "Virtual",
      status: "Active",
    },
    {
      key: "5",
      patientId: "30",
      patientName: "Mahesh G",
      image: "https://via.placeholder.com/32",
      gender: "Male",
      date: "22-11-2024",
      phoneNo: "8080808080",
      consultType: "Direct",
      status: "Close",
    },
  ];

  const items = [
    {
      label: "Last Day",
      key: "1",
    },
    {
      label: "Last Week",
      key: "2",
    },
    {
      label: "Last Month",
      key: "3",
    },
  ];

  const handleMenuClick = ({ key }) => {};
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="mt-2">
      <div className="campaign-performance-table-head">
        <div className="d-lg-flex justify-content-between align-items-center">
          <h6>Recent Patients</h6>

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

            <Dropdown menu={menuProps}>
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
      <PatientReport
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </div>
  );
};
