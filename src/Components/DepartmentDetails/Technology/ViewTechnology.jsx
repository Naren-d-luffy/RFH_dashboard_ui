import React, { useState } from "react";
import { Button, Modal } from "antd";
import Loader from "../../../Loader";

const ViewTechnology = ({ open, handleCancel, EventData }) => {
  const [isLoading, setIsLoading] = useState(false);

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
          <div className="view-treatment-info-modal-header  d-flex justify-content-between align-items-center">
            <h4>{EventData?.name || "N/A"}</h4>
            <img src={EventData?.image} alt="Clinic" />
          </div>

          <div className="view-treatment-info-modal-content">
            <h5>{EventData?.about || "N/A"}</h5>
            <div>
              <p>
                <strong>Address:</strong> {EventData?.location || "N/A"}
              </p>
              <p>
                <strong>Rating:</strong> {EventData?.rating || "N/A"}
              </p>
              <p>
                <strong>Reviews:</strong> {EventData?.reviews || "N/A"}
              </p>
              <p>
                <strong>Patients:</strong> {EventData?.patients || "N/A"}
              </p>
              <p>
                <strong>Experience:</strong> {EventData?.experience || "N/A"}{" "}
                years
              </p>
              <p>
                <strong>Timing:</strong> {EventData?.timing || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewTechnology;
