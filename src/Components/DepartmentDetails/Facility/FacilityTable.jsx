import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Table, message } from "antd";
import { FiEdit, FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import { FaAngleLeft, FaPlus } from "react-icons/fa6";
import Empty_survey_image from "../../../Assets/Icons/Empty_survey_image.png";
import { showDeleteMessage, showSuccessMessage } from "../../../globalConstant";
import { GoPlus } from "react-icons/go";
import { Instance } from "../../../AxiosConfig";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Loader";
import { useNavigate } from "react-router-dom";
import AddFacility from "./AddFacility";
import EditFacility from "./EditFacility";
import ViewFacility from "./ViewFacility";
import { deleteFacility, setFacility } from "../../../Features/FacilitySlice";
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

const FacilityTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedReadingMaterial, setSelectedReadingMaterial] = useState(null);
  const [searchText, setSearchText] = useState("");
  const facilities = useSelector((state) => state.facility.facilities);
  console.log("facilities", facilities);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemsPerPage = 10;
  const [items, setItems] = useState([]); // Local state for draggable items

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const showEditModal = (facility) => {
    setSelectedFacility(facility);
    setIsEditModalOpen(true);
  };

  const showViewModal = (facility) => {
    setSelectedReadingMaterial(facility);
    setIsViewModalOpen(true);
  };
  const truncateText = (text, wordLimit = 15) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const handleEditCancel = () => setIsEditModalOpen(false);
  const handleViewCancel = () => setIsViewModalOpen(false);

  // const fetchFacilitiesInfo = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await Instance.get(`/depcat/facility`);
  //     if (response.data) {
      
  //       const sortedData = response.data.sort(
  //         (a, b) => a.position - b.position
  //       );
  //       dispatch(setFacility(sortedData));
  //       setItems(sortedData);
  //       setTotalRows(sortedData.length || 0);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching facilities:", error);
  //     message.error("Failed to fetch facilities");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
 const fetchFacilitiesInfo = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await Instance.get("/depcat/facility");
      // Sort the data by position before setting it
      const sortedData = response.data.sort((a, b) => a.position - b.position);
      dispatch(setFacility(sortedData));
      setItems(sortedData);
      setTotalRows(sortedData.length || 0);
    } catch (error) {
      console.error("Error fetching facilities list:", error);
      message.error("Failed to fetch facilities list");
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

 useEffect(() => {
  fetchFacilitiesInfo(currentPage);
   }, [currentPage, fetchFacilitiesInfo]);
 
   useEffect(() => {
     if (facilities && facilities.length > 0) {
       const updatedItems = facilities.map((item, index) => ({
         ...item,
         position: index + 1,
       }));
       setItems(updatedItems);
     }
   }, [facilities]);

  const handleDeleteFacility = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/depcat/facility/${_id}`);
          if (response.status === 200 || response.status === 204) {
            showSuccessMessage("Deleted successfully", "Details deleted");
            dispatch(deleteFacility(_id));
          }
        } catch (error) {
          console.error("Error deleting facility:", error);
          message.error("Error deleting facility", error);
        }
      },
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
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
        const response = await Instance.patch("/depcat/facility", {
          facilities: updatePayload,
        });

        if (response.status === 200) {
          // Update Redux store with the new order
          dispatch(setFacility(newItems));
          message.success("Order updated successfully");

          // Fetch the updated list to ensure consistency
          await fetchFacilitiesInfo();
        }
      } catch (error) {
        console.error("Error updating order:", error);
        message.error("Failed to update order");
        // Reset to original order
        await fetchFacilitiesInfo();
      }
    },
    [items, dispatch, fetchFacilitiesInfo]
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
      cursor: "move",
      backgroundColor: isDragging ? "#fafafa" : undefined,
      zIndex: isDragging ? 999 : undefined,
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

  const columns = [
    {
      title: "Sl No",
      dataIndex: "position",
      className: "campaign-performance-table-column",
    },
    {
      title: "Title",
      dataIndex: "heading",
      className: "campaign-performance-table-column",
      render: (text) => truncateText(text),
      sorter: (a, b) => a.heading.localeCompare(b.heading),
    },
    {
      title: "Sub Heading",
      dataIndex: "subHeading",
      className: "campaign-performance-table-column",
      sorter: (a, b) => a.subHeading.localeCompare(b.subHeading),
    },
    {
      title: "Video Heading",
      dataIndex: "video_heading",
      className: "campaign-performance-table-column",
    },
    {
      title: "Created At",
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
            onClick={() => handleDeleteFacility(record._id)}
          >
            <FiTrash2 />
          </div>
        </div>
      ),
      className: "campaign-performance-table-column",
    },
  ];

  // const filteredData = useMemo(() => {
  //   if (!facilities) return [];

  //   let data = [...facilities];

  //   if (searchText) {
  //     data = data.filter(
  //       (item) =>
  //         (item.heading?.toLowerCase() || "").includes(
  //           searchText.toLowerCase()
  //         ) ||
  //         (item.subHeading?.toLowerCase() || "").includes(
  //           searchText.toLowerCase()
  //         ) ||
  //         (item.video_heading?.toLowerCase() || "").includes(
  //           searchText.toLowerCase()
  //         )
  //     );
  //   }

  //   return data;
  // }, [facilities, searchText]);

  
    const filteredData = useMemo(() => {
      if (!items.length) return [];
      if (searchText.trim() === "") return items;
  
      return items.filter((technology) =>
        `${technology.heading} ${technology.subHeading}`
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    }, [items, searchText]);

      const handleFacilityAdded = useCallback(async (newFacility) => {
        // Fetch the complete list after adding new technology
        await fetchFacilitiesInfo();
        
        // Calculate the current page based on the new technology's position
        const newPosition = newFacility.position;
        const newPage = Math.ceil(newPosition / itemsPerPage);
        setCurrentPage(newPage);
      }, [fetchFacilitiesInfo, itemsPerPage]);

  return (
    <div className="container mt-1">
      {isLoading ? (
        <Loader />
      ) : facilities?.length > 0 ? (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <div className="user-engagement-header">
              <h3>Department Facility</h3>
            </div>
            <div className="d-flex align-items-center gap-3">
              <button
                className="d-flex gap-2 align-items-center rfh-basic-button"
                onClick={showModal}
              >
                <GoPlus />
                Add Facility
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
                  items={filteredData.map((item) => item._id)}
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
                    dataSource={filteredData}
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
              onClick={() => navigate("/department-details")}
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
                <FaPlus /> Create Facility
              </button>
            </div>
          </div>
        </div>
      )}

      <AddFacility open={isModalOpen} handleCancel={handleCancel} onFacilityAdded={handleFacilityAdded}/>
      <EditFacility
        open={isEditModalOpen}
        handleCancel={handleEditCancel}
        facilityData={selectedFacility}
        onFacilityAdded={handleFacilityAdded}
      />
      <ViewFacility
        open={isViewModalOpen}
        handleCancel={handleViewCancel}
        facilityData={selectedReadingMaterial}
      />
    </div>
  );
};

export default FacilityTable;
