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
import {
  deleteTreatment,
  setTreatment,
} from "../../../../Features/TreatmentInfoSlice";
import DOMPurify from "dompurify";
import EditTreatmentsInfo from "./EditTreatmentsInfo";
import ViewTreatmentsInfo from "./ViewTreatmentsInfo";
import AddTreatmentsInfo from "./AddTreatmentsInfo";
import { useNavigate } from "react-router-dom";

const TreatmentList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [treatmentList, setTreatmentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const navigate = useNavigate();

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
            dispatch(deleteTreatment(_id));
          }
        } catch (error) {
          console.error("Error deleting treatment:", error);
        }
      },
    });
  };
  const fetchTreatmentsInfo = async (page) => {
    setIsLoading(true);
    try {
      const response = await Instance.get(`/education`, {
        params: { page, limit: itemsPerPage },
      });
      dispatch(setTreatment(response?.data?.educations));
      setTreatmentList(response.data?.educations || []);
      setTotalRows(response.data?.totalEducations || 0);
    } catch (error) {
      console.error("Error fetching treatments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTreatmentsInfo(currentPage);
  }, [currentPage]);

  const dataSource = useMemo(() => {
    if (searchText.trim() === "") return treatmentData;
    return treatmentData.filter((treatment) =>
      `${treatment.title}{}${treatment.description}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [searchText, treatmentData]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      className: "campaign-performance-table-column",
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

  return (
    <div className="container mt-1">
      {isLoading ? (
        <Loader />
      ) : treatmentData.length > 0 ? (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <div className="user-engagement-header">
              <h3>Treatment Info</h3>
            </div>
            <div className="d-flex align-items-center gap-3">
              <button
                className="d-flex gap-2 align-items-center rfh-basic-button"
                onClick={showModal}
              >
                <GoPlus />
                Add Treatment
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

              <div className="d-flex gap-2">
                <Dropdown menu={menuProps}>
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
                className="campaign-performance-table overflow-y-auto"
                bordered={false}
              />
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
      <AddTreatmentsInfo open={isModalOpen} handleCancel={handleCancel} />
      <EditTreatmentsInfo
        open={isEditModalOpen}
        handleCancel={handleEditCancel}
        treatmentData={selectedTreatment}
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
