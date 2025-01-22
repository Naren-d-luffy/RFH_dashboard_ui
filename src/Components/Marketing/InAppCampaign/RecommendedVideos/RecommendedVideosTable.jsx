import React, { useEffect, useMemo, useState } from "react";
import { Table, Dropdown, Button, Space } from "antd";
import { FiEdit, FiSearch, FiTrash2 } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";
import { FaAngleLeft, FaPlus } from "react-icons/fa6";
import { Instance } from "../../../../AxiosConfig";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../Loader";
import { useNavigate } from "react-router-dom";
import {
  deleteRecommendedVideos,
  setRecommendedVideos,
} from "../../../../Features/RecommendedVideosSlice";
import AddRecommendedVideos from "./AddRecommendedVideos";
import EditRecommendedVideos from "./EditRecommendedVideos";
import Empty_survey_image from "../../../../Assets/Icons/Empty_survey_image.png";

const RecommendedVideosTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recommendedVideos = useSelector(
    (state) => state.recommendedvideos.recommendedvideos || []
  );

  const itemsPerPage = 10;

  const fetchRecommendedVideos = async () => {
    setIsLoading(true);
    try {
      const response = await Instance.get("/recommended");
      dispatch(setRecommendedVideos(response.data));
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendedVideos();
  }, []);

  const handleDeleteVideo = async (videoId) => {
    try {
      await Instance.delete(`/recommended/${videoId}`);
      dispatch(deleteRecommendedVideos(videoId));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const dataSource = useMemo(() => {
    if (!searchText) return recommendedVideos;
    return recommendedVideos.filter((video) =>
      video.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, recommendedVideos]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      className: "campaign-performance-table-column",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Video URL",
      dataIndex: "video_URL",
      className: "campaign-performance-table-column",
      render: (text, record) => {
        if (text) {
          return (
            <a href={text} target="_blank" rel="noopener noreferrer">
              {text}
            </a>
          );
        }
        if (record.Video_file) {
          return (
            <a
              href={record.Video_file}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Video File
            </a>
          );
        }
        return <span>No video available</span>;
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      className: "campaign-performance-table-column",
      render: (text) => new Date(text).toLocaleDateString(),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt), 

    },
    {
      title: "Actions",
      key: "actions",
      className: "campaign-performance-table-column",
      render: (_, record) => (
        <div className="campaign-performance-table-action-icons">
          <div
            className="campaign-performance-table-edit-icon"
            onClick={() => {
              setSelectedVideo(record);
              setIsEditModalOpen(true);
            }}
          >
            <FiEdit />
          </div>
          <div
            className="campaign-performance-table-delete-icon"
            onClick={() => handleDeleteVideo(record._id)}
          >
            <FiTrash2 />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-1">
      {isLoading ? (
        <Loader />
      ) : recommendedVideos.length > 0 ? (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <div className="user-engagement-header">
              <h3>Recommended Videos</h3>
            </div>
            <div className="d-flex align-items-center gap-3">
              <Button
                className="rfh-basic-button"
                icon={<FaPlus />}
                onClick={() => setIsModalOpen(true)}
              >
                Add Video
              </Button>
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
                {/* <Dropdown
                  menu={{
                    items: [
                      { label: "Sort by Name", key: "name" },
                      { label: "Sort by Likes", key: "likes" },
                    ],
                    onClick: ({ key }) => console.log("Sort by:", key),
                  }}
                >
                  <Button>
                    <Space>
                      Sort By
                      <BiSortAlt2 />
                    </Space>
                  </Button>
                </Dropdown> */}
              </div>
            </div>

            <div className="mt-3">
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{
                  current: currentPage,
                  pageSize: itemsPerPage,
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
            <h4>No Videos Found</h4>
            <p>
              Currently, there are no videos available to display.
              <br /> Please check back later or contact support for further
              assistance if this is an error.
            </p>
            <div className="d-flex justify-content-center">
              <Button
                className="rfh-basic-button"
                onClick={() => setIsModalOpen(true)}
              >
                <FaPlus /> Create Video
              </Button>
            </div>
          </div>
        </div>
      )}

      <AddRecommendedVideos
        open={isModalOpen}
        handleCancel={() => setIsModalOpen(false)}
      />
      <EditRecommendedVideos
        open={isEditModalOpen}
        handleCancel={() => setIsEditModalOpen(false)}
        videoData={selectedVideo}
      />
    </div>
  );
};

export default RecommendedVideosTable;
