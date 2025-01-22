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
import DOMPurify from "dompurify";

import AddEventsList from "./AddEventsList";
import EditEventsList from "./EditEventsList";
import ViewEventList from "./ViewEventList";
import { deleteEvent, setEvent } from "../../../../Features/DiscoverEventsCard";
import { useNavigate } from "react-router-dom";

const TableEventsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  const eventsData = useSelector((state) => state.discoverevent.events);
  const [searchText, setSearchText] = useState("");
  const [totalRows, setTotalRows] = useState(0);
  const dispatch = useDispatch();
  const itemsPerPage = 10;

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const showEditModal = (event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };
  const handleEditCancel = () => setIsEditModalOpen(false);
  const showViewModal = (event) => {
    setSelectedEvent(event);
    setIsViewModalOpen(true);
  };
  const handleViewCancel = () => setIsViewModalOpen(false);

  const truncateText = (text, wordLimit = 15) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const handleDeleteEvent = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/discover/card/${_id}`);
          if (response.status === 200) {
            showSuccessMessage("Deleted successfully", "Details deleted");
            dispatch(deleteEvent(_id));
          }
        } catch (error) {
          console.error("Error deleting event:", error);
        }
      },
    });
  };

  const fetchEventInfo = async (page) => {
    setIsLoading(true);
    try {
      const response = await Instance.get(`/discover/card`, {
        params: { page, limit: itemsPerPage },
      });
      dispatch(setEvent(response.data.data));
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEventInfo(currentPage);
  }, [currentPage]);

  const dataSource = useMemo(() => {
    if (!searchText.trim())
      return Object.values(eventsData).map((event, index) => ({ ...event, key: index }));
    return Object.values(eventsData)
      .filter((event) =>
        `${event.title} ${event.description}`
          .toLowerCase()
          .includes(searchText.toLowerCase())
      )
      .map((event, index) => ({ ...event, key: index }));
  }, [searchText, eventsData]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title), // Sorting based on the title alphabetically

    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => truncateText(text),
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
      sorter: (a, b) => a.order - b.order, // Sorting numerically by likes

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
            onClick={() => handleDeleteEvent(record._id)}
          >
            <FiTrash2 />
          </div>
        </div>
      ),
      className: "campaign-performance-table-column",
    },
  ];
  // const items = [
  //   {
  //     label: "Last Day",
  //     key: "1",
  //   },
  //   {
  //     label: "Last week",
  //     key: "2",
  //   },
  //   {
  //     label: "Last Month",
  //     key: "3",
  //   },
  // ];

  // const handleMenuClick = ({ key }) => {};
  // const menuProps = {
  //   items,
  //   onClick: handleMenuClick,
  // };
  return (
    <div className="container mt-1">
      {isLoading ? (
        <Loader />
      ) : Object.values(eventsData).length > 0 ? (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h3>Event List</h3>

            <div className="d-flex align-items-center gap-3">
              <button
                className="d-flex gap-2 align-items-center rfh-basic-button"
                onClick={showModal}
              >
                <GoPlus />
                Add Event
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
              {/* <div className="d-flex gap-2">
                <Dropdown menu={menuProps}>
                  <Button>
                    <Space>
                      Sort By
                      <BiSortAlt2 />
                    </Space>
                  </Button>
                </Dropdown>
              </div> */}
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
            <h4>No Events Found</h4>
            <p>
              Currently, there are no Events available to display.
              <br /> Please check back later or contact support for further
              assistance if this is an error.
            </p>
            <div className="d-flex justify-content-center">
              <button className="rfh-basic-button" onClick={showModal}>
                <FaPlus /> Create Event
              </button>
            </div>
          </div>
        </div>
      )}
      <AddEventsList open={isModalOpen} handleCancel={handleCancel} />
      <EditEventsList
        open={isEditModalOpen}
        handleCancel={handleEditCancel}
        eventsData={selectedEvent}
      />
      <ViewEventList
        open={isViewModalOpen}
        handleCancel={handleViewCancel}
        eventsData={selectedEvent}
      />
    </div>
  );
};

export default TableEventsList;
