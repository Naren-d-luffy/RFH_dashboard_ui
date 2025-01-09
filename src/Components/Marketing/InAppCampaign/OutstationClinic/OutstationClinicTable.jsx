import React, { useEffect, useMemo, useState } from "react";
import { Table, Dropdown, Button, Space } from "antd";
import { FiEdit, FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";
import { FaAngleLeft, FaPlus } from "react-icons/fa6";
import Empty_survey_image from "../../../../Assets/Icons/Empty_survey_image.png";
import {
  showDeleteMessage,
  showSuccessMessage,
} from "../../../../globalConstant";
import { GoPlus } from "react-icons/go";
import { Instance } from "../../../../AxiosConfig";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../Loader";
import { useNavigate } from "react-router-dom";
import AddOutstationClinic from "./AddOutstationClinic";
import EditOutstationClinic from "./EditOutstationClinic";
import ViewOutstationClinic from "./ViewOutstationClinic";
import {
  deleteOutstationClinic,
  setOutstationClinic,
} from "../../../../Features/OutstationClinicSlice";

const OutstationClinicTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const EventData = useSelector((state) => state.clinics.clinics);
  console.log(EventData, "Eventdata");
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const itemsPerPage = 10;
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const navigate = useNavigate();
  const showEditModal = (Event) => {
    setSelectedEvent(Event);
    setIsEditModalOpen(true);
  };
  const handleEditCancel = () => setIsEditModalOpen(false);
  const showViewModal = (Event) => {
    setSelectedEvent(Event);
    setIsViewModalOpen(true);
  };
  const handleViewCancel = () => setIsViewModalOpen(false);

  const handleDeleteOutstationClinic = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/discover/clinic/${_id}`);
          if (response.status === 200) {
            showSuccessMessage("Deleted successfully", "Details deleted");
            dispatch(deleteOutstationClinic(_id));
          }
        } catch (error) {
          console.error("Error deleting event:", error);
        }
      },
    });
  };
  const fetchOutstationClinicInfo = async (page) => {
    setIsLoading(true);
    try {
      const response = await Instance.get(`/discover/clinic`, {
        params: { page, limit: itemsPerPage },
      });
      console.log(response.data);
      dispatch(setOutstationClinic(response.data));
      setOutstationClinic(response.data || []);
      setTotalRows(response.data || 0);
    } catch (error) {
      console.error("Error fetching clinic:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOutstationClinicInfo(currentPage);
  }, [currentPage]);

  const dataSource = useMemo(() => {
    if (searchText.trim() === "") return EventData;
    return EventData.filter((Event) =>
      `${Event.title}{}${Event.description}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [searchText, EventData]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      className: "campaign-performance-table-column",
    },
    // {
    //   title: "About",
    //   dataIndex: "about",
    //   className: "campaign-performance-table-column",
    //   render: (text) => truncateText(text),
    //   render: (content) => {
    //     const truncatedHTML = truncateHTML(content, 15);
    //     return (
    //       <div
    //         dangerouslySetInnerHTML={{
    //           __html: DOMPurify.sanitize(truncatedHTML),
    //         }}
    //       />
    //     );
    //   },
    // },
    {
      title: "Rating",
      dataIndex: "rating",
      className: "campaign-performance-table-column",
    },
    {
      title: "Reviews",
      dataIndex: "reviews",
      className: "campaign-performance-table-column",
    },
    {
      title: "Location",
      dataIndex: "location",
      className: "campaign-performance-table-column",
    },
    {
      title: "Patients",
      dataIndex: "patients",
      className: "campaign-performance-table-column",
    },
    {
      title: "Experience",
      dataIndex: "experience",
      className: "campaign-performance-table-column",
    },
    {
      title: "Timing",
      dataIndex: "timing",
      className: "campaign-performance-table-column",
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
            onClick={() => handleDeleteOutstationClinic(record._id)}
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
      ) : EventData.length > 0 ? (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <div className="user-engagement-header">
              <h3>OutstationClinic Info</h3>
            </div>
            <div className="d-flex align-items-center gap-3">
              <button
                className="d-flex gap-2 align-items-center rfh-basic-button"
                onClick={showModal}
              >
                <GoPlus />
                Add Clinic
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
            <img src={Empty_survey_image} alt="" />
          </div>
          <div className="no-data-container-text d-flex flex-column justify-content-center">
            <h4>No Clinics Found</h4>
            <p>
              Currently, there are no Clinics available to display.
              <br /> Please check back later or contact support for further
              assistance if this is an error.
            </p>
            <div className="d-flex justify-content-center">
              <button className="rfh-basic-button" onClick={showModal}>
                <FaPlus /> Create Clinic
              </button>
            </div>
          </div>
        </div>
      )}
      <AddOutstationClinic open={isModalOpen} handleCancel={handleCancel} />
      <EditOutstationClinic
        open={isEditModalOpen}
        handleCancel={handleEditCancel}
        EventData={selectedEvent}
      />
      <ViewOutstationClinic
        open={isViewModalOpen}
        handleCancel={handleViewCancel}
        EventData={selectedEvent}
      />
    </div>
  );
};

export default OutstationClinicTable;
