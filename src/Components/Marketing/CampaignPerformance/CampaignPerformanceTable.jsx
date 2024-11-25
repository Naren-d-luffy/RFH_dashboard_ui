import React from "react";
import { Table, Button, Tag } from "antd";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";

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
          <Tag
            className="campaign-performance-table-status"
            style={{
              backgroundColor: color,
              color: "white",
              borderRadius: "5px",
            }}
          >
            {status}
          </Tag>
        );
      },
      className: "campaign-performance-table-column",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="campaign-performance-table-action-buttons">
          <Button
            type="text"
            icon={<FiEye />}
            className="campaign-performance-table-icon"
          />
          <Button
            type="text"
            icon={<FiEdit />}
            className="campaign-performance-table-icon"
          />
          <Button
            type="text"
            icon={<FiTrash2 />}
            className="campaign-performance-table-icon"
          />
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

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between ">
        <div>
          <h6>Campaign Performance Table</h6>
        </div>
        <div>
        <input
          type="text"
          placeholder="Search anything here"
          className="campaign-performance-table-search"
        />
        <Button className="campaign-performance-table-filter-button">
          Filter
        </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        className="campaign-performance-table"
        bordered={false}
      />
    </div>
  );
};

export default CampaignPerformanceTable;
