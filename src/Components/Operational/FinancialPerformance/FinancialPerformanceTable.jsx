import React from "react";
import { Table, Input, Button, Dropdown, Space } from "antd";
import { FiSearch } from "react-icons/fi";
import image from "../../../Assets/Images/image.png";
import { VscSettings } from "react-icons/vsc";

const FinancialPerformanceTable = () => {
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

            <Dropdown menu={{ items: [{ label: "Filter", key: "1" }] }}>
              <Button>
                <Space>
                  <VscSettings />
                  Filter
                </Space>
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
