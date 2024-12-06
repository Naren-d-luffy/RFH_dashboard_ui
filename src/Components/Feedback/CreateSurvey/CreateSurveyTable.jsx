import React, { useState } from "react";
import { Table, Dropdown, Button, Space, Input } from "antd";
import { FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";
import { LuFilter } from "react-icons/lu";
import { FeedbackCreateSurveyCard } from "./FeedbackCreateSurveyCard";
import { FaPlus } from "react-icons/fa6";
import Empty_survey_image from "../../../Assets/Icons/Empty_survey_image.png";
import CreateSurveyPage from "./CreateSurveyPage";
import { useNavigate } from "react-router-dom";
import { showDeleteMessage } from "../../../globalConstant";

const CreateSurveyTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleClick = () => {
    navigate("/feedback/create-survey/single-survey-details");
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
      title: "Date",
      dataIndex: "date",
      key: "date",
      className: "campaign-performance-table-column",
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      className: "campaign-performance-table-column",
    },
    {
      title: "Responses",
      dataIndex: "responses",
      key: "responses",
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
            onClick={handleClick}
          >
            <FiEye />
          </div>
          <div
            className="campaign-performance-table-delete-icon"
            onClick={() => handleDelete(record.surveyName)}
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
      date: "24-11-2024",
      url: "https://docs.google.com/forms/",
      responses: "100",
      status: "Active",
    },
    {
      key: "2",
      surveyName: "Care Quality Feedback Loop",
      date: "24-11-2024",
      url: "https://docs.google.com/forms/",
      responses: "24",
      status: "Active",
    },
    {
      key: "3",
      surveyName: "Patient Insights Hub",
      date: "24-11-2024",
      url: "https://docs.google.com/forms/",
      responses: "78",
      status: "Inactive",
    },
    {
      key: "4",
      surveyName: "Patient Pulse Survey",
      date: "24-11-2024",
      url: "https://docs.google.com/forms/",
      responses: "88",
      status: "Inactive",
    },
    {
      key: "5",
      surveyName: "Feedback for Future Care",
      date: "24-11-2024",
      url: "https://docs.google.com/forms/",
      responses: "89",
      status: "Active",
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
    <div className="container mt-1">
      {data.length > 0 ? (
        <>
          <FeedbackCreateSurveyCard />
          <div className="campaign-performance-table-head mt-4">
            <div className="d-flex justify-content-between flex-lg-row flex-xl-row flex-column align-items-center">
              <h6>Surveys</h6>
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
                <div className="d-flex gap-3 align-items-center">
                  <Dropdown menu={menuProps}>
                    <Button>
                      <Space>
                        Sort By
                        <BiSortAlt2 />
                      </Space>
                    </Button>
                  </Dropdown>
                  <Dropdown menu={menuProps}>
                    <Button>
                      <Space>
                        <LuFilter />
                        Filter
                      </Space>
                    </Button>
                  </Dropdown>
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
          {/* <UserManagementAddPatientsModal
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
      /> */}
        </>
      ) : (
        <div className="container">
          <div className="no-data-container">
            <img src={Empty_survey_image} alt="" />
          </div>
          <div className="no-data-container-text d-flex flex-column justify-content-center">
            <h4>No Surveys Found</h4>
            <p>
              Currently, there are no surveys available to display.
              <br /> Please check back later or contact support for further
              assistance if this is an error
            </p>
            <div className="d-flex justify-content-center">
              <button className="rfh-basic-button" onClick={showModal}>
                <FaPlus /> Create Surveys
              </button>
            </div>
          </div>
          <CreateSurveyPage visible={isModalVisible} onClose={handleCancel} />
        </div>
      )}
    </div>
  );
};

export default CreateSurveyTable;
