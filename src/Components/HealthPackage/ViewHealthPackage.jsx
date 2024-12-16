import React, { useState, useEffect } from "react";
import { Button, Modal, Rate } from "antd";
import image1 from "../../Assets/Images/health-package.png";

const ViewHealthPackage = ({ open, handleCancel, packageData }) => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    if (packageData) {
      setFeatures(packageData.features || []);
    }
  }, [packageData]);

  return (
    <Modal
      visible={open}
      onCancel={handleCancel}
      width={680}
      footer={[
        <Button
          key="back"
          onClick={handleCancel}
          className="create-campaign-cancel-button  me-4"
        >
          Back
        </Button>,
      ]}
      className="view-health-package-modal"
    >
      <div className="health-package-modal-container">
        {/* Header */}
        <div className="health-package-modal-header d-flex justify-content-between align-items-center">
          <h4>{packageData?.packageName || "N/A"}</h4>
          <img src={image1} alt="Health Package" />
        </div>

        {/* Package Details */}
        <div className="health-package-modal-content">
          
          <h5>INR {packageData?.price || "N/A"}</h5>
           <Rate disabled allowHalf value={packageData?.rating || 0} style={{fontSize:"14px"}}/> ({packageData?.rating})
          <h6 className="mt-4">{packageData?.descriptionOne || "N/A"}</h6>
          <h6>{packageData?.descriptionTwo || "N/A"}</h6>
          <div className="package-detail-item">
            <strong>Features:</strong>
            <ul>
              {features.length > 0 ? (
                features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))
              ) : (
                <li>N/A</li>
              )}
            </ul>
          </div>
          <div className="package-detail-item">
            <strong>Duration:</strong> {packageData?.duration || "N/A"}
          </div>
          <div className="package-detail-item">
            <strong>Billing Cycle:</strong> {packageData?.billingCycle || "N/A"} months
          </div>

          
        </div>
      </div>
    </Modal>
  );
};

export default ViewHealthPackage;
