import React from "react";
import { Table, Dropdown, Button, Space, Input } from "antd";
import { FiSearch, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { showDeleteMessage } from "../../../globalConstant"

const PatientAcquisitionTable = () => {

  const handleDelete = (name) => {
    showDeleteMessage({ message: name });
  };
  const navigate = useNavigate();

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
      className: "campaign-performance-table-column",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      className: "campaign-performance-table-column",
    },
    {
      title: "Consult type",
      dataIndex: "consultType",
      key: "consultType",
      className: "campaign-performance-table-column",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      className: "campaign-performance-table-column",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      className: "campaign-performance-table-column",
    },
    {
      title: "Last Visit",
      dataIndex: "lastVisit",
      key: "lastVisit",
      className: "campaign-performance-table-column",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color = status === "Active" ? "green" : "red";
        return (
          <span
            className="campaign-performance-table-status"
            style={{ color, fontWeight: "bold" }}
          >
            {status}
          </span>
        );
      },
      className: "campaign-performance-table-column",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="campaign-performance-table-action-icons">
          <div
            className="campaign-performance-table-eye-icon"
            onClick={() => navigate(`/marketing/patient-acquisition/patient-detail`)}
            style={{ cursor: "pointer" }}
          >
            <FiEye />
          </div>
          <div className="campaign-performance-table-edit-icon">
            <FiEdit />
          </div>
          <div className="campaign-performance-table-delete-icon"  onClick={() => handleDelete(record.patientName)}>
            <FiTrash2
              style={{ cursor: "pointer" }}
            />
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
      date: "22-11-2024",
      consultType: "Online",
      age: "22",
      gender: "Male",
      lastVisit: "22-10-2024",
      status: "Active",
    },
    {
      key: "2",
      patientId: "390",
      patientName: "Chandan P",
      date: "22-11-2024",
      consultType: "Offline",
      age: "44",
      gender: "Male",
      lastVisit: "09-10-2024",
      status: "Inactive",
    },
    {
      key: "3",
      patientId: "250",
      patientName: "Harish D",
      date: "22-11-2024",
      consultType: "Online",
      age: "32",
      gender: "Male",
      lastVisit: "02-10-2024",
      status: "Active",
    },
    {
      key: "4",
      patientId: "100",
      patientName: "Shravya V",
      date: "22-11-2024",
      consultType: "Offline",
      age: "26",
      gender: "Female",
      lastVisit: "09-09-2024",
      status: "Active",
    },
    {
      key: "5",
      patientId: "50",
      patientName: "Mahesh G",
      date: "22-11-2024",
      consultType: "Offline",
      age: "28",
      gender: "Male",
      lastVisit: "22-08-2024",
      status: "Active",
    },
  ];

  const items = [
    { label: "Last Day", key: "1" },
    { label: "Last Week", key: "2" },
    { label: "Last Month", key: "3" },
  ];

  const handleMenuClick = ({ key }) => { };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="container mt-4">
      <div className="campaign-performance-table-head">
        <div className="d-flex flex-lg-row flex-xl-row flex-column justify-content-between align-items-center">
          <h6>All Patient Table</h6>
          <div className="d-flex gap-3 align-items-center">
            <div
              className="d-flex align-items-center px-3"
              style={{
                border: "1px solid var(--border-color)",
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
    </div>
  );
};

export default PatientAcquisitionTable;

