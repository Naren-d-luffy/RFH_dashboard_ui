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
import {
  deleteTreatment,
  setTreatment,
} from "../../../../Features/TreatmentInfoSlice";
import DOMPurify from "dompurify";
import EditTreatmentsInfo from "./EditTreatmentsInfo";
import ViewTreatmentsInfo from "./ViewTreatmentsInfo";
import AddTreatmentsInfo from "./AddTreatmentsInfo";
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

const TreatmentList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const treatmentData = useSelector((state) => state.treatments.treatments);

  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const itemsPerPage = 10;
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const showEditModal = (treatment) => {
    setSelectedTreatment(treatment);
    setIsEditModalOpen(true);
  };
  const handleEditCancel = () => setIsEditModalOpen(false);
  const showViewModal = (treatment) => {
    setSelectedTreatment(treatment);
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
  const handleDeleteTreatment = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/education/${_id}`);
          if (response.status === 200) {
            showSuccessMessage("Deleted successfully", "Details deleted");
            dispatch(deleteTreatment(_id));
          }
        } catch (error) {
          console.error("Error deleting common procedure:", error);
          message.error("Error deleting common procedure", error);
        }
      },
    });
  };
  const fetchTreatmentsInfo = useCallback(
    async (page) => {
      setIsLoading(true);
      try {
        const response = await Instance.get(`/education`);
        const sortedData = response.data.data.sort(
          (a, b) => a.position - b.position
        );
        dispatch(setTreatment(sortedData));
        setItems(sortedData);
        setTotalRows(sortedData.length || 0);
      } catch (error) {
        console.error("Error fetching common procedure:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchTreatmentsInfo(currentPage);
  }, [currentPage, fetchTreatmentsInfo]);

  useEffect(() => {
    if (treatmentData && treatmentData.length > 0) {
      const updatedItems = treatmentData.map((item, index) => ({
        ...item,
        position: index + 1,
      }));
      setItems(updatedItems);
    }
  }, [treatmentData]);

 

  const filteredItems = useMemo(() => {
    if (!items.length) return [];
    if (searchText.trim() === "") return items;

    return items.filter((treatment) =>
      `${treatment.title} ${treatment.description} ${treatment.content}`
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
        const response = await Instance.patch("/education", {
          educations: updatePayload,
        });

        if (response.status === 200) {
       
          dispatch(setTreatment(newItems));
          message.success("Order updated successfully");

          await fetchTreatmentsInfo();
        }
      } catch (error) {
        console.error("Error updating order:", error);
        message.error("Failed to update order");
        // Reset to original order
        await fetchTreatmentsInfo();
      }
    },
    [items, dispatch, fetchTreatmentsInfo]
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
      await fetchTreatmentsInfo();

      // Calculate the current page based on the new technology's position
      const newPosition = newService.position;
      const newPage = Math.ceil(newPosition / itemsPerPage);
      setCurrentPage(newPage);
    },
    [fetchTreatmentsInfo, itemsPerPage]
  );

  const columns = [
    {
      title: "Sl No",
      dataIndex: "position",
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
            onClick={() => handleDeleteTreatment(record._id)}
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
      ) : treatmentData.length > 0 ? (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <div className="user-engagement-header">
              <h3>Common procedure</h3>
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
            <h4>No Treatments Found</h4>
            <p>
              Currently, there are no Treatments available to display.
              <br /> Please check back later or contact support for further
              assistance if this is an error.
            </p>
            <div className="d-flex justify-content-center">
              <button className="rfh-basic-button" onClick={showModal}>
                <FaPlus /> Create Treatment
              </button>
            </div>
          </div>
        </div>
      )}
      <AddTreatmentsInfo open={isModalOpen} handleCancel={handleCancel}  onServiceAdded={handleServiceAdded}
      />
      <EditTreatmentsInfo
        open={isEditModalOpen}
        handleCancel={handleEditCancel}
        treatmentData={selectedTreatment}
        onServiceAdded={handleServiceAdded}

      />
      <ViewTreatmentsInfo
        open={isViewModalOpen}
        handleCancel={handleViewCancel}
        treatmentData={selectedTreatment}
      />
    </div>
  );
};

export default TreatmentList;
