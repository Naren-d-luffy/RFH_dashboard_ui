import React from "react";
import { Table, Input, Dropdown, Space, Button } from "antd";
import { FiSearch } from "react-icons/fi";
import image from "../../Assets/Images/image.png";
import { VscSettings } from "react-icons/vsc";

const PatientDetailTable = () => {
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
      title: "Date",
      dataIndex: "date",
      key: "date",
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
      title: "Next Dose",
      dataIndex: "nextDose",
      key: "nextDose",
      className: "campaign-performance-table-column",
    },
    {
      title: "Missed Doses",
      dataIndex: "missedDoses",
      key: "missedDoses",
      className: "campaign-performance-table-column",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: status === "Completed" ? "green" : "red" }}>
          {status}
        </span>
      ),
      className: "campaign-performance-table-column",
    },
    {
      title: "Missed Date",
      dataIndex: "missedDate",
      key: "missedDate",
      className: "campaign-performance-table-column",
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

  const data = [
    {
      key: "1",
      patientId: "1001",
      patientName: "Saikiran K",
      date: "22-11-2024",
      medication: "Metformin",
      dose: "500mg",
      frequency: "2x daily",
      nextDose: "08:00 PM",
      missedDoses: 0,
      status: "Completed",
      missedDate: "22-11-2024",
    },
    {
      key: "2",
      patientId: "390",
      patientName: "Saikiran K",
      date: "22-11-2024",
      medication: "Ibuprofen",
      dose: "200mg",
      frequency: "2x daily",
      nextDose: "07:30 PM",
      missedDoses: 0,
      status: "Completed",
      missedDate: "22-11-2024",
    },
    {
      key: "3",
      patientId: "250",
      patientName: "Saikiran K",
      date: "22-11-2024",
      medication: "Amoxicillin",
      dose: "200mg",
      frequency: "2x daily",
      nextDose: "Tomorrow 8 AM",
      missedDoses: 1,
      status: "Missed",
      missedDate: "22-11-2024",
    },
    {
      key: "4",
      patientId: "100",
      patientName: "Saikiran K",
      date: "22-11-2024",
      medication: "Ibuprofen",
      dose: "200mg",
      frequency: "2x daily",
      nextDose: "07:30 PM",
      missedDoses: 0,
      status: "Completed",
      missedDate: "22-11-2024",
    },
    {
      key: "5",
      patientId: "50",
      patientName: "Saikiran K",
      date: "22-11-2024",
      medication: "Metformin",
      dose: "200mg",
      frequency: "2x daily",
      nextDose: "07:30 PM",
      missedDoses: 0,
      status: "Completed",
      missedDate: "22-11-2024",
    },
  ];

  return (
    <div className="mt-4">
      <div className="campaign-performance-table-head">
        <div className="d-flex justify-content-between align-items-center">
          <h6>Medication Details</h6>
          <div className="d-flex gap-3 align-items-center">
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search anything here"
                className="search-input-table"
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

export default PatientDetailTable;
