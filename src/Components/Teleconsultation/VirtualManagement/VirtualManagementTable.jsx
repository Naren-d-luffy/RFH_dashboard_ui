import React, { useState, useEffect, useMemo } from "react";
import { Instance } from "../../../AxiosConfig";
import { Table, Button, Modal, Avatar, Tag } from "antd";
import { FiSearch, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
// import { VscSettings } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { showDeleteMessage, showSuccessMessage } from "../../../globalConstant";
// import { filterDropdown } from "../../../globalConstant";
import defaultUser from "../../../Assets/Images/singleuser.png";
import DOMPurify from "dompurify";

const sanitizeContent = (content) => {
  return DOMPurify.sanitize(content);
};

const DoctorDetailsModal = ({ isOpen, onClose, doctor }) => {
  if (!doctor) return null;
  console.log(doctor, "doctor");
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      width={600}
      footer={[
        <Button
          key="back"
          onClick={onClose}
          className="create-campaign-cancel-button"
        >
          Cancel
        </Button>,
      ]}
    >
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="w-3/4 max-w-5xl rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            <div className="flex items-center space-x-6 border-b border-gray-200 pb-6">
              <div className="view-doctor-detail-doctor-image">
                <Avatar
                  size={74}
                  src={doctor.profile || defaultUser}
                  className="view-doctor-profile-image"
                />
              </div>

              <div className="view-doctor-detail-info-section">
                <h3>{doctor.name}</h3>
                <h6>{doctor.position}</h6>
              </div>
            </div>
            <hr style={{ color: "var(--black-color)" }} />

            {/* Qualifications */}
            <div className="mt-8">
              <div className="view-doctor-detail-specialist-section">
                <h6 className="mb-0">Qualifications</h6>
              </div>
              <div className="flex flex-wrap gap-2">
                {doctor.qualifications.map((qual, index) => (
                  <Tag key={index} className="most-user-success-tag p-2 mt-2">
                    {qual}
                  </Tag>
                ))}
              </div>
            </div>

            <div className="view-doctor-detail-specialist-section">
              <h3>Department</h3>
              <p>{doctor.department}</p>
              <h3 className="mt-3">Experience</h3>
              <p>{doctor.experience}</p>
              <h3 className="mt-3">Contact Details</h3>
              <p>{doctor.contactDetails}</p>
            </div>
            <hr style={{ color: "var(--black-color)" }} />
            <div className="news-content">
              <h6>About</h6>
              <p
                className="news-content"
                dangerouslySetInnerHTML={{
                  __html: sanitizeContent(doctor.about)?.replace(
                    /<img/g,
                    '<img style="max-width: 100%; max-height: 150px; height: auto; object-fit: cover;"'
                  ),
                }}
              ></p>
            </div>
            {/* Main Content */}
            <div className="mt-8">
              {/* Areas of Expertise */}
              <div className="mt-4 news-content">
                <h6>Areas of Expertise</h6>
                <div className="flex flex-wrap gap-2 mt-2">
                  {doctor.AreasOfExpertise.map((area, index) => (
                    <Tag key={index} className="most-user-success-tag p-2 mt-2">
                      {area}
                    </Tag>
                  ))}
                </div>
              </div>

              {/* Fellowships */}
              {doctor.fellowships?.filter((fellowship) => fellowship).length >
                0 && (
                <div className="mt-4 news-content">
                  <h6>Fellowships</h6>
                  <div className="d-flex flex-column flex-wrap gap-2 mt-2">
                    {doctor.fellowships.map((fellowship, index) => (
                      <Tag
                        key={index}
                        className="most-user-success-tag p-2"
                        style={{ width: "fit-content" }}
                      >
                        {fellowship}
                      </Tag>
                    ))}
                  </div>
                </div>
              )}

              {/* Awards */}

              {doctor.awards?.filter((award) => award).length > 0 && (
                <div className="mt-8 news-content">
                  <h6>Awards</h6>
                  <div className="d-flex flex-column flex-wrap gap-2">
                    {doctor.awards.map((award, index) => (
                      <Tag
                        key={index}
                        className="most-user-success-tag p-2"
                        style={{ width: "fit-content" }}
                      >
                        {award}
                      </Tag>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const VirtualManagementTable = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");

  const dataSource = useMemo(() => {
    if (searchText.trim() === "") return doctors; // Convert to array
    return doctors.filter((doctors) =>
      `${doctors._id} ${doctors.name} ${doctors.department} ${doctors.position} ${doctors.experience} ${doctors.qualifications}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [searchText, doctors]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await Instance.get("/doctor");
        setDoctors(response.data);
        console.log("doctorss", response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleDelete = (id, name) => {
    if (!id || !name) {
      console.warn("Invalid parameters provided for deletion.");
      return;
    }

    showDeleteMessage({
      message: `Deleting doctor: ${name}`,
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/doctor/${id}`);
          if (response.status === 200) {
            showSuccessMessage("Deleted successfully Doctor List");
            setDoctors((prevDoctors) =>
              prevDoctors.filter((doctor) => doctor._id !== id)
            );
          } else {
            console.error(`Unexpected response status: ${response.status}`);
            showDeleteMessage({
              message: `Failed to delete doctor "${name}". Please try again.`,
            });
          }
        } catch (error) {
          console.error(`Error deleting doctor with ID: ${id}`, error);
          showDeleteMessage({
            message: `An error occurred while deleting doctor "${name}".`,
          });
        }
      },
    });
  };

  const handleViewDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };
  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value.toLowerCase());
  // };
  // const filteredDoctors = doctors.filter((doctor) =>
  //   doctor.name.toLowerCase().includes(searchQuery) ||
  //   doctor.department.toLowerCase().includes(searchQuery) ||
  //   doctor.position.toLowerCase().includes(searchQuery)
  // );

  const columns = [
    {
      title: "Sl No",
      key: "id",
      className: "campaign-performance-table-column",
      render: (text, record, index) => index + 1,
    },

    {
      title: "Doctor Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="d-flex align-items-center gap-2">
          <img
            src={record.profile || defaultUser}
            alt="Doctor"
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
      title: "Position",
      dataIndex: "position",
      key: "position",
      className: "campaign-performance-table-column",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      className: "campaign-performance-table-column",
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
      className: "campaign-performance-table-column",
    },
    {
      title: "Qualifications",
      dataIndex: "qualifications",
      key: "qualifications",
      className: "campaign-performance-table-column",
      render: (qualifications) =>
        qualifications
          ? qualifications.slice(0, 2).join(", ") +
            (qualifications.length > 2 ? "..." : "")
          : "",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="campaign-performance-table-action-icons">
          <div
            className="campaign-performance-table-eye-icon"
            onClick={() => handleViewDoctor(record)}
            style={{ cursor: "pointer" }}
          >
            <FiEye />
          </div>
          <div
            className="campaign-performance-table-edit-icon"
            onClick={() =>
              navigate(`/teleconsultation/doctor-detail/${record._id}`, {
                state: record,
              })
            }
          >
            <FiEdit />
          </div>
          <div
            className="campaign-performance-table-delete-icon"
            onClick={() => handleDelete(record._id, record.name)}
          >
            <FiTrash2 />
          </div>
        </div>
      ),
      className: "campaign-performance-table-column",
    },
  ];

  return (
    <div className="mt-4">
      <div className="campaign-performance-table-head">
        <div className="d-flex justify-content-between flex-lg-row flex-xl-row flex-column align-items-center">
          <h6>Doctor List</h6>
          <div className="d-flex gap-3 align-items-center">
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
            <div className="d-flex gap-3 align-items-center">
              <button
                className="rfh-basic-button"
                onClick={() => navigate(`/teleconsultation/doctor-detail`)}
              >
                <GoPlus size={20} /> Add Doctor
              </button>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <Table
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            rowKey="_id"
            className="campaign-performance-table overflow-y-auto"
            bordered={false}
          />
        </div>
      </div>

      <DoctorDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        doctor={selectedDoctor}
      />
    </div>
  );
};

export default VirtualManagementTable;
