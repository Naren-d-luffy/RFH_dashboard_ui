import React, { useState } from "react";
import { Table, Dropdown, Button, Input, Avatar } from "antd";
import { FiEye, FiSearch } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";
import defaultUser from "../../../Assets/Images/DefaultUser.png";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { PatientReport } from "./PatientReport";
import { filterDropdown } from "../../../globalConstant";

export const RecentPatientsList = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    <div className="mt-2">
      <div className="campaign-performance-table-head">
        <div className="d-lg-flex justify-content-between align-items-center">
          <h6>Recent Patients</h6>

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
      <PatientReport
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </div>
  );
};
