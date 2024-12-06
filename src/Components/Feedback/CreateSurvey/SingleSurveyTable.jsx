import React, { useState } from "react";
import { Table, Dropdown, Button, Space, Avatar, Input } from "antd";
import { FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import avatar_image from "../../../Assets/Images/DefaultUser.png";
import { showDeleteMessage } from "../../../globalConstant";
import { filterDropdown } from "../../../globalConstant"
import { VscSettings } from "react-icons/vsc";

const SingleSurveyTable = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/feedback/create-survey/populated-survey-data");
  };
  const handleDelete = (name) => {
    showDeleteMessage({ message: `${name}` });
  };

  const columns = [
    {
      title: "Survey Name",
      dataIndex: "surveyName",
      key: "surveyName",
      className: "campaign-performance-table-column",
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "campaign-performance-table-column",
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={avatar_image}
            size="small"
            alt="Avatar"
            style={{ marginRight: "8px", width: "38px", height: "auto" }}
          />
          {text}
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      className: "campaign-performance-table-column",
    },
    {
      title: "Email ID",
      dataIndex: "email",
      key: "email",
      className: "campaign-performance-table-column",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="campaign-performance-table-action-icons">
          <div
            className="campaign-performance-table-eye-icon"
            onClick={handleClick}
          >
            <FiEye />
          </div>
          <div
            className="campaign-performance-table-delete-icon"
            onClick={() => handleDelete(record.name)}
          >
            <FiTrash2 />
          </div>
        </div>
      ),
      className: "campaign-performance-table-column",
    },
  ];

  const data = [
    {
      key: "1",
      surveyName: "Healthy Habits Check-In",
      name: "Madhu",
      date: "24-11-2024",
      email: "black@company.com",
    },
    {
      key: "2",
      surveyName: "Healthy Habits Check-In",
      name: "Kumar",
      date: "24-11-2024",
      email: "black@company.com",
    },
    {
      key: "3",
      surveyName: "Healthy Habits Check-In",
      name: "Siddu M",
      date: "24-11-2024",
      email: "jone@business.com",
    },
    {
      key: "4",
      surveyName: "Healthy Habits Check-In",
      name: "Kiran B K",
      date: "24-11-2024",
      email: "jone.doe@example.com",
    },
    {
      key: "5",
      surveyName: "Healthy Habits Check-In",
      name: "Sankaran J",
      date: "24-11-2024",
      email: "contact@company.com",
    },
  ];

  const items = [
    {
      label: "Last Day",
      key: "1",
    },
    {
      label: "Last week",
      key: "2",
    },
    {
      label: "Last Month",
      key: "3",
    },
  ];
  const handleMenuClick = ({ key }) => { };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
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
    <div className=" mt-4">
      <div className="campaign-performance-table-head mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h6>Surveys</h6>
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
            <Dropdown menu={menuProps} overlayClassName="dropdown-hover-color">
              <Button>
                <Space>
                  Sort By
                  <BiSortAlt2 />
                </Space>
              </Button>
            </Dropdown>
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
      <div className="d-flex justify-content-start mt-2">
        <button
          className="d-flex gap-2 align-items-center rfh-basic-button"
          onClick={() => navigate("/feedback/create-survey")}
        >
          <FaAngleLeft />
          Back
        </button>
      </div>
    </div>
  );
};

export default SingleSurveyTable;
