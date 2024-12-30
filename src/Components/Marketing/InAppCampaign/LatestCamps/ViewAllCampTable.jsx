import React, { useEffect, useMemo, useState } from "react";
import { Table, Dropdown, Button, Space } from "antd";
import { FiEdit, FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";
import { FaAngleLeft, FaPlus } from "react-icons/fa6";
import Empty_survey_image from "../../../../Assets/Icons/Empty_survey_image.png";
import { showDeleteMessage } from "../../../../globalConstant";
import { GoPlus } from "react-icons/go";
import { Instance } from "../../../../AxiosConfig";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../Loader";
import { deleteFeature, setFeature } from "../../../../Features/FeatureSlice";
import { useNavigate } from "react-router-dom";
import ViewLatestCamp from "./ViewLatestCamp";
import EditCamps from "./EditCamp";
import AddLatestCamps from "./AddLatestCamp";

const ViewAllCampTable = () => {
  const [modals, setModals] = useState({
    addCamp: false,
    editCamp: false,
    viewCamp: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const [searchText, setSearchText] = useState("");
  const FeaturesData = useSelector((state) => state.features.features);
  const dispatch = useDispatch();
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const toggleModal = (modalType, camp = null) => {
    setSelectedCamp(camp);
    setModals((prev) => ({ ...prev, [modalType]: !prev[modalType] }));
  };

  const truncateText = (text, wordLimit = 15) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const dateObj = new Date(dateStr);
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchFeatureInfo = async (page) => {
    setIsLoading(true);
    try {
      const response = await Instance.get(`/camp`, {
        params: { page, limit: itemsPerPage },
      });
      setTotalRows(response.data?.length || 0);
      dispatch(setFeature(response.data));
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
          const response = await Instance.delete(`/camp/${_id}`);
          if (response.status === 200) {
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
    if (searchText.trim() === "") return FeaturesData;
    return FeaturesData.filter((camp) =>
      `${camp.title} ${camp.description}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [searchText, FeaturesData]);

  const columns = [
    {
      title: "Camp Name",
      dataIndex: "campName",
      key: "campName",
    },
    {
      title: "Hospital Name",
      dataIndex: "hospitalName",
      key: "hospitalName",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (text) => truncateText(text),
    },
    {
      title: "Pincode",
      dataIndex: "pinCode",
      key: "pinCode",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => formatDate(text),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="campaign-performance-table-action-icons">
          <div
            className="campaign-performance-table-eye-icon"
            onClick={() => toggleModal("viewCamp", record)}
          >
            <FiEye />
          </div>
          <div
            className="campaign-performance-table-edit-icon"
            onClick={() => toggleModal("editCamp", record)}
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
    },
  ];

  return (
    <div className="container mt-1">
      {isLoading ? (
        <Loader />
      ) : FeaturesData.length > 0 ? (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h3>Latest Camps</h3>
            <button
              className="d-flex gap-2 align-items-center rfh-basic-button"
              onClick={() => toggleModal("addCamp")}
            >
              <GoPlus />
              Add Camp
            </button>
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
                <Dropdown>
                  <Button>
                    <Space>
                      Sort By
                      <BiSortAlt2 />
                    </Space>
                  </Button>
                </Dropdown>
              </div>
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
            <button
              className="d-flex gap-2 align-items-center rfh-basic-button mt-2"
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
            <h4>No Camps Found</h4>
            <p>
              Currently, there are no Camps available to display.
              <br /> Please check back later or contact support for further
              assistance if this is an error.
            </p>
            <button
              className="rfh-basic-button"
              onClick={() => toggleModal("addCamp")}
            >
              <FaPlus /> Create Camp
            </button>
          </div>
        </div>
      )}
      <AddLatestCamps
        open={modals.addCamp}
        handleCancel={() => toggleModal("addCamp")}
      />
      <EditCamps
        open={modals.editCamp}
        handleCancel={() => toggleModal("editCamp")}
        campDataa={selectedCamp}
      />
      <ViewLatestCamp
        open={modals.viewCamp}
        handleCancel={() => toggleModal("viewCamp")}
        campDataa={selectedCamp}
      />
    </div>
  );
};

export default ViewAllCampTable;
