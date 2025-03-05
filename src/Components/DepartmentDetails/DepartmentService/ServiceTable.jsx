import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Table, message } from "antd";
import { FiEdit, FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import { FaAngleLeft, FaPlus } from "react-icons/fa6";
import Empty_survey_image from "../../../Assets/Icons/Empty_survey_image.png";
import { showDeleteMessage, showSuccessMessage } from "../../../globalConstant";
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
import ServicesOverviewTable from "./ServicesOverviewTable";
import CommonProceduresServices from "./CommonProceduresServices";

const ServiceTable = () => {
  const [modals, setModals] = useState({
    event: false,
    service: false,
    edit: false,
    view: false,
  });
  const [selectedService, setSelectedService] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const servicesList = useSelector((state) => state.service.services);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const itemsPerPage = 10;
  const [totalRows, setTotalRows] = useState(0);

  const navigate = useNavigate();

  const truncateText = (text, wordLimit = 15) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const truncateHTML = (html, wordLimit = 10) => {
    if (!html) return "";
    const div = document.createElement("div");
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
          message.error(
            `${
              error?.response?.data?.message || "An unexpected error occurred"
            }`
          );
        }
      },
    });
  };

  const fetchServiceList = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await Instance.get("/depcat/service");
      // Sort the data by position before setting it
      const sortedData = response.data.sort((a, b) => a.position - b.position);
      dispatch(setService(sortedData));
      setItems(sortedData);
      setTotalRows(sortedData.length || 0);
    } catch (error) {
      console.error("Error fetching service list:", error);
      message.error("Failed to fetch service list");
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchServiceList(currentPage);
  }, [currentPage, fetchServiceList]);

  useEffect(() => {
    if (servicesList && servicesList.length > 0) {
      const updatedItems = servicesList.map((item, index) => ({
        ...item,
        position: index + 1,
      }));
      setItems(updatedItems);
    }
  }, [servicesList]);

  const filteredItems = useMemo(() => {
    if (!items.length) return [];
    if (searchText.trim() === "") return items;

    return items.filter((service) =>
      `${service.heading} ${service.subHeading}`
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
        const response = await Instance.patch("/depcat/service", {
          services: updatePayload,
        });

        if (response.status === 200) {
          // Update Redux store with the new order
          // console.log("drag", response);
          dispatch(setService(newItems));
          message.success("Order updated successfully");

          // Fetch the updated list to ensure consistency
          await fetchServiceList();
        }
      } catch (error) {
        console.error("Error updating order:", error);
        message.error("Failed to update order");
        // Reset to original order
        await fetchServiceList();
      }
    },
    [items, dispatch, fetchServiceList]
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
      await fetchServiceList();

      // Calculate the current page based on the new technology's position
      const newPosition = newService.position;
      const newPage = Math.ceil(newPosition / itemsPerPage);
      setCurrentPage(newPage);
    },
    [fetchServiceList, itemsPerPage]
  );

  const columns = [
    {
      title: "Sl No",
      dataIndex: "position",
      className: "campaign-performance-table-column",
    },
    {
      title: "Heading",
      dataIndex: "heading",
      className: "campaign-performance-table-column",
      sorter: (a, b) => a.heading.localeCompare(b.heading),
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
            </div>

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
          {/* <div className="d-flex justify-content-start mt-2">
            <button
              className="d-flex gap-2 align-items-center rfh-basic-button"
              onClick={() => navigate("/department-details")}
            >
              <FaAngleLeft />
              Back
            </button>
          </div> */}
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

      <ServicesOverviewTable/>
      <CommonProceduresServices/>

      <AddService
        open={modals.service}
        handleCancel={() => toggleModal("service")}
        serviceData={selectedService}
        onServiceAdded={handleServiceAdded}
      />
      <EditService
        open={modals.edit}
        handleCancel={() => toggleModal("edit")}
        serviceData={selectedService}
        onServiceAdded={handleServiceAdded}
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
