import React, { useState } from "react";
import { Table, Dropdown, Button, Space, Input } from "antd";
import { FiEdit, FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";
import { GoPlus } from "react-icons/go";
import UserManagementAddPatientsModal from "./UserManagementAddPatientsModal";
import UserManagementViewPatientsModal from "./UserManagementViewPatientsModal";
import UserManagementEditPatientsModal from "./UserManagementEditPatientsModal";
import { showDeleteMessage } from "../../../globalConstant";
import { filterDropdown } from "../../../globalConstant";

const UserManagementTable = () => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDelete = (name) => {
    showDeleteMessage({ message: `this patient ${name}'s details` });
  };

  const showModal = () => {
    setIsCreateModalVisible(true);
  };

  const handleModalClose = () => {
    setIsCreateModalVisible(false);
  };
  const showViewModal = () => {
    setIsViewModalVisible(true);
  };

  const handleViewModalClose = () => {
    setIsViewModalVisible(false);
  };
  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalVisible(false);
  };

  const columns = [
    {
      title: "Patient Id",
      dataIndex: "id",
      key: "id",
      className: "campaign-performance-table-column",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "campaign-performance-table-column",
    },
    {
      title: "Consult Dr",
      dataIndex: "consultdr",
      key: "consultdr",
      className: "campaign-performance-table-column",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      className: "campaign-performance-table-column",
    },
    {
      title: "Diagnosis",
      dataIndex: "diagnosis",
      key: "diagnosis",
      className: "campaign-performance-table-column",
    },
    {
      title: "Dr Specialty",
      dataIndex: "drspecialty",
      key: "conversionRate",
      className: "campaign-performance-table-column",
    },
    {
      title: "Last Visit",
      dataIndex: "lastvisit",
      key: "lastvisit",
      className: "campaign-performance-table-column",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === "Active"
            ? "#0CBC53"
            : status === "Paused"
            ? "orange"
            : status === "Inactive"
            ? "#FB5757"
            : "blue";
        return (
          <span
            className="campaign-performance-table-status"
            style={{
              color: color,
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            {status}
          </span>
        );
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
            onClick={showViewModal}
          >
            <FiEye />
          </div>
          <div
            className="campaign-performance-table-edit-icon"
            onClick={showEditModal}
          >
            <FiEdit />
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
      id: "U121212",
      name: "Kiran",
      consultdr: "Dr. Sunil",
      type: "OPD",
      diagnosis: "Acidity",
      drspecialty: "Cardiology",
      lastvisit: "Nov12,2024",
      status: "Active",
    },
    {
      key: "2",
      id: "U10866",
      name: "Siddu M",
      consultdr: "Dr. Charan ",
      type: "OPD",
      diagnosis: "Jaundice",
      drspecialty: "General Care",
      lastvisit: "Nov12,2024",
      status: "Active",
    },
    {
      key: "3",
      id: "U10900",
      name: "Navaneetan J",
      consultdr: "Dr. Nagesh",
      type: "IPD",
      diagnosis: "Gas and Bloating",
      drspecialty: "Gastroenterology",
      lastvisit: "Nov12,2024",
      status: "Inactive",
    },
    {
      key: "4",
      id: "U10888",
      name: "Shree M",
      consultdr: "Dr. Madhu",
      type: "IPD",
      diagnosis: " Acute Pancreatitis",
      drspecialty: "Pediatrics",
      lastvisit: "Nov12,2024",
      status: "Inactive",
    },
    {
      key: "5",
      id: "U10888",
      name: "Nandini M",
      consultdr: "Dr. Manju G",
      type: "IPD",
      diagnosis: "Infective Colitis",
      drspecialty: "Orthopedic",
      lastvisit: "Nov12,2024",
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
  const handleMenuClick = ({ key }) => {};
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="container mt-4">
      <div className="campaign-performance-table-head">
        <div className="d-flex justify-content-between flex-lg-row flex-xl-row flex-column align-items-center">
          <h6>Patients List</h6>
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
            <button className="rfh-basic-button" onClick={showModal}>
              <GoPlus size={20} /> Add Patients
            </button>
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
      <UserManagementAddPatientsModal
        visible={isCreateModalVisible}
        onClose={handleModalClose}
      />
      <UserManagementViewPatientsModal
        visible={isViewModalVisible}
        onClose={handleViewModalClose}
      />
      <UserManagementEditPatientsModal
        visible={isEditModalVisible}
        onClose={handleEditModalClose}
      />
    </div>
  );
};

export default UserManagementTable;
