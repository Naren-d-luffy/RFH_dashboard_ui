import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, message, Select, Upload } from "antd";
import { Instance } from "../../../../AxiosConfig";
import { showSuccessMessage } from "../../../../globalConstant";
import { useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa6";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { editFeature } from "../../../../Features/FeatureSlice";
const { TextArea } = Input;
const { Option } = Select;
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic"],
    ["link", "image"],
    ["clean"],
  ],
};
const ViewFeaturedModal = ({ open, handleCancel, featuresData }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [features, setFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (featuresData) {
      setTitle(featuresData.title || "");
      setDescription(featuresData.description || "");
      setContent(DOMPurify.sanitize(featuresData.content || ""));
      setUploadedImage(featuresData.thumbnail || null);
      setFeatures(featuresData.tags || []);
    }
  }, [featuresData]);

  return (
    <Modal
      visible={open}
      
      onCancel={handleCancel}
      width={680}
      className="view-health-package-modal"
      footer={[
        <Button
          key="back"
          onClick={handleCancel}
          className="create-campaign-cancel-button me-4"
        >
          Back
        </Button>,
        
      ]}
    >
      <div className="health-package-modal-container">
        <div className="health-package-modal-header d-flex justify-content-between align-items-center">
          <h4>{featuresData?.title || "N/A"}</h4>
          <img src={featuresData?.thumbnail} alt="Health Package" />
        </div>

        <div className="health-package-modal-content">
          <h6>{featuresData?.description || "N/A"}</h6>
          <div className="package-detail-item">
            <strong>Features:</strong>
            <ul>
              {features.length > 0 ? (
                features.map((feature, index) => <li key={index}>{feature}</li>)
              ) : (
                <li>N/A</li>
              )}
            </ul>
          </div>

          <div
            className="news-content"
            style={{ color: "var(--text-color)" }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ViewFeaturedModal;
