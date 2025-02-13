import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Table, message } from "antd";
import { FiEdit, FiSearch, FiTrash2 } from "react-icons/fi";
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
import {
  deleteHelloDoctorVideos,
  setHelloDoctorVideos,
} from "../../../../Features/HelloDoctorSlice";
import AddVideo from "./AddVideo";
import EditVideo from "./EditVideo";

const HelloDoctorTable = () => {
  const EventData = useSelector((state) => state.videos.videos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const showEditModal = (video) => {
    setSelectedVideo(video);
    setIsEditModalOpen(true);
  };
  const handleEditCancel = () => setIsEditModalOpen(false);

  const truncateText = (text, wordLimit = 15) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const handleDeleteHelloDoctorVideo = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/videos/${_id}`);
          if (response.status === 200 || response.status === 204) {
            showSuccessMessage("Deleted successfully video");
            dispatch(deleteHelloDoctorVideos(_id));
          }
        } catch (error) {
          console.error("Error deleting video:", error);
          message.error("Error deleting video");
        }
      },
    });
  };

  const fetchHelloDoctorVideoInfo = useCallback(
    async (page = 1) => {
      setIsLoading(true);
      try {
        const response = await Instance.get(`/videos`, {
          params: { page, limit: itemsPerPage },
        });
        dispatch(setHelloDoctorVideos(response.data.data));
        setTotalRows(response.data.total || 0);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [itemsPerPage, dispatch]
  );

  useEffect(() => {
    fetchHelloDoctorVideoInfo(currentPage);
  }, [currentPage, fetchHelloDoctorVideoInfo]);

  const dataSource = useMemo(() => {
    const events = Object.values(EventData).reverse(); 
    if (searchText.trim() === "") return events;
    return events.filter((video) =>
      `${video.title} ${video.url} ${video.likes}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [searchText, EventData]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      className: "campaign-performance-table-column",
      render: (text) => truncateText(text),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "URL",
      dataIndex: "url",
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
            className="campaign-performance-table-edit-icon"
            onClick={() => showEditModal(record)}
          >
            <FiEdit />
          </div>
          <div
            className="campaign-performance-table-delete-icon"
            onClick={() => handleDeleteHelloDoctorVideo(record._id)}
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
      ) : Object.values(EventData).length > 0 ? (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <div className="user-engagement-header">
              <h3>Hello Doctor Info</h3>
            </div>
            <div className="d-flex align-items-center gap-3">
              <button
                className="d-flex gap-2 align-items-center rfh-basic-button"
                onClick={showModal}
              >
                <GoPlus />
                Add Video
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
      <AddVideo open={isModalOpen} handleCancel={handleCancel} />
      <EditVideo
        open={isEditModalOpen}
        handleCancel={handleEditCancel}
        videoData={selectedVideo}
      />
    </div>
  );
};

export default HelloDoctorTable;
