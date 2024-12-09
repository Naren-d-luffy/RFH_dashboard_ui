import React, { useState } from "react";
import { Table, Button, Input, Dropdown } from "antd";
import { FiSearch, FiEdit, FiEye } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import image from "../../Assets/Images/image.png";
import { useNavigate } from "react-router-dom";
import { VscSettings } from "react-icons/vsc";
import { filterDropdown } from "../../globalConstant"


const MedicationTrackerFirstTable = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
      render: (text) => (
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
      title: "Action",
      key: "action",
      render: () => (
        <div className="campaign-performance-table-action-icons">
          <div
            className="campaign-performance-table-eye-icon"
            onClick={() => navigate(`/medication-tracker/patient-detail`)}
            style={{ cursor: "pointer" }}
          >
            <FiEye />
          </div>
          <div className="campaign-performance-table-edit-icon">
            <FiEdit />
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
      medication: "Metformin",
      dose: "500mg",
      frequency: "2x daily",
      nextDose: "08:00 PM",
    },
    {
      key: "2",
      patientId: "390",
      patientName: "Chandan P",
      date: "22-11-2024",
      medication: "Ibuprofen",
      dose: "200mg",
      frequency: "2x daily",
      nextDose: "07:30 PM",
    },
    {
      key: "3",
      patientId: "250",
      patientName: "Shravya V",
      date: "22-11-2024",
      medication: "Amoxicillin",
      dose: "200mg",
      frequency: "2x daily",
      nextDose: "Tomorrow 8 AM",
    },
    {
      key: "4",
      patientId: "100",
      patientName: "Nandini G",
      date: "22-11-2024",
      medication: "Ibuprofen",
      dose: "200mg",
      frequency: "2x daily",
      nextDose: "07:30 PM",
    },
    {
      key: "5",
      patientId: "50",
      patientName: "Mahesh G",
      date: "22-11-2024",
      medication: "Metformin",
      dose: "200mg",
      frequency: "2x daily",
      nextDose: "07:30 PM",
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
    console.log('Applied Filters:', selectedValues);
    setIsDropdownOpen(false);
  };
  const handleReset = () => {
    setSelectedValues([]);
  };
  const options = [
    {
      label: 'Type',
      options: [
        { label: 'All', value: 'all' },
        { label: 'OPD', value: 'opd' },
        { label: 'IPD', value: 'ipd' },
      ],
    },
    {
      label: 'Last Visit',
      options: [
        { label: 'Last 7 days', value: 'last7days' },
        { label: 'Last 30 days', value: 'last30days' },
      ],
    },
    {
      label: 'All Users',
      options: [
        { label: 'Active Users', value: 'activeusers' },
        { label: 'Inactive Users', value: 'inactiveusers' },
      ],
    },
  ];

  return (
    <div className="mt-4">
      <div className="campaign-performance-table-head">
        {/* <div className="d-flex justify-content-between align-items-center">
          <h6>Recent Patient's</h6>
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
            <div>
              <button
                className="rfh-basic-button"
                onClick={() => navigate(`/medication-tracker/add-patient-detail`)}
                style={{ cursor: "pointer" }}
              >
                <GoPlus size={20} /> Add Medication
              </button>
            </div>
          </div>
        </div> */}

        <div className="d-flex justify-content-between flex-lg-row flex-xl-row flex-column align-items-center">
          <h6>Recent Patient's</h6>
          <div className="d-flex gap-3 align-items-center flex-lg-row flex-xl-row flex-column align-items-center">
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
            <div className="d-flex gap-3 align-items-center">
              <Dropdown
                overlay={filterDropdown(options, selectedValues, handleCheckboxChange, handleApply, handleReset)}
                trigger={['click']}
                open={isDropdownOpen}
                onOpenChange={setIsDropdownOpen}
                placement="bottomLeft"
              >
                <Button style={{ width: 160 }}>
                  <VscSettings />
                  Filters
                </Button>
              </Dropdown>
              <button
                className="rfh-basic-button"
                onClick={() => navigate(`/medication-tracker/add-patient-detail`)}
                style={{ cursor: "pointer" }}
              >
                <GoPlus size={20} /> Add Medication
              </button>
            </div>
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

export default MedicationTrackerFirstTable;
