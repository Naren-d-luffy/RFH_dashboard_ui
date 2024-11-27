import React from "react";
import { Table, Dropdown, Button, Space,} from "antd";
import { FiEdit, FiEye, FiFilter, FiSearch, FiTrash2 } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";

const CampaignPerformanceTable = () => {
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
      render: () => (
        <div className="campaign-performance-table-action-icons">
          <div className="campaign-performance-table-eye-icon">
            <FiEye />
          </div>
          <div className="campaign-performance-table-edit-icon">
            <FiEdit />
          </div>
          <div className="campaign-performance-table-delete-icon">
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
        <div className="d-flex justify-content-between align-items-center">
          <h6>Campaign Performance Table</h6>

          <div className="d-flex gap-3 align-items-center">
            <div
              className="d-flex align-items-center px-3"
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                height: "33px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <FiSearch style={{ color: "#888", marginRight: "10px" }} />
              <input
                type="text"
                placeholder="Search anything here"
                style={{
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
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
