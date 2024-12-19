import React, { useEffect, useMemo, useState } from "react";
import { Table } from "antd";
import { FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Instance } from "../../AxiosConfig";
import { deletePost, setPost } from "../../Features/PostSlice";
import { showDeleteMessage } from "../../globalConstant";
import ViewPost from "./ViewPost";
import Loader from "../../Loader";
import { FaPlus } from "react-icons/fa6";
import Empty_survey_image from "../../Assets/Icons/Empty_survey_image.png";

const CommunityPost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isViewPostModalOpen, setIsViewPostModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.post || []);
  const itemsPerPage = 10;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const fetchPostList = async (page) => {
    setIsLoading(true);
    try {
      const response = await Instance.get(`/post`, {
        params: { page, limit: itemsPerPage },
      });

      if (response.status === 200) {
        const { data, total } = response.data;
        dispatch(setPost(data));
        setTotalRows(total);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const ShowNewsModal = (post) => {
    setSelectedPost(post);
    setIsViewPostModalOpen(true);
  };

  const handleCancelPostModal = () => {
    setIsViewPostModalOpen(false);
  };

  const handleDeletePost = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/post/${_id}`);
          if (response.status === 200) {
            dispatch(deletePost(_id));
          }
        } catch (error) {
          console.error("Error deleting post:", error);
        }
      },
    });
  };

  const dataSource = useMemo(() => {
    if (!searchText.trim()) return posts;
    return posts.filter((post) =>
      `${post.title} ${post.content}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [searchText, posts]);

  useEffect(() => {
    fetchPostList(currentPage);
  }, [currentPage]);

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Reports",
      dataIndex: "reportCounts",
      key: "reports",
    },
    {
      title: "Likes",
      dataIndex: "likeCounts",
      key: "likes",
    },
    {
      title: "Comments",
      dataIndex: "commentCounts",
      key: "comments",
    },
    {
      title: "Shares",
      dataIndex: "shareCounts",
      key: "shares",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="campaign-performance-table-action-icons">
          <div
            className="campaign-performance-table-eye-icon"
            onClick={() => ShowNewsModal(record)}
          >
            <FiEye />
          </div>
          <div
            className="campaign-performance-table-delete-icon"
            onClick={() => handleDeletePost(record._id)}
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
      ) : (
        <>
          <div className="header">
            <h3 style={{ color: "var(--black-color)" }}>Reported Post List</h3>
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
              {posts.length > 0 ? (
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  pagination={{
                    current: currentPage,
                    pageSize: itemsPerPage,
                    total: totalRows,
                    onChange: handleTableChange,
                  }}
                  className="campaign-performance-table overflow-y-auto"
                  bordered={false}
                  rowKey="_id"
                />
              ) : (
                <div className="container">
                  <div className="no-data-container">
                    <img src={Empty_survey_image} alt="" />
                  </div>
                  <div className="no-data-container-text d-flex flex-column justify-content-center">
                    <h4>No Posts Found</h4>
                    <p>
                      Currently, there are no Posts available to display.
                      <br /> Please check back later or contact support for
                      further assistance if this is an error.
                    </p>
                    <div className="d-flex justify-content-center">
                      <button className="rfh-basic-button" onClick={showModal}>
                        <FaPlus /> Create Post
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <ViewPost
            open={isViewPostModalOpen}
            handleCancel={handleCancelPostModal}
            newsData={selectedPost}
          />
        </>
      )}
    </div>
  );
};

export default CommunityPost;
