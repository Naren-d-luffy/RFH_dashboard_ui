import React, { useState } from "react";
import { Button, Modal } from "antd";
import "react-quill/dist/quill.snow.css";
import Loader from "../../../../Loader";

const ViewBlog = ({ open, handleCancel, blogData }) => {
  const [isLoading] = useState(false);
  return (
    <>
      {isLoading && <Loader />}
      <Modal
        visible={open}
        onCancel={handleCancel}
        width={750}
        className="view-treatment-info-modal"
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
        <div className="view-treatment-info-modal-container">
          <div className="view-treatment-info-modal-header d-flex justify-content-between align-items-center">
            <h4>{blogData?.heading || "N/A"}</h4>
            <img src={blogData?.image} alt="Health Package" />
          </div>

          <div className="view-treatment-info-modal-content">
            <h5>{blogData?.subHeading || "N/A"}</h5>

            <div
              className="news-content"
              dangerouslySetInnerHTML={{ __html: blogData?.content }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ViewBlog;
