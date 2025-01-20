import React, { useEffect, useMemo, useState } from "react";
import { Table, Dropdown, Button, Space } from "antd";
import { FiEdit, FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";
import { FaAngleLeft, FaPlus } from "react-icons/fa6";
import Empty_survey_image from "../../../Assets/Icons/Empty_survey_image.png";
import {
  showDeleteMessage,
  showSuccessMessage,
} from "../../../globalConstant";
import { GoPlus } from "react-icons/go";
import { Instance } from "../../../AxiosConfig";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Loader";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import AddService from "./AddService";
import EditService from "./EditService";
import ViewService from "./ViewService";
import { deleteService, setService } from "../../../Features/ServiceSlice";

const ServiceTable = () => {
  const [modals, setModals] = useState({
    event: false,
    service: false,
    edit: false,
    view: false
  });
  const [selectedService, setSelectedService] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  const servicesList = useSelector((state) => state.service.services);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const itemsPerPage = 10;
  const totalRows = servicesList?.length || 0;
  
  const navigate = useNavigate();
  
  const truncateText = (text, wordLimit = 15) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const truncateHTML = (html, wordLimit = 15) => {
    if (!html) return "";
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = div.textContent || div.innerText;
    return truncateText(text, wordLimit);
  };

  const toggleModal = (modalType) =>
    setModals((prev) => ({ ...prev, [modalType]: !prev[modalType] }));

  const showEditModal = (service) => {
    setSelectedService(service);
    toggleModal("edit");
  };

  const showViewModal = (service) => {
    setSelectedService(service);
    toggleModal("view");
  };

  const showModal = () => toggleModal("service");

  const handleDeleteService = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/depcat/service/${_id}`);
          if (response.status === 200 || response.status === 204) {
            dispatch(deleteService(_id));
            showSuccessMessage("Deleted successfully");
          }
        } catch (error) {
          console.error("Error deleting service:", error);
        }
      },
    });
  };

  const fetchServiceList = async () => {
    setIsLoading(true);
    try {
      const response = await Instance.get("depcat/service");
      dispatch(setService(response.data));
    } catch (error) {
      console.error("Error fetching Services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceList();
  }, []);

  const dataSource = useMemo(() => {
    if (searchText.trim() === "") return servicesList || [];
    return (servicesList || []).filter((service) =>
      `${service.heading}${service.subHeading}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [searchText, servicesList]);

  const columns = [
    {
      title: "Heading",
      dataIndex: "heading",
      className: "campaign-performance-table-column",
    },
    {
      title: "Sub Heading",
      dataIndex: "subHeading",
      className: "campaign-performance-table-column",
      render: (text) => truncateText(text),
    },
    {
      title: "Content",
      dataIndex: "content",
      className: "campaign-performance-table-column",
      render: (content) => {
        const truncatedHTML = truncateHTML(content);
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(truncatedHTML),
            }}
          />
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="campaign-performance-table-action-icons">
          <div
            className="campaign-performance-table-eye-icon"
            onClick={() => showViewModal(record)}
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
            onClick={() => handleDeleteService(record._id)}
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
      ) : servicesList?.length > 0 ? (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <div className="user-engagement-header">
              <h3>Services List</h3>
            </div>
            <div className="d-flex align-items-center gap-3">
              <button
                className="d-flex gap-2 align-items-center rfh-basic-button"
                onClick={showModal}
              >
                <GoPlus />
                Add Service
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
                  showSizeChanger: false,
                }}
                className="campaign-performance-table overflow-y-auto"
                bordered={false}
              />
            </div>
          </div>
          <div className="d-flex justify-content-start mt-2">
            <button
              className="d-flex gap-2 align-items-center rfh-basic-button"
              onClick={() => navigate("/marketing/in-app-campaign")}
            >
              <FaAngleLeft />
              Back
            </button>
          </div>
        </>
      ) : (
        <div className="container">
          <div className="no-data-container">
            <img src={Empty_survey_image} alt="No services" />
          </div>
          <div className="no-data-container-text d-flex flex-column justify-content-center">
            <h4>No Services Found</h4>
            <p>
              Currently, there are no services available to display.
              <br /> Please check back later or contact support for further
              assistance if this is an error.
            </p>
            <div className="d-flex justify-content-center">
              <button className="rfh-basic-button" onClick={showModal}>
                <FaPlus /> Create Service
              </button>
            </div>
          </div>
        </div>
      )}
      <AddService
        open={modals.service}
        handleCancel={() => toggleModal("service")}
        serviceData={selectedService}
      />
      <EditService
        open={modals.edit}
        handleCancel={() => toggleModal("edit")}
        serviceData={selectedService}
      />
      <ViewService
        open={modals.view}
        handleCancel={() => toggleModal("view")}
        serviceData={selectedService}
      />
    </div>
  );
};

export default ServiceTable;