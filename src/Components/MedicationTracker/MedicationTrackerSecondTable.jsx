import React from "react";
import { Table, Button, Input, Dropdown, Space } from "antd";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import image from "../../Assets/Images/image.png";
import { VscSettings } from "react-icons/vsc";

const MedicationTrackerSecondTable = () => {
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
          <span>{record.patientName}</span>
        </div>
      ),
      className: "campaign-performance-table-column",
    },
    {
      title: "Medication",
      dataIndex: "medication",
      key: "medication",
      className: "campaign-performance-table-column",
    },
    {
      title: "Dose",
      dataIndex: "dose",
      key: "dose",
      className: "campaign-performance-table-column",
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      className: "campaign-performance-table-column",
    },
    {
      title: "Refill Date",
      dataIndex: "refillDate",
      key: "refillDate",
      className: "campaign-performance-table-column",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: status === "Yes" ? "green" : "red" }}>
          {status}
        </span>
      ),
      className: "campaign-performance-table-column",
    },
    {
      title: "Reminder",
      key: "reminder",
      render: () => (
        <button className="medication-tracker-second-table-button">Remind</button>
      ),
      className: "campaign-performance-table-column",
    },
  ];

  const data = [
    {
      key: "1",
      patientId: "1001",
      patientName: "Saikiran K",
      medication: "Metformin",
      dose: "500mg",
      frequency: "2x daily",
      refillDate: "18-Nov-2024",
      status: "Yes",
    },
    {
      key: "2",
      patientId: "390",
      patientName: "Chandan P",
      medication: "Ibuprofen",
      dose: "200mg",
      frequency: "2x daily",
      refillDate: "20-Nov-2024",
      status: "No",
    },
    {
      key: "3",
      patientId: "250",
      patientName: "Shravya V",
      medication: "Amoxicillin",
      dose: "200mg",
      frequency: "2x daily",
      refillDate: "18-Nov-2024",
      status: "Yes",
    },
    {
      key: "4",
      patientId: "100",
      patientName: "Nandini G",
      medication: "Ibuprofen",
      dose: "200mg",
      frequency: "2x daily",
      refillDate: "19-Nov-2024",
      status: "Yes",
    },
    {
      key: "5",
      patientId: "50",
      patientName: "Mahesh G",
      medication: "Metformin",
      dose: "200mg",
      frequency: "2x daily",
      refillDate: "18-Nov-2024",
      status: "Yes",
    },
  ];

  const items = [
    { label: "Last Day", key: "1" },
    { label: "Last Week", key: "2" },
    { label: "Last Month", key: "3" },
  ];

  const handleMenuClick = ({ key }) => {};

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="mt-4">
      <div className="campaign-performance-table-head">
        <div className="d-flex justify-content-between align-items-center">
          <h6>Refill Reminders</h6>
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

export default MedicationTrackerSecondTable;
