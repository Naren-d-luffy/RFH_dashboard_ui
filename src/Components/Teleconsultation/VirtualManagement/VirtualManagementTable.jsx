import React, { useState } from "react";
import { Table, Dropdown, Button, Input } from "antd";
import { FiSearch, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import image from "../../../Assets/Images/image.png";
import { showDeleteMessage } from "../../../globalConstant"
import {filterDropdown} from "../../../globalConstant"

const VirtualManagementTable = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const handleDelete = (name) => {
    showDeleteMessage({ message: name });
  };

  const columns = [
    {
      title: "Doctor ID",
      dataIndex: "doctorId",
      key: "doctorId",
      className: "campaign-performance-table-column",
    },
    {
      title: "Doctor Name",
      dataIndex: "doctorName",
      key: "doctorName",
      render: (text, record) => (
        <div className="d-flex align-items-center gap-2">
          <img
            src={image}
            alt="Doctor"
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
      title: "Specialization",
      dataIndex: "specialization",
      key: "specialization",
      className: "campaign-performance-table-column",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      className: "campaign-performance-table-column",
    },
    {
      title: "Appointment Completed",
      dataIndex: "appointments",
      key: "appointments",
      className: "campaign-performance-table-column",
    },
    {
      title: "Ratings",
      dataIndex: "ratings",
      key: "ratings",
      className: "campaign-performance-table-column",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color = status === "Active" ? "green" : "red";
        return <span style={{ color, fontWeight: "bold" }}>{status}</span>;
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
            onClick={() => navigate(`/teleconsultation/view-doctor-detail`)}
            style={{ cursor: "pointer" }}
          >
            <FiEye />
          </div>
          <div className="campaign-performance-table-edit-icon">
            <FiEdit />
          </div>
          <div className="campaign-performance-table-delete-icon"  onClick={() => handleDelete(record.doctorName)}>
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
      doctorId: "1001",
      doctorName: "Saikiran K",
      specialization: "Cardiology",
      gender: "Male",
      appointments: "300",
      ratings: "4.6/5",
      status: "Active",
    },
    {
      key: "2",
      doctorId: "390",
      doctorName: "Chandan P",
      specialization: "General Medicine",
      gender: "Male",
      appointments: "200",
      ratings: "4.8/5",
      status: "Inactive",
    },
    {
      key: "3",
      doctorId: "250",
      doctorName: "Shravya V",
      specialization: "Gastric",
      gender: "Male",
      appointments: "178",
      ratings: "4.3/5",
      status: "Active",
    },
    {
      key: "4",
      doctorId: "100",
      doctorName: "Harish D",
      specialization: "Gastric",
      gender: "Female",
      appointments: "342",
      ratings: "4.4/5",
      status: "Active",
    },
    {
      key: "5",
      doctorId: "50",
      doctorName: "Mahesh G",
      specialization: "Gastric",
      gender: "Male",
      appointments: "123",
      ratings: "4.8/5",
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
    <div className=" mt-4">
      <div className="campaign-performance-table-head">
        <div className="d-flex justify-content-between align-items-center">
          <h6>Doctor List</h6>
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

            <div>
              <button
                className="rfh-basic-button"
                onClick={() =>
                  navigate(`/teleconsultation/doctor-detail`)
                }
              >
                <GoPlus size={20} /> Add Doctor
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

export default VirtualManagementTable;
