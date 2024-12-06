import React, { useState } from "react";
import { Table, Dropdown, Button, Input, } from "antd";
import { FiEdit, FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";
import { showDeleteMessage } from "../../../globalConstant"
import { filterDropdown } from "../../../globalConstant"

const CampaignPerformanceTable = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDelete = (name) => {
    showDeleteMessage({ message: `${name}` });
  };
  const columns = [
    {
      title: "Campaign Name",
      dataIndex: "name",
      key: "name",
      className: "campaign-performance-table-column",
    },
    {
      title: "Impressions",
      dataIndex: "impressions",
      key: "impressions",
      className: "campaign-performance-table-column",
    },
    {
      title: "Clicks",
      dataIndex: "clicks",
      key: "clicks",
      className: "campaign-performance-table-column",
    },
    {
      title: "CTR (%)",
      dataIndex: "ctr",
      key: "ctr",
      className: "campaign-performance-table-column",
    },
    {
      title: "Conversions",
      dataIndex: "conversions",
      key: "conversions",
      className: "campaign-performance-table-column",
    },
    {
      title: "Conversion Rate (%)",
      dataIndex: "conversionRate",
      key: "conversionRate",
      className: "campaign-performance-table-column",
    },
    {
      title: "CPC (₹)",
      dataIndex: "cpc",
      key: "cpc",
      className: "campaign-performance-table-column",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === "Active"
            ? "green"
            : status === "Paused"
              ? "orange"
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
          <div className="campaign-performance-table-eye-icon">
            <FiEye />
          </div>
          <div className="campaign-performance-table-edit-icon">
            <FiEdit />
          </div>
          <div className="campaign-performance-table-delete-icon" onClick={() => handleDelete(record.name)}>
            <FiTrash2 />
          </div>
        </div>
      ),
      className: "campaign-performance-table-column",
    }
  ];

  const data = [
    {
      key: "1",
      name: "Campaign A",
      impressions: "50,000",
      clicks: "5,000",
      ctr: "10.0",
      conversions: "500",
      conversionRate: "10.0",
      cpc: "2.00",
      status: "Active",
    },
    {
      key: "2",
      name: "Campaign B",
      impressions: "30,000",
      clicks: "2,700",
      ctr: "9.0",
      conversions: "390",
      conversionRate: "11.1",
      cpc: "3.50",
      status: "Paused",
    },
    {
      key: "3",
      name: "Campaign C",
      impressions: "20,000",
      clicks: "1,800",
      ctr: "9.0",
      conversions: "250",
      conversionRate: "8.3",
      cpc: "3.00",
      status: "Completed",
    },
    {
      key: "4",
      name: "Campaign D",
      impressions: "15,000",
      clicks: "1,800",
      ctr: "9.0",
      conversions: "100",
      conversionRate: "8.3",
      cpc: "4.40",
      status: "Active",
    },
    {
      key: "5",
      name: "Campaign E",
      impressions: "15,000",
      clicks: "1,000",
      ctr: "10.0",
      conversions: "50",
      conversionRate: "5.0",
      cpc: "3.25",
      status: "Completed",
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
    <div className="container mt-4">
      <div className="campaign-performance-table-head">
        <div className="d-flex flex-lg-row flex-xl-row flex-column justify-content-between align-items-center">
          <h6>Campaign Performance Table</h6>
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

export default CampaignPerformanceTable;
