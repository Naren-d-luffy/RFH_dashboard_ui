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
import AddFeaturesModal from "./AddFeaturedProgram";
import EditFeaturesModal from "./EditFetauredProgram";
import ViewFeaturedModal from "./ViewFeaturedProgram";
import { deleteFeature, setFeature } from "../../../../Features/FeatureSlice";
import { useNavigate } from "react-router-dom";
const FeaturesTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const FeaturesData = useSelector((state) => state.features.features);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const itemsPerPage = 10;
  const navigate = useNavigate();
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

  const fetchFeatureInfo = async (page) => {
    setIsLoading(true);
    try {
      const response = await Instance.get(`/discover/featuredProgram`, {
        params: { page, limit: itemsPerPage },
      });
      setTotalRows(response.data?.length || 0);
      dispatch(setFeature(response.data.data));
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatureInfo(currentPage);
  }, [currentPage]);

  const handleDeleteFeature = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(
            `/discover/featuredProgram/${_id}`
          );
          if (response.status === 200) {
            showSuccessMessage("Deleted successfully", "Details deleted");
            dispatch(deleteFeature(_id));
            console.log(response);
          }
        } catch (error) {
          console.error("Error deleting feature:", error);
        }
      },
    });
  };

  const dataSource = useMemo(() => {
    if (searchText.trim() === "") return (FeaturesData);
    return (FeaturesData).filter((feature) =>
      `${feature.title}{}${feature.description}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [searchText, FeaturesData]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => truncateText(text),
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
            onClick={() => handleDeleteFeature(record._id)}
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
      ) :(FeaturesData).length > 0 ? (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h3>Feature Programs</h3>

            <div className="d-flex align-items-center gap-3">
              <button
                className="d-flex gap-2 align-items-center rfh-basic-button"
                onClick={showModal}
              >
                <GoPlus />
                Add Feature
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
              />
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
      <AddFeaturesModal open={isModalOpen} handleCancel={handleCancel} />
      <EditFeaturesModal
        open={isEditModalOpen}
        handleCancel={handleEditCancel}
        featuresData={selectedEvent}
      />
      <ViewFeaturedModal
        open={isViewModalOpen}
        handleCancel={handleViewCancel}
        featuresData={selectedEvent}
      />
    </div>
  );
};

export default FeaturesTable;
