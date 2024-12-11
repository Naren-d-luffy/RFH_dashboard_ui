import React, { useState } from "react";
import { Table, Dropdown, Button, Input } from "antd";
import { FiSearch } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";
import { filterDropdown } from "../../../globalConstant"

const PatientDetailsTable = () => {
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
      status: "Active",
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

export default PatientDetailsTable;
