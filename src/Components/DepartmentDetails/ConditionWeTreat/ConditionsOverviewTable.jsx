import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Table } from "antd";
import {  FiSearch } from "react-icons/fi";
import { Instance } from "../../../AxiosConfig";
import Loader from "../../../Loader";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

const ConditionOverviewTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
const[data,setData]=useState([])

  const [searchText, setSearchText] = useState("");
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const fetchGastroIllnessInfo = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await Instance.get(`/gastro`);
      const filteredData = response.data.data.filter(item => item.condition === true);
      setData(filteredData);
    } catch (error) {
      console.error("Error fetching overview:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGastroIllnessInfo(currentPage);
  }, [currentPage, fetchGastroIllnessInfo]);

  const dataSource = useMemo(() => {
    if (searchText.trim() === "") return data;
    return data.filter((event) =>
        `${event.title} ${event.description} ${event.content}`
    .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [searchText, data]);
  

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
 
  const columns = [
   
    {
      title: "Type",
      dataIndex: "type",
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
    
  ];

  return (
    <div className="container mt-5">
    <div className="d-flex justify-content-between align-items-center">
      <div className="user-engagement-header">
        <h3>Overview</h3>
      </div>
    </div>
  
    {isLoading ? (
      <Loader />
    ) : data?.length > 0 ? (
      <>
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
        {/* <div className="d-flex justify-content-start mt-2">
          <button
            className="d-flex gap-2 align-items-center rfh-basic-button"
            onClick={() => navigate("/marketing/in-app-campaign")}
          >
            <FaAngleLeft />
            Back
          </button>
        </div> */}
      </>
    ) : (
      <div className="container">
        <div className="no-data-container-text d-flex flex-column justify-content-center">
          <h4>No data Found</h4>
        </div>
      </div>
    )}
  </div>
  
  );
};

export default ConditionOverviewTable;
