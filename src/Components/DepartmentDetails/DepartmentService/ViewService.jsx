import React, { useState } from "react";
import { Button, Modal } from "antd";
import "react-quill/dist/quill.snow.css";
import Loader from "../../../Loader";

const ViewService = ({ open, handleCancel, serviceData }) => {
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
            <h4>{serviceData?.heading || "N/A"}</h4>
            <img src={serviceData?.thumbnail} alt="Health Package" />
          </div>

          <div className="view-treatment-info-modal-content">
            <h5>{serviceData?.subHeading || "N/A"}</h5>
             <div
              className="news-content"
              dangerouslySetInnerHTML={{
                __html: serviceData?.content?.replace(
                  /<img/g,
                  '<img style="max-width: 100%; max-height: 150px; height: auto; object-fit: cover;"'
                ),
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ViewService;
