import React, { useState } from "react";
import { Table, Button, Dropdown } from "antd";
import { FiSearch } from "react-icons/fi";
import image from "../../Assets/Images/image.png";
import { VscSettings } from "react-icons/vsc";
import { showSuccessMessage } from "../../globalConstant";
import { filterDropdown } from "../../globalConstant";

const MedicationTrackerSecondTable = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleClick = () => {
    showSuccessMessage("Successfully Sent Reminder", "");
  };
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
        <button
          className="medication-tracker-second-table-button"
          onClick={handleClick}
        >
          Remind
        </button>
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
    <div className="mt-4">
      <div className="campaign-performance-table-head">
        <div className="d-flex justify-content-between align-items-center flex-column flex-sm-row">
          <h6>Refill Reminders</h6>
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

export default MedicationTrackerSecondTable;
