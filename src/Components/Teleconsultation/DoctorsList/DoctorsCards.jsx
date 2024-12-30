
import { Avatar } from "antd";
import React, {useEffect, useState} from "react";
import { TbReportMedical } from "react-icons/tb";
import patient from "../../../Assets/Images/DefaultUser.png";
import image1 from "../../../Assets/Images/singleuser.png";
import { FiSearch } from "react-icons/fi";
import { RxGrid } from "react-icons/rx";
import { LuMenu } from "react-icons/lu";

// import { DirectConsultListData } from "./DirectConsultListData";
import axios from "axios";
import DoctorsTableView from "./DoctorsTableView";

const DoctorCards = () => {
  const [isTableView, setIsTableView] = useState(false);
   const [doctorDetails, setDoctorDetails] = useState([]);
  const handleTableViewToggle = () => {
    setIsTableView(true);
  };
  const handleGridViewToggle = () => {
    setIsTableView(false);
  };

  const fetchDoctorList = async () => {
    try {
      // Step 1: Fetch Bearer Token
      const tokenResponse = await axios.post(
        'https://apigwrfhppd.ril.com/oauth/1.0.0/oauth2/token',
       {
          grant_type: 'client_credentials', 
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded', 
             Authorization: 'Basic UlpFS0pEY2ZFT2h5MUptdDNLNndmR1RLX2djYTpuOWpqTHQxR2RMcG0wVTJzVkN4WkNJa3BXUEVh'
          },
        }
      );
  
      const gwToken = tokenResponse.data.access_token
      console.log("gw Token:", gwToken);
  
      // Step 2: Use Bearer Token to Get gw-token
      const gwTokenResponse = await axios.post('https://apigwrfhppd.ril.com/MAT/1.0.0/API/Employee/userValidate',{loginSource:"external"}, {
        headers: {
          'Authorization': `Bearer ${gwToken}`,
          'Content-Type': 'application/json',
        }
      });
  
      const token = gwTokenResponse.data.token; 
      console.log("GW Token:", token);
  
      // Step 3: Pass Both Tokens to the Final API
      const finalResponse = await axios.get('https://apigwrfhppd.ril.com/RFH_SPECIALIZATION_DEPT_MHC/1.0.0/API/Specialization/GetPatientPortalDisplayWeb/12/44', {
        headers: {
          'Authorization': token,
          'gw-token': `Bearer ${gwToken}`,
          'Content-Type': 'application/json',
        }
      });
        const gastroenterologyDetails = finalResponse.data.data.filter(
        (item) => item.specialityName === 'GASTROENTEROLOGY'
      );
  
      console.log('Gastroenterology Details:', gastroenterologyDetails);
      const doctorDetails = gastroenterologyDetails.flatMap((specialty) =>
        specialty.doctors_in_speciality.map((doctor) => ({
          doctorId: doctor.doctorId,
          doctorName: doctor.doctorName,
          designation:doctor.designation,
          profile:doctor.profileImage,
          email:doctor.amEmployeeEmailId,
          mobile:doctor.amEmployeeMobileNo
        }))
      );
  
      console.log('Doctor Details:', doctorDetails);
      setDoctorDetails(doctorDetails); 
    } catch (error) {
      console.error("Error in the workflow:", error);
    }
  };
  
  

//   const dataSource = useMemo(() => {
//     if (searchText.trim() === "") return departments;
//     return departments.filter((department) =>
//       `${department.title} ${department.subtitle}`
//         .toLowerCase()
//         .includes(searchText.toLowerCase())
//     );
//   }, [searchText, departments]);

  useEffect(() => {
    fetchDoctorList();
  },[]);



  return (
    <div className="container mt-4">
        <div className="d-flex justify-content-between">
            <h4>Doctors List</h4>
            <div className="d-flex mb-2 flex-lg-row flex-xl-row flex-column justify-content-end gap-4">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search anything here"
            className="search-input-table"
          />
        </div>
        <div className="search-table-container d-flex gap-4">
        <div
            onClick={handleGridViewToggle}
          >
            <RxGrid className={`d-flex align-items-center  ${
              !isTableView ? "appointment-active-icon" : "table-card-list"
            }`}/>
          </div>
          <div
            onClick={handleTableViewToggle}
          >
            <LuMenu className={`d-flex align-items-center ${
              isTableView ? "appointment-active-icon" : "table-data-list"
            }`}/>
          </div>
        </div>
      </div>
        </div>
      
  
        {isTableView ? (
        <DoctorsTableView />
      ) : (
        <div className="row">
          {doctorDetails.map((doctor, index) => (
            <div className="col-lg-4" key={index}>
              <div className="appointment-cards mb-4">
                <div className="appointment-card-header d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-3 appointment-title align-items-center">
                    <div className="appointment-title-icon">
                      <TbReportMedical size={22} style={{ color: "var(--black-color)" }} />
                    </div>
                    <h5>{doctor.doctorId}</h5>  
                  </div>
                </div>
                <hr />
                <div className="appointment-card-body">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center gap-2">
                      <Avatar size="large" src={doctor.profile || image1} />
                      <div>
                        <h6 className="mb-1">{doctor.doctorName}</h6>  
                        <p className="mb-0">{doctor.designation}</p>  
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div>
                      <h6 className="mb-1">E-Mail</h6>
                      <p className="mb-0">{doctor.email}</p> 
                    </div>
                    <div>
                      <h6 className="mb-1">Mobile No</h6>
                      <p className="mb-0">{doctor.mobile}</p> 
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorCards;
