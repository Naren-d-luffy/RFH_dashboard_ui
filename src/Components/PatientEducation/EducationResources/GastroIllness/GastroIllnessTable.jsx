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
import DOMPurify from "dompurify";
import AddEventsGastroIllness from "./AddEventsGastroIllness";
import EditEventsGastroIllness from "./EditEventsGastroIllness";
import ViewEventsGastroIllness from "./ViewEventsGastroIllness";
import {
  deleteGastroIllness,
  setGastroIllness,
} from "../../../../Features/GastroIllnessSlice";
import { useNavigate } from "react-router-dom";
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

const GastroIllnessTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [items, setItems] = useState([]);
  const EventData = useSelector((state) => state.gastroIllness.gastroIllness);
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

  const truncateText = (text, wordLimit = 15) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };
  const truncateHTML = (htmlContent, wordLimit) => {
    if (!htmlContent) return "";
    const sanitizedContent = DOMPurify.sanitize(htmlContent);
    const textContent = sanitizedContent.replace(/<[^>]*>/g, "");
    const words = textContent.split(" ");
    const truncatedText =
      words.length > wordLimit
        ? words.slice(0, wordLimit).join(" ") + "..."
        : textContent;
    return truncatedText;
  };
  const handleDeleteGastroIllness = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/gastro/${_id}`);
          if (response.status === 200) {
            showSuccessMessage("Deleted successfully", "Details deleted");
            dispatch(deleteGastroIllness(_id));
          }
        } catch (error) {
          console.error("Error deleting overview:", error);
          message.error("Error deleting overview", error);
        }
      },
    });
  };
  const fetchGastroIllnessInfo = useCallback(
    async () => {
      setIsLoading(true);
      try {
        const response = await Instance.get(`/gastro`);
        const sortedData = response.data.data.sort(
          (a, b) => a.position - b.position
        );
        dispatch(setGastroIllness(response?.data?.data));
        setItems(sortedData);
        setTotalRows(sortedData.length || 0);
      } catch (error) {
        console.error("Error fetching overview:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchGastroIllnessInfo(currentPage);
  }, [currentPage, fetchGastroIllnessInfo]);

  useEffect(() => {
    if (EventData && EventData.length > 0) {
      const updatedItems = EventData.map((item, index) => ({
        ...item,
        position: index + 1,
      }));
      setItems(updatedItems);
    }
  }, [EventData]);

  const filteredItems = useMemo(() => {
    if (!items.length) return [];
    if (searchText.trim() === "") return items;

    return items.filter((event) =>
      `${event.title} ${event.description} ${event.content}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [items, searchText]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required before drag starts
      },
    })
  );

  const onDragEnd = useCallback(
    async (event) => {
      const { active, over } = event;

      if (!over || active.id === over.id) {
        return;
      }

      const oldIndex = items.findIndex((item) => item._id === active.id);
      const newIndex = items.findIndex((item) => item._id === over.id);

      // Create new array with updated positions
      const newItems = arrayMove([...items], oldIndex, newIndex).map(
        (item, index) => ({
          ...item,
          position: index + 1,
        })
      );

      // Update local state immediately
      setItems(newItems);

      try {
        // Prepare the payload with all items and their new positions
        const updatePayload = newItems.map((item) => ({
          _id: item._id,
          position: item.position,
        }));

        // Make the API call
        const response = await Instance.patch("/gastro", {
          gastros: updatePayload,
        });

        if (response.status === 200) {
          // Update Redux store with the new order
          // console.log("drag", response);
          dispatch(setGastroIllness(newItems));
          message.success("Order updated successfully");

          // Fetch the updated list to ensure consistency
          await fetchGastroIllnessInfo();
        }
      } catch (error) {
        console.error("Error updating order:", error);
        message.error("Failed to update order");
        // Reset to original order
        await fetchGastroIllnessInfo();
      }
    },
    [items, dispatch, fetchGastroIllnessInfo]
  );
  const SortableRow = ({ children, ...props }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: props["data-row-key"],
    });

    const style = {
      ...props.style,
      transform: CSS.Transform.toString(transform),
      transition,
      cursor: isDragging ? "grabbing" : "grab",
      backgroundColor: isDragging ? "#fafafa" : "transparent",
      zIndex: isDragging ? 1 : 0,
    };

    return (
      <tr
        {...props}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        {children}
      </tr>
    );
  };

  const handleServiceAdded = useCallback(
    async (newService) => {
      // Fetch the complete list after adding new technology
      await fetchGastroIllnessInfo();

      // Calculate the current page based on the new technology's position
      const newPosition = newService.position;
      const newPage = Math.ceil(newPosition / itemsPerPage);
      setCurrentPage(newPage);
    },
    [fetchGastroIllnessInfo, itemsPerPage]
  );

  // const dataSource = useMemo(() => {
  //   const events = [...EventData].reverse();
  //   if (searchText.trim() === "") return events;
  //   return events.filter((event) =>
  //     `${event.title} ${event.description} ${event.content}`
  //       .toLowerCase()
  //       .includes(searchText.toLowerCase())
  //   );
  // }, [searchText, EventData]);

  const columns = [
    {
      title: "Sl No",
      dataIndex: "position",
      className: "campaign-performance-table-column",
    },
    {
      title: "Type",
      dataIndex: "type",
      className: "campaign-performance-table-column",
    },
    {
      title: "Title",
      dataIndex: "title",
      className: "campaign-performance-table-column",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Description",
      dataIndex: "description",
      className: "campaign-performance-table-column",
      render: (text) => truncateText(text),
    },
    {
      title: "Content",
      dataIndex: "content",
      className: "campaign-performance-table-column",
      render: (content) => {
        const truncatedHTML = truncateHTML(content, 15);
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
            onClick={() => handleDeleteGastroIllness(record._id)}
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
      ) : EventData.length > 0 ? (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <div className="user-engagement-header">
              <h3>Overview</h3>
            </div>
            <div className="d-flex align-items-center gap-3">
              <button
                className="d-flex gap-2 align-items-center rfh-basic-button"
                onClick={showModal}
              >
                <GoPlus />
                Add
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
            {/* <div className="mt-3">
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
            </div> */}
            <div className="mt-3">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}
              >
                <SortableContext
                  items={filteredItems.map((item) => item._id)}
                  strategy={verticalListSortingStrategy}
                >
                  <Table
                    components={{
                      body: {
                        row: SortableRow,
                      },
                    }}
                    rowKey="_id"
                    columns={columns}
                    dataSource={filteredItems}
                    pagination={{
                      current: currentPage,
                      pageSize: itemsPerPage,
                      total: totalRows,
                      onChange: (page) => setCurrentPage(page),
                      showSizeChanger: false,
                    }}
                    className="campaign-performance-table"
                  />
                </SortableContext>
              </DndContext>
            </div>
          </div>
          <div className="d-flex justify-content-start mt-2">
            <button
              className="d-flex gap-2 align-items-center rfh-basic-button"
              onClick={() => navigate("/patient-education/resources")}
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
              Currently, there are no events available to display.
              <br /> Please check back later or contact support for further
              assistance if this is an error.
            </p>
            <div className="d-flex justify-content-center">
              <button className="rfh-basic-button" onClick={showModal}>
                <FaPlus /> Create News
              </button>
            </div>
          </div>
        </div>
      )}
      <AddEventsGastroIllness open={isModalOpen} handleCancel={handleCancel}   onServiceAdded={handleServiceAdded}/>
      <EditEventsGastroIllness
        open={isEditModalOpen}
        handleCancel={handleEditCancel}
        EventData={selectedEvent}
        onServiceAdded={handleServiceAdded}
      />
      <ViewEventsGastroIllness
        open={isViewModalOpen}
        handleCancel={handleViewCancel}
        EventData={selectedEvent}
        
      />
    </div>
  );
};

export default GastroIllnessTable;
