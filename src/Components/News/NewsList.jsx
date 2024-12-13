import React, { useEffect, useState } from "react";
import { Table, Dropdown, Button, Space, Input } from "antd";
import { FiEdit, FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import Empty_survey_image from "../../Assets/Icons/Empty_survey_image.png";
import { useNavigate } from "react-router-dom";
import { showDeleteMessage } from "../../globalConstant";
import { filterDropdown } from "../../globalConstant";
import { VscSettings } from "react-icons/vsc";
import { GoPlus } from "react-icons/go";
import {Instance} from "../../AxiosConfig";
import dayjs from "dayjs";
import CreateNews from "./CreateNews";
const NewsList = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDeleteReply = async (_id) => {
    try {
      const response = await Instance.delete(`/cards/${_id}`);
      if (response.status === 200) {
        showDeleteMessage({ message: "" });
      }
    } catch (error) {
      console.log(error)
    } 
  };

  const [newsList, setNewsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState({ content: [] });
  const [totalRows, setTotalRows] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const itemsPerPage = 10;

  const fetchNewsList = async (page) => {
    try {
      const response = await Instance.get(`/cards`, {
        params: { page, limit: itemsPerPage },
      });
      setNewsList(response.data || []);
      setTotalRows(response.data.length);
      console.log("response", response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNewsList(currentPage);
  }, [currentPage]);

  const columns = [
    {
      title: "Heading",
      dataIndex: "heading",
      className: "campaign-performance-table-column",
    },
    // {
    //   title: "Date",
    //   dataIndex: "timeStamp",
    //   className: "campaign-performance-table-column",
    //   render: (timeStamp) => dayjs(timeStamp).format("YYYY-MM-DD"),
    // },
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
            // onClick={handleClick}
          >
            <FiEye />
          </div>
          <div className="campaign-performance-table-edit-icon">
            <FiEdit />
          </div>
          <div
            className="campaign-performance-table-delete-icon"
            onClick={() => handleDeleteReply(record._id)}
          >
            <FiTrash2 />
          </div>
        </div>
      ),
      className: "campaign-performance-table-column",
    },
  ];

  const items = [
    {
      label: "Last Day",
      key: "1",
    },
    {
      label: "Last week",
      key: "2",
    },
    {
      label: "Last Month",
      key: "3",
    },
  ];
  const handleMenuClick = ({ key }) => {};
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  const handleCheckboxChange = (value, checked) => {
    if (checked) {
      setSelectedValues((prev) => [...prev, value]);
    } else {
      setSelectedValues((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleApply = () => {
    console.log("Applied Filters:", selectedValues);
    setIsDropdownOpen(false);
  };
  const handleReset = () => {
    setSelectedValues([]);
  };
  const options = [
    {
      label: "Type",
      options: [
        { label: "All", value: "all" },
        { label: "OPD", value: "opd" },
        { label: "IPD", value: "ipd" },
      ],
    },
    {
      label: "Last Visit",
      options: [
        { label: "Last 7 days", value: "last7days" },
        { label: "Last 30 days", value: "last30days" },
      ],
    },
    {
      label: "All Users",
      options: [
        { label: "Active Users", value: "activeusers" },
        { label: "Inactive Users", value: "inactiveusers" },
      ],
    },
  ];

  return (
    <div className="container mt-1">
      {newsList.length > 0 ? (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <div className="user-engagement-header">
              <h3>News </h3>
            </div>
            <div className="d-flex align-items-center gap-3">
              <button className="d-flex gap-2 align-items-center rfh-basic-button" onClick={showModal}>
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
                  />
                </div>

                <div className="d-flex gap-2">
                  <Dropdown menu={menuProps}>
                    <Button>
                      <Space>
                        Sort By
                        <BiSortAlt2 />
                      </Space>
                    </Button>
                  </Dropdown>
                  <Dropdown
                    overlay={filterDropdown(
                      options,
                      selectedValues,
                      handleCheckboxChange,
                      handleApply,
                      handleReset
                    )}
                    trigger={["click"]}
                    open={isDropdownOpen}
                    onOpenChange={setIsDropdownOpen}
                    placement="bottomLeft"
                  >
                    <Button style={{ width: 160 }}>
                      <VscSettings />
                      Filters
                    </Button>
                  </Dropdown>
                </div>
              </div>
            <div className="mt-3">
              <Table
                columns={columns}
                dataSource={newsList}
                pagination={false}
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
              assistance if this is an error
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

    </div>
  );
};

export default NewsList;
