import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Table, Dropdown, Button, Space } from "antd";
import { FiEdit, FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import Empty_survey_image from "../../Assets/Icons/Empty_survey_image.png";
import { showDeleteMessage, showSuccessMessage } from "../../globalConstant";
import { GoPlus } from "react-icons/go";
import { Instance } from "../../AxiosConfig";
import { useDispatch, useSelector } from "react-redux";
import AddHealthPackage from "./AddHealthpackage";
import {
  deleteHealthPackage,
  setPackages,
} from "../../Features/HealthPackageSlice";
import EditHealthPackage from "./EditHealthPackage";
import ViewHealthPackage from "./ViewHealthPackage";
import Loader from "../../Loader";

const HealthPackagelist = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewNewsModalOpen, setIsViewNewsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [packageList, setPackageList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const healthPackage = useSelector(
    (state) => state.healthPackage.healthPackage
  );
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  const itemsPerPage = 10;

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showEditModal = (healthPackage) => {
    setSelectedPackage(healthPackage);
    setIsEditModalOpen(true);
  };
  const handleCancelEditModal = () => {
    setSelectedPackage(null);
    setIsEditModalOpen(false);
  };

  const ShowNewsModal = (healthPackage) => {
    setSelectedPackage(healthPackage);
    setIsViewNewsModalOpen(true);
  };
  const handleCancelNewsModal = () => {
    setSelectedPackage(null);
    setIsViewNewsModalOpen(false);
  };

  const handleDeleteNews = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(
            `/package/health-checkups/${_id}`
          );
          if (response.status === 200) {
            showSuccessMessage("Deleted successfully", "Details deleted");
            dispatch(deleteHealthPackage(_id));
          }
        } catch (error) {
          console.error("Error deleting healthPackage:", error);
        }
      },
    });
  };

  const fetchPackageList = useCallback(
    async (page) => {
      setIsLoading(true);
      try {
        const response = await Instance.get(`/package/health-checkups`, {
          params: { page, limit: itemsPerPage },
        });
        console.log(response.data);
        setPackageList(response.data || []);
        setTotalRows(response.data.length);
        dispatch(setPackages(response.data));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching healthPackage:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );
  useEffect(() => {
    fetchPackageList(currentPage);
  }, [currentPage, fetchPackageList]);

  const dataSource = useMemo(() => {
    if (searchText.trim() === "") return healthPackage;
    return healthPackage.filter((healthPackage) =>
      `${healthPackage.packageName}{}${healthPackage.price}{}${healthPackage.rating}{}${healthPackage.duration}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [searchText, healthPackage]);

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  const columns = [
    {
      title: "Package Name",
      dataIndex: "packageName",
      className: "campaign-performance-table-column",
    },
    {
      title: "Price",
      dataIndex: "price",
      className: "campaign-performance-table-column",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      className: "campaign-performance-table-column",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      className: "campaign-performance-table-column",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="campaign-performance-table-action-icons">
          <div
            className="campaign-performance-table-eye-icon"
            onClick={() => ShowNewsModal(record)}
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
            onClick={() => handleDeleteNews(record._id)}
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
      ) : packageList.length > 0 ? (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <div className="user-engagement-header">
              <h3>Health Packages</h3>
            </div>
            <div className="d-flex align-items-center gap-3">
              <button
                className="d-flex gap-2 align-items-center rfh-basic-button"
                onClick={showModal}
              >
                <GoPlus />
                Add Health Package
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
                  onChange: handleTableChange, // Update current page on change
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
            <h4>No Packages Found</h4>
            <p>
              Currently, there are no Packages available to display.
              <br /> Please check back later or contact support for further
              assistance if this is an error.
            </p>
            <div className="d-flex justify-content-center">
              <button className="rfh-basic-button" onClick={showModal}>
                <FaPlus /> Create HealthPackage
              </button>
            </div>
          </div>
        </div>
      )}
      <AddHealthPackage open={isModalOpen} handleCancel={handleCancel} />
      <EditHealthPackage
        open={isEditModalOpen}
        handleCancel={handleCancelEditModal}
        packageData={selectedPackage}
      />
      <ViewHealthPackage
        open={isViewNewsModalOpen}
        handleCancel={handleCancelNewsModal}
        packageData={selectedPackage}
      />
    </div>
  );
};

export default HealthPackagelist;
