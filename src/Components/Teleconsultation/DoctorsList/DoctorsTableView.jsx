import React, { useEffect, useMemo, useState } from "react";
import { Table, Dropdown, Button, Space, Avatar } from "antd";
import { FiEdit, FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import Empty_survey_image from "../../../Assets/Icons/Empty_survey_image.png";
import { GoPlus } from "react-icons/go";
import Loader from "../../../Loader";
import axios from "axios";
import image1 from "../../../Assets/Images/singleuser.png";

const DoctorsTableView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewNewsModalOpen, setIsViewNewsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState({ content: [] });
  const [totalRows, setTotalRows] = useState(0);
  const [searchText, setSearchText] = useState("");

  const itemsPerPage = 10;

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showEditModal = (news) => {
    setSelectedNews(news);
    setIsEditModalOpen(true);
  };
  const handleCancelEditModal = () => {
    setSelectedNews(null);
    setIsEditModalOpen(false);
  };

  const ShowNewsModal = (news) => {
    setSelectedNews(news);
    setIsViewNewsModalOpen(true);
  };
  const handleCancelNewsModal = () => {
    setSelectedNews(null);
    setIsViewNewsModalOpen(false);
  };

  const fetchDoctorList = async () => {
    try {
      // Step 1: Fetch Bearer Token
      const tokenResponse = await axios.post(
        "https://apigwrfhppd.ril.com/oauth/1.0.0/oauth2/token",
        {
          grant_type: "client_credentials",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic UlpFS0pEY2ZFT2h5MUptdDNLNndmR1RLX2djYTpuOWpqTHQxR2RMcG0wVTJzVkN4WkNJa3BXUEVh",
          },
        }
      );

      const gwToken = tokenResponse.data.access_token;
      console.log("gw Token:", gwToken);

      // Step 2: Use Bearer Token to Get gw-token
      const gwTokenResponse = await axios.post(
        "https://apigwrfhppd.ril.com/MAT/1.0.0/API/Employee/userValidate",
        { loginSource: "external" },
        {
          headers: {
            Authorization: `Bearer ${gwToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const token = gwTokenResponse.data.token;
      console.log("GW Token:", token);

      // Step 3: Pass Both Tokens to the Final API
      const finalResponse = await axios.get(
        "https://apigwrfhppd.ril.com/RFH_SPECIALIZATION_DEPT_MHC/1.0.0/API/Specialization/GetPatientPortalDisplayWeb/12/44",
        {
          headers: {
            Authorization: token,
            "gw-token": `Bearer ${gwToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const gastroenterologyDetails = finalResponse.data.data.filter(
        (item) => item.specialityName === "GASTROENTEROLOGY"
      );

      console.log("Gastroenterology Details:", gastroenterologyDetails);
      const doctorDetails = gastroenterologyDetails.flatMap((specialty) =>
        specialty.doctors_in_speciality.map((doctor) => ({
          doctorId: doctor.doctorId,
          doctorName: doctor.doctorName,
          designation: doctor.designation,
          profile: doctor.profileImage,
          email: doctor.amEmployeeEmailId,
          mobile: doctor.amEmployeeMobileNo,
        }))
      );

      console.log("Doctor Details:", doctorDetails);
      setDoctorDetails(doctorDetails);
    } catch (error) {
      console.error("Error in the workflow:", error);
    }
  };
  useEffect(() => {
    fetchDoctorList();
  }, []);
  const dataSource = useMemo(() => {
    if (searchText.trim() === "") return doctorDetails;
    return doctorDetails.filter((doctorDetail) =>
      `${doctorDetail.doctorId}{}${doctorDetail.doctorName}{}${doctorDetail.designation}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [searchText, doctorDetails]);

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  const columns = [
    {
      title: "Doctor Id",
      dataIndex: "doctorId",
      className: "campaign-performance-table-column",
    },
    {
      title: "Doctor Name",
      dataIndex: "doctorName",
      className: "campaign-performance-table-column",
      render: (_, record) => (
        <div className="d-flex align-items-center gap-2">
          <Avatar size="large" src={record.profile || image1} />
          <span>{record.doctorName}</span>
        </div>
      ),
    },
    {
      title: "Designation",
      dataIndex: "designation",
      className: "campaign-performance-table-column",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="campaign-performance-table-action-icons">
          <div
            className="campaign-performance-table-edit-icon"
            onClick={() => showEditModal(record)}
          >
            <FiEdit />
          </div>
        </div>
      ),
      className: "campaign-performance-table-column",
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
      {isLoading ? (
        <Loader />
      ) : doctorDetails.length > 0 ? (
        <>
          <div className="campaign-performance-table-head mt-4">
            <div className="d-flex flex-column flex-md-row gap-3 align-items-center justify-content-between">
              <div className="user-engagement-header">
                <h3>Doctors List</h3>
              </div>
              <div className="search-container">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search anything here"
                  className="search-input-table"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-3">
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{
                  current: currentPage,
                  pageSize: itemsPerPage,
                  total: totalRows,
                  onChange: handleTableChange,
                }}
                className="campaign-performance-table overflow-y-auto"
                bordered={false}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="container">
          <div className="no-data-container">
            <img src={Empty_survey_image} alt="" />
          </div>
          <div className="no-data-container-text d-flex flex-column justify-content-center">
            <h4>No List Found</h4>
            <p>
              Currently, there are no News available to display.
              <br /> Please check back later or contact support for further
              assistance if this is an error.
            </p>
          </div>
        </div>
      )}
      {/* <CreateNews open={isModalOpen} handleCancel={handleCancel} />
      <EditNews
        open={isEditModalOpen}
        handleCancel={handleCancelEditModal}
        newsData={selectedNews}
      /> */}
    </div>
  );
};

export default DoctorsTableView;
