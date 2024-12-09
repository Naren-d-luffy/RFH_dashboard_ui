import React, { useState } from "react";
import { Table, Input, Button, Dropdown } from "antd";
import { FiSearch } from "react-icons/fi";
import image from "../../../Assets/Images/image.png";
import { VscSettings } from "react-icons/vsc";
import { filterDropdown } from "../../../globalConstant";

const ServiceUtilizationTable = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
  const handleCheckboxChange = (value, checked) => {
    if (checked) {
      setSelectedValues((prev) => [...prev, value]);
    } else {
      setSelectedValues((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleApply = () => {
    console.log("Applied Filters:", selectedValues);
    setIsDropdownOpen(false);
  };
  const handleReset = () => {
    setSelectedValues([]);
  };
  const options = [
    {
      label: "Type",
      options: [
        { label: "All", value: "all" },
        { label: "OPD", value: "opd" },
        { label: "IPD", value: "ipd" },
      ],
    },
    {
      label: "Last Visit",
      options: [
        { label: "Last 7 days", value: "last7days" },
        { label: "Last 30 days", value: "last30days" },
      ],
    },
    {
      label: "All Users",
      options: [
        { label: "Active Users", value: "activeusers" },
        { label: "Inactive Users", value: "inactiveusers" },
      ],
    },
  ];

  return (
    <div className="mt-3">
      <div className="campaign-performance-table-head">
        <div className="d-flex justify-content-between align-items-center">
          <h6>Patient Details</h6>
          <div className="d-flex gap-3 align-items-center">
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search anything here"
                className="search-input-table"
              />
            </div>
            <Dropdown
              overlay={filterDropdown(
                options,
                selectedValues,
                handleCheckboxChange,
                handleApply,
                handleReset
              )}
              trigger={["click"]}
              open={isDropdownOpen}
              onOpenChange={setIsDropdownOpen}
              placement="bottomLeft"
            >
              <Button style={{ width: 160 }}>
                <VscSettings />
                Filters
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
