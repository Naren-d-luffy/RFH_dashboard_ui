import React from "react";
import { Table, Dropdown, Button, Space, Avatar, Input, } from "antd";
import { FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";
import { LuFilter } from "react-icons/lu";
import avatar_image from "../../../Assets/Images/DefaultUser.png"
import { useNavigate } from "react-router-dom";
import { VscSettings } from "react-icons/vsc";
const PatientSurveysTable = () => {
  const navigate=useNavigate()
  const handleClick=()=>{
    navigate("/feedback/view-feedback")
  }
  const columns = [
    {
      title: "Patient Name",
      dataIndex: "patientname",
      key: "patientname",
      className: "campaign-performance-table-column",
    },

    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
      className: "campaign-performance-table-column",
      render: (feedback) => {
        // Define styles based on feedback value
        let style = {
          padding: "2px 12px",
          borderRadius: "16px",
        };

        if (feedback.toLowerCase() === "good") {
          style.background = "#F2F4F7";
          style.color = "var(--black-color)";
        } else if (feedback.toLowerCase() === "average") {
          style.background = "#F2F4F7";
          style.color = "var(--black-color)";
        }

        return <span style={style}>{feedback}</span>;
      },
    },
    {
      title: "Submission Date",
      dataIndex: "submissiondate",
      key: "submissiondate",
      className: "campaign-performance-table-column",
    },
    {
      title: "Survey Category",
      dataIndex: "surveycategory",
      key: "surveycategory",
      className: "campaign-performance-table-column",
    },
    {
      title: "About",
      dataIndex: "about",
      key: "about",
      className: "campaign-performance-table-column",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      className: "campaign-performance-table-column",
      render: (rating) => (
        <span>
          {rating} <span style={{ color: "#FFD700", fontSize: "16px" }}>★</span>
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="campaign-performance-table-action-icons">
          <div className="campaign-performance-table-eye-icon" >
            <FiEye onClick={handleClick}/>
          </div>
          <div className="campaign-performance-table-delete-icon" >
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
      patientname: "Charan ",
      feedback: "Average",
      submissiondate: "24-11-2024",
      surveycategory: "Doctor Interaction",
      about: "Overall clean but ...",
      rating: "3.5",
    },
    {
      key: "2",
      patientname: "Navaneethan M ",
      feedback: "Good",
      submissiondate: "25-11-2024",
      surveycategory: "Wait Time",
      about: "Very attentive and caring.",
      rating: "4.5",
    },
    {
      key: "3",
      patientname: "Kiran B K ",
      feedback: "Good",
      submissiondate: "27-11-2024",
      surveycategory: "Facility Cleanliness",
      about: "Staff was very helpful..",
      rating: "4.5",
    },
    {
      key: "4",
      patientname: "Madhu GG",
      feedback: "Average",
      submissiondate: "27-11-2024",
      surveycategory: "Wait Time",
      about: "Had to wait longer tha..",
      rating: "3.8",
    },
    {
      patientname: "Shankar N",
      feedback: "Good",
      submissiondate: "27-11-2024",
      surveycategory: "Overall Experience",
      about: "very good staff..",
      rating: "5.0",
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
            <Dropdown menu={menuProps}>
              <Button>
                <Space>
                 <VscSettings />
                   Filter
                </Space>
              </Button>
            </Dropdown>
            {/* <Dropdown menu={menuProps}>
              <Button>
                <Space>
                  Filter By
                  <LuFilter />
                </Space>
              </Button>
            </Dropdown> */}
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
  )
}

export default PatientSurveysTable
