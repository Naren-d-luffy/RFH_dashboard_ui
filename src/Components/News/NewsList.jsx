
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Table } from "antd";
import { FiEdit, FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import Empty_survey_image from "../../Assets/Icons/Empty_survey_image.png";
import { showDeleteMessage, showSuccessMessage } from "../../globalConstant";
import { GoPlus } from "react-icons/go";
import { Instance } from "../../AxiosConfig";
import CreateNews from "./CreateNews";
import EditNews from "./EditNews";
import { deleteNews, setNews } from "../../Features/NewsSlice";
import { useDispatch, useSelector } from "react-redux";
import ViewNews from "./ViewNews";
import Loader from "../../Loader";

const NewsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewNewsModalOpen, setIsViewNewsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState({ content: [] });
  const [totalRows, setTotalRows] = useState(0);
  const news = useSelector((state) => state.news.news);
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  const itemsPerPage = 10;

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showEditModal = (news) => {
    setSelectedNews(news);
    setIsEditModalOpen(true);
  };
  const handleCancelEditModal = () => {
    setSelectedNews(null);
    setIsEditModalOpen(false);
  };

  const ShowNewsModal = (news) => {
    setSelectedNews(news);
    setIsViewNewsModalOpen(true);
  };
  const handleCancelNewsModal = () => {
    setSelectedNews(null);
    setIsViewNewsModalOpen(false);
  };

  const handleDeleteNews = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/cards/${_id}`);
          if (response.status === 200) {
            showSuccessMessage("Deleted successfully", "Details deleted");
            dispatch(deleteNews(_id));
          }
        } catch (error) {
          console.error("Error deleting news:", error);
        }
      },
    });
  };

  const fetchNewsList = useCallback( async (page) => {
    setIsLoading(true);
    try {
      const response = await Instance.get(`/cards`, {
        params: { page, limit: itemsPerPage },
      });
      
      setTotalRows(response.data.data.length);
      dispatch(setNews(response.data.data));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
    }
  },
  [dispatch, itemsPerPage]
);

  const dataSource = useMemo(() => {
    if (searchText.trim() === "") return Object.values(news); 
    return Object.values(news).filter((newsItem) =>
      `${newsItem.heading} ${newsItem.subheading}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [searchText, news]);
  

  useEffect(() => {
    fetchNewsList(currentPage);
  }, [currentPage,fetchNewsList]);

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  const columns = [
    {
      title: "Heading",
      dataIndex: "heading",
      className: "campaign-performance-table-column",
      sorter:(a,b)=>a.heading.localeCompare(b.heading)

    },
    {
      title: "SubHeading",
      dataIndex: "subheading",
      className: "campaign-performance-table-column",
    },
    {
      title: "About",
      dataIndex: "about",
      className: "campaign-performance-table-column",
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
            className="campaign-performance-table-edit-icon"
            onClick={() => showEditModal(record)}
          >
            <FiEdit />
          </div>

          <div
            className="campaign-performance-table-delete-icon"
            onClick={() => handleDeleteNews(record._id)}
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
      ) : Object.values(news).length > 0 ? (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <div className="user-engagement-header">
              <h3>News</h3>
            </div>
            <div className="d-flex align-items-center gap-3">
              <button
                className="d-flex gap-2 align-items-center rfh-basic-button"
                onClick={showModal}
              >
                <GoPlus />
                Create News
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
                  onChange: handleTableChange,
                }}
                className="campaign-performance-table overflow-y-auto"
                bordered={false}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="container">
          <div className="no-data-container">
            <img src={Empty_survey_image} alt="" />
          </div>
          <div className="no-data-container-text d-flex flex-column justify-content-center">
            <h4>No News Found</h4>
            <p>
              Currently, there are no News available to display.
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
      <CreateNews open={isModalOpen} handleCancel={handleCancel} />
      <EditNews
        open={isEditModalOpen}
        handleCancel={handleCancelEditModal}
        newsData={selectedNews}
      />
      <ViewNews
        open={isViewNewsModalOpen}
        handleCancel={handleCancelNewsModal}
        newsData={selectedNews}
      />
    </div>
  );
};

export default NewsList;
