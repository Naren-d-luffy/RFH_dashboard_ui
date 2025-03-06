import React, { useState } from "react";
import { Button, Modal } from "antd";
import Loader from "../../../../Loader";

const ViewOutstationClinic = ({ open, handleCancel, EventData }) => {
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
          <div className="view-treatment-info-modal-header  d-flex justify-content-between align-items-center">
            <h4>{EventData?.name || "N/A"}</h4>
            <img src={EventData?.image} alt="Clinic" />
          </div>

          <div className="view-treatment-info-modal-content">
            <h5>{EventData?.about || "N/A"}</h5>
            <div>
              <p>
                <strong>Clinic Type:</strong> {EventData?.type || "N/A"}
              </p>
              <p>
                <strong>Clinic Name:</strong> {EventData?.name || "N/A"}
              </p>
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

              <p>
                <strong>Appointment:</strong> {EventData?.appointment || "N/A"}
              </p>
              {/* <p>
                <strong>Content:</strong> {EventData?.content || "N/A"}
              </p> */}
              <div
                className="news-content"
                style={{ color: "var(--text-color)" }}
                dangerouslySetInnerHTML={{
                  __html: EventData?.content?.replace(
                    /<img/g,
                    '<img style="max-width: 100%; max-height: 150px; height: auto; object-fit: cover;"'
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewOutstationClinic;
