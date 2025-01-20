import React, { useState, useEffect } from "react";
import {Instance} from "../../../AxiosConfig";
import { Table, Dropdown, Button } from "antd";
import { FiSearch, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { showDeleteMessage } from "../../../globalConstant";
import { filterDropdown } from "../../../globalConstant";

const VirtualManagementTable = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await Instance.get("/doctor");        
        setDoctors(response.data.doctors); 
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
            setDoctors((prevDoctors) =>
              prevDoctors.filter((doctor) => doctor._id !== id)
            );
            // showDeleteMessage({ message: `Doctor "${name}" has been successfully deleted.` });
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

  const columns = [
    {
      title: "Doctor ID",
      dataIndex: "_id", // Assuming the API provides a unique ID
      key: "_id",
      className: "campaign-performance-table-column",
    },
    {
      title: "Doctor Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="d-flex align-items-center gap-2">
          <img
            src={record.image || "default-image.png"} // Fallback to default image if not provided
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
      title: "Specialization",
      dataIndex: "specialty",
      key: "specialty",
      className: "campaign-performance-table-column",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      className: "campaign-performance-table-column",
    },
    {
      title: "Patients Treated",
      dataIndex: "patients",
      key: "patients",
      className: "campaign-performance-table-column",
    },
    {
      title: "Ratings",
      dataIndex: "rating",
      key: "rating",
      className: "campaign-performance-table-column",
      render: (rating) => `${rating}/5`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color = status === "Active" ? "green" : "red";
        return <span style={{ color, fontWeight: "bold" }}>{status}</span>;
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
            onClick={() => navigate(`/teleconsultation/view-doctor-detail/${record._id}`, { state: record })}
            style={{ cursor: "pointer" }}
          >
            <FiEye />
          </div>
          <div 
          className="campaign-performance-table-edit-icon"
          onClick={() => navigate(`/teleconsultation/doctor-detail/${record._id}`, { state: record })}
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
              />
            </div>
            <div className="d-flex gap-3 align-items-center">
              <Dropdown
                overlay={filterDropdown(
                  [],
                  [],
                  () => {},
                  () => {},
                  () => {}
                )}
                trigger={["click"]}
                open={isDropdownOpen}
                onOpenChange={setIsDropdownOpen}
                placement="bottomLeft"
              >
                <Button style={{ width: 160 }}>
                  <VscSettings />
                  Filters
                </Button>
              </Dropdown>
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
            dataSource={doctors}
            loading={loading}
            rowKey="_id" // Ensure a unique key for rows
            className="campaign-performance-table overflow-y-auto"
            bordered={false}
          />
        </div>
      </div>
    </div>
  );
};

export default VirtualManagementTable;
