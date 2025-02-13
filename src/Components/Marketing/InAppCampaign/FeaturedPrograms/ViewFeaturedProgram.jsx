import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

const ViewFeaturedModal = ({ open, handleCancel, featuresData }) => {
  const [, setUploadedImage] = useState(null);
  const [, setTitle] = useState("");
  const [, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [features, setFeatures] = useState([]);

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
              {features?.length > 0 ? (
                features?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))
              ) : (
                <li>N/A</li>
              )}
            </ul>
          </div>

          <div
            className="news-content"
            style={{ color: "var(--text-color)" }}
            dangerouslySetInnerHTML={{
              __html: content?.replace(
                /<img/g,
                '<img style="max-width: 100%; max-height: 150px; height: auto; object-fit: cover;"'
              ),
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ViewFeaturedModal;
