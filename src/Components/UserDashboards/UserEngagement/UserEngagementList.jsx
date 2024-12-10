import React, { useState } from "react";
import { Table, Dropdown, Button, Input } from "antd";
import { FiSearch } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";
import { filterDropdown } from "../../../globalConstant"


export const UserEngagementList = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email ID",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Avg Time",
      dataIndex: "avgTime",
      key: "avgTime",
    },
    {
      title: "Top Feature",
      dataIndex: "topFeature",
      key: "topFeature",
    },
    {
      title: "Last Active",
      dataIndex: "lastActive",
      key: "lastActive",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color = status === "Active" ? "#0CBC53" : "#FB5757";
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
  ];

  const data = [
    {
      key: "1",
      userId: "U1212",
      name: "Kiran Bk",
      email: "KiranB@gmail.com",
      gender: "Male",
      avgTime: "12min",
      topFeature: "Appointment Booking",
      lastActive: "Nov 12, 2024",
      status: "Active",
    },
    {
      key: "2",
      userId: "U1086",
      name: "Siddu M",
      email: "SidduM@gmail.com",
      gender: "Male",
      avgTime: "5min",
      topFeature: "Educational Video",
      lastActive: "Nov 12, 2024",
      status: "Active",
    },
    {
      key: "3",
      userId: "U1090",
      name: "Navaneethan J",
      email: "NavneethJ@gmail.com",
      gender: "Male",
      avgTime: "8min",
      topFeature: "Symptom Checker",
      lastActive: "Nov 12, 2024",
      status: "Inactive",
    },
    {
      key: "4",
      userId: "U0888",
      name: "Shree",
      email: "Shree.k@gmail.com",
      gender: "Female",
      avgTime: "13min",
      topFeature: "Latest News",
      lastActive: "Nov 12, 2024",
      status: "Active",
    },
    {
      key: "5",
      userId: "U0556",
      name: "Nandini G",
      email: "NandiniG@gmail.com",
      gender: "Female",
      avgTime: "8min",
      topFeature: "Marketing Portal",
      lastActive: "Nov 12, 2024",
      status: "Inactive",
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
      label: 'Time frame',
      options: [
        { label: 'Last 7 days', value: 'last7days' },
        { label: 'Last 30 days', value: 'last30days' },
      ],
    },
    {
      label: 'User Type',
      options: [
        { label: 'Active Users', value: 'activeusers' },
        { label: 'Inactive Users', value: 'inactiveusers' },
      ],
    },
  ];

  return (
    <div className="mt-2">
      <div className="campaign-performance-table-head">
        <div className="d-lg-flex justify-content-between align-items-center">
          <h6>User Engagement List</h6>

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
