import React, { useState } from "react";
import { Table, Input, Button, Dropdown } from "antd";
import { FiSearch } from "react-icons/fi";
import image from "../../../Assets/Images/image.png";
import { VscSettings } from "react-icons/vsc";
import {filterDropdown} from "../../../globalConstant"

const FinancialPerformanceTable = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const columns = [
    {
      title: "Payment ID",
      dataIndex: "paymentId",
      key: "paymenttId",
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
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      className: "campaign-performance-table-column",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      className: "campaign-performance-table-column",
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
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
      paymentId: "Pay-1001",
      patientName: "Saikiran K",
      amount: "₹23,000",
      date: "22-11-2024",
      method: "Credit",
      consultType: "Virtual",
      status: "Completed",
    },
    {
      key: "2",
      paymentId: "Pay-1002",
      patientName: "Chandan P",
      amount: "₹15,000",
      date: "22-11-2024",
      method: "Debit",
      consultType: "Direct",
      status: "Failed",
    },
    {
      key: "3",
      paymentId: "Pay-1003",
      patientName: "Shravya V",
      amount: "₹5,000",
      date: "22-11-2024",
      method: "UPI",
      consultType: "Virtual",
      status: "Completed",
    },
    {
      key: "4",
      paymentId: "Pay-1004",
      patientName: "Nandini G",
      amount: "₹3,000",
      date: "22-11-2024",
      method: "UPI",
      consultType: "Virtual",
      status: "Completed",
    },
    {
      key: "5",
      paymentId: "Pay-1005",
      patientName: "Mahesh G",
      amount: "₹3,000",
      date: "22-11-2024",
      method: "UPI",
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
    <div className="mt-3">
      <div className="campaign-performance-table-head">
        <div className="d-flex justify-content-between align-items-center">
          <h6>Payment Details</h6>
          <div className="d-flex gap-3 align-items-center">
            <div
              className="d-flex align-items-center px-3"
              style={{
                border: "1px solid #ccc",
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

export default FinancialPerformanceTable;
