import React, { useEffect, useMemo, useState } from "react";
import { Table, Dropdown, Button, Space } from "antd";
import { FiEdit, FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import Empty_survey_image from "../../Assets/Icons/Empty_survey_image.png";
import { showDeleteMessage } from "../../globalConstant";
import { GoPlus } from "react-icons/go";
import { Instance } from "../../AxiosConfig";
import {
  deleteDepartment,
  setDepartment,
} from "../../Features/DepartmentSlice";
import { useDispatch, useSelector } from "react-redux";
import ViewDepartmentDetails from "./ViewDepartmentDetails";
import EditDepartmentDetails from "./EditDepartmentDetails";
import CreateDepartmentDetails from "./CreateDepartmentDetails";
import Loader from "../../Loader";

const DepartmentDetailsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewDepartmentModalOpen, setIsViewDepartmentModalOpen] =
    useState(false);

  const [departmentList, setDepartmentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const departments = useSelector((state) => state.department.departments);
  console.log("khkkj", departments);

  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const itemsPerPage = 5;

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showEditModal = (department) => {
    setSelectedDepartment(department);
    setIsEditModalOpen(true);
  };
  const handleCancelEditModal = () => {
    setSelectedDepartment(null);
    setIsEditModalOpen(false);
  };

  const ShowDepartmentModal = (department) => {
    setSelectedDepartment(department);
    setIsViewDepartmentModalOpen(true);
  };
  const handleCancelDepartmentModal = () => {
    setSelectedDepartment(null);
    setIsViewDepartmentModalOpen(false);
  };

  const handleDeleteDepartment = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/department/${_id}`);
          if (response.status === 200) {
            dispatch(deleteDepartment(_id));
            setDepartmentList((prev) =>
              prev.filter((dept) => dept._id !== _id)
            );
          }
        } catch (error) {
          console.error("Error deleting department list:", error);
        }
      },
    });
  };

  const fetchDepartmentList = async (page) => {
    setIsLoading(true);

    try {
      const response = await Instance.get(`/department`, {});
      setDepartmentList(response.data.departments || []);
      console.log(response.data);
      setTotalRows(response.data.totalDepartments);
      dispatch(setDepartment(response.data));
    } catch (error) {
      console.error("Error fetching department list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const dataSource = useMemo(() => {
    if (searchText.trim() === "") return departments;
    return departments.filter((department) =>
      `${department.title} ${department.subtitle}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [searchText, departments]);

  useEffect(() => {
    fetchDepartmentList(currentPage);
  }, [currentPage]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      className: "campaign-performance-table-column",
    },
    {
      title: "Subtitle",
      dataIndex: "subtitle",
      key: "subtitle",
      className: "campaign-performance-table-column",
    },
    {
      title: "Specialist Name",
      dataIndex: "specialistName",
      key: "specialistName",
      className: "campaign-performance-table-column",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="campaign-performance-table-action-icons">
          <div
            className="campaign-performance-table-eye-icon"
            onClick={() => ShowDepartmentModal(record)}
          >
            <FiEye />
          </div>
          <div
            className="campaign-performance-table-edit-icon"
            onClick={() => showEditModal(record)}
          >
            <FiEdit />
          </div>
          <div
            className="campaign-performance-table-delete-icon"
            onClick={() => handleDeleteDepartment(record._id)}
          >
            <FiTrash2 />
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
      ) : departmentList.length > 0 ? (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <div className="user-engagement-header">
              <h3>Department List</h3>
            </div>
            <div className="d-flex align-items-center gap-3">
              <button
                className="d-flex gap-2 align-items-center rfh-basic-button"
                onClick={showModal}
              >
                <GoPlus />
                Create Department
              </button>
            </div>
          </div>
          <div className="campaign-performance-table-head mt-4">
            <div className="d-flex flex-column flex-md-row gap-3 align-items-center justify-content-end">
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

              <div className="d-flex gap-2">
                <Dropdown menu={menuProps}>
                  <Button>
                    <Space>
                      Sort By
                      <BiSortAlt2 />
                    </Space>
                  </Button>
                </Dropdown>
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
                  onChange: (page) => setCurrentPage(page),
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
            <h4>No Department Found</h4>
            <p>
              Currently, there are no Department available to display.
              <br /> Please check back later or contact support for further
              assistance if this is an error.
            </p>
            <div className="d-flex justify-content-center">
              <button className="rfh-basic-button" onClick={showModal}>
                <FaPlus /> Create Department
              </button>
            </div>
          </div>
        </div>
      )}
      <CreateDepartmentDetails open={isModalOpen} handleCancel={handleCancel} />
      <EditDepartmentDetails
        open={isEditModalOpen}
        handleCancel={handleCancelEditModal}
        departmentData={selectedDepartment}
      />
      <ViewDepartmentDetails
        open={isViewDepartmentModalOpen}
        handleCancel={handleCancelDepartmentModal}
        departmentData={selectedDepartment}
      />
    </div>
  );
};

export default DepartmentDetailsList;
