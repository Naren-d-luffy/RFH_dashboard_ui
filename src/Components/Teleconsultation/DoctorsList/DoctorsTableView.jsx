import React, { useEffect, useMemo, useState } from "react";
import { Table, Avatar } from "antd";
import { FiEdit, FiSearch } from "react-icons/fi";
import Empty_survey_image from "../../../Assets/Icons/Empty_survey_image.png";
import Loader from "../../../Loader";
import axios from "axios";
import image1 from "../../../Assets/Images/singleuser.png";
import UploadProfileModal from "./UploadProfileModal";
import { Instance } from "../../../AxiosConfig";
import { useSelector,useDispatch } from 'react-redux';
import { getProfiles } from "../../../Features/DoctorProfileSlice";
const DoctorsTableView = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState([]);
  const [doctorProfiles, setDoctorProfiles] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorIds, setDoctorIds] = useState({}); 
  const itemsPerPage = 10;
  const doctorProfile= useSelector((state) => state.doctorProfiles.profiles);
const dispatch=useDispatch()

  const showEditModal = (doctor) => {
    const doctorWithProfile = {
      ...doctor,
      profileImage: doctorProfile[doctor.doctorId] || null,
      _id: doctorIds[doctor.doctorId]
    };
    setSelectedDoctor(doctorWithProfile);
    setIsEditModalOpen(true);
  };
  const handleCancelEditModal = () => {
    setIsEditModalOpen(false);
  };

  const fetchDoctorListMyApi = async () => {
    try {
      const response = await Instance.get("/doctorProfile");
      const profileMapping = {};
      const idMapping = {};
      
      response.data.forEach(doctor => {
        profileMapping[doctor.doctorId] = doctor.profileImage;
        idMapping[doctor.doctorId] = doctor._id;
      });

      setDoctorProfiles(profileMapping);
      dispatch(getProfiles({ profiles: profileMapping }));
      setDoctorIds(idMapping);
    } catch (error) {
      console.error("Error fetching doctor profiles:", error);
    }
  };


  const fetchDoctorList = async () => {
    setIsLoading(true)
    try {
      // Your existing token fetching logic
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

      const doctors = gastroenterologyDetails.flatMap((specialty) =>
        specialty.doctors_in_speciality.map((doctor) => ({
          doctorId: doctor.doctorId,
          doctorName: doctor.doctorName,
          designation: doctor.designation,
          email: doctor.amEmployeeEmailId,
          mobile: doctor.amEmployeeMobileNo,
        }))
      );

      setDoctorDetails(doctors);
      setIsLoading(false)
    } catch (error) {
      console.error("Error in the workflow:", error);
      setIsLoading(false)
    }finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchDoctorList();
    fetchDoctorListMyApi();
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
          <Avatar 
            size="large" 
            src={doctorProfile[record.doctorId] || image1} 
          />
          <span>{record.doctorName}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      className: "campaign-performance-table-column",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile",
      className: "campaign-performance-table-column",
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
      <UploadProfileModal
        open={isEditModalOpen}
        handleCancel={handleCancelEditModal}
        doctorData={selectedDoctor}
      />
    </div>
  );
};

export default DoctorsTableView;