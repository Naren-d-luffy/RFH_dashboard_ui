import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Table, message } from "antd";
import { FiEdit, FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
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

import AddEventsList from "./AddEventsList";
import EditEventsList from "./EditEventsList";
import ViewEventList from "./ViewEventList";
import { deleteEvent, setEvent } from "../../../../Features/DiscoverEventsCard";
import { useNavigate } from "react-router-dom";
// import DOMPurify from "dompurify";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
  const [totalRows] = useState(0);
  const dispatch = useDispatch();
  const itemsPerPage = 10;
  const tableData = eventsData;

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

  // const truncateText = (text, wordLimit = 15) => {
  //   if (!text) return "";
  //   const words = text.split(" ");
  //   return words.length > wordLimit
  //     ? words.slice(0, wordLimit).join(" ") + "..."
  //     : text;
  // };
  // const sanitizeContent = (content) => {
  //   return DOMPurify.sanitize(content);
  // };
  const handleDeleteEvent = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/discover/card/${_id}`);
          if (response.status === 200) {
            showSuccessMessage("Deleted successfully event");
            dispatch(deleteEvent(_id));
          }
        } catch (error) {
          console.error("Error deleting event:", error);
          message.error("Error deleting event");
        }
      },
    });
  };

  const fetchEventInfo = useCallback(
    async (page = 1) => {
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
    },
    [itemsPerPage, dispatch]
  );

  useEffect(() => {
    fetchEventInfo();
  }, [fetchEventInfo]);

  const onDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
  
    const oldIndex = tableData.findIndex((item) => item._id === active.id);
    const newIndex = tableData.findIndex((item) => item._id === over.id);
    const newOrder = arrayMove(tableData, oldIndex, newIndex);
  
    // Update Redux state
    dispatch(setEvent(newOrder));
  
    // Send updated order to the backend
    try {
      await Instance.put("/discover/card/reorder", { newOrder });
    } catch (error) {
      console.error("Error updating order:", error);
      // message.error("Failed to update order");
    }
  };
  
  const SortableItem = ({ children, ...props }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({
        id: props["data-row-key"],
      });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      cursor: "grab",
    };

    return (
      <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, props)
        )}
      </tr>
    );
  };
  const columns = [
    {
      title: "Sl No",
      key: "id",
      className: "campaign-performance-table-column",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (text) => truncateText(text),
    // },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (text) => (
    //     <span
    //       dangerouslySetInnerHTML={{
    //         __html: sanitizeContent(truncateText(text, 15)),
    //       }}
    //     ></span>
    //   ),
    // },
    {
      title: "Date",
      dataIndex: "createdAt",
      className: "campaign-performance-table-column",
      render: (text) => {
        const date = new Date(text);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      },
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (isActive ? "True" : "False"),
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
          <div className="d-flex user-engagement-header justify-content-between align-items-center">
            <h3>Events</h3>

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
              <DndContext
                // sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}
              >
                <SortableContext
                  items={tableData.map((item) => item._id)}
                  strategy={verticalListSortingStrategy}
                >
                  <Table
                    columns={columns}
                    dataSource={tableData.map((item) => ({
                      ...item,
                      key: item._id,
                    }))}
                    components={{ body: { row: SortableItem } }}
                    pagination={{
                      current: currentPage,
                      pageSize: itemsPerPage,
                      onChange: (page) => setCurrentPage(page),
                    }}
                  />
                </SortableContext>
              </DndContext>
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
