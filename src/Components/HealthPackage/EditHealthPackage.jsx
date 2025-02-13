import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, message, Select } from "antd";
import { Instance } from "../../AxiosConfig";
import { showSuccessMessage } from "../../globalConstant";
import { useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa6";
import { editHealthPackage } from "../../Features/HealthPackageSlice";

const { TextArea } = Input;
const { Option } = Select;

const EditHealthPackage = ({ open, handleCancel, packageData }) => {
  const [features, setFeatures] = useState([]);
  const [formData, setFormData] = useState({
    packageName: "",
    price: "",
    rating: "",
    descriptionOne: "",
    descriptionTwo: "",
    features: [],
    duration: "monthly",
    billingCycle: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // Prepopulate form data when selectedPackage changes
  useEffect(() => {
    console.log("Selected Package:", packageData);
    if (packageData) {
      setFormData({
        packageName: packageData.packageName || "",
        price: packageData.price || "",
        rating: packageData.rating || "",
        descriptionOne: packageData.descriptionOne || "",
        descriptionTwo: packageData.descriptionTwo || "",
        duration: packageData.duration || "monthly",
        billingCycle: packageData.billingCycle || "",
      });
      setFeatures(packageData.features || []);
    }
  }, [packageData]);

  const handleAddFeatures = () => {
    setFeatures([...features, ""]);
  };

  const handleFeaturesChange = (e, index) => {
    const newTags = [...features];
    newTags[index] = e.target.value;
    setFeatures(newTags);
  };

  const handleRemoveFeatures = (index) => {
    const newTags = features.filter((_, idx) => idx !== index);
    setFeatures(newTags);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const data = {
      ...formData,
      features,
    };
    setIsLoading(true);
    try {
      const response = await Instance.put(
        `/package/health-checkups/${packageData._id}`,
        data
      );
      if (response?.status === 200 || response?.status === 201) {
        handleCancel();
        showSuccessMessage("Health package updated successfully!");
        dispatch(editHealthPackage(response.data.updatedHealthCheckup));
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to update health package.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      visible={open}
      title={
        <span className="create-campaign-modal-title">Edit Health Package</span>
      }
      onCancel={handleCancel}
      width={680}
      footer={[
        <Button
          key="back"
          onClick={handleCancel}
          className="create-campaign-cancel-button"
        >
          Cancel
        </Button>,
        <Button
          key="save"
          onClick={handleSave}
          className="create-campaign-save-button"
          loading={isLoading}
        >
          Save
        </Button>,
      ]}
    >
      <Form layout="vertical" className="mt-4">
        <Form.Item label="Package Name">
          <Input
            value={formData.packageName}
            onChange={(e) => handleInputChange("packageName", e.target.value)}
            placeholder="Package Name"
            required
          />
        </Form.Item>
        <Form.Item label="Price">
          <Input
            value={formData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            placeholder="Price"
            type="number"
            required
          />
        </Form.Item>
        <Form.Item label="Rating">
          <Input
            value={formData.rating}
            onChange={(e) => handleInputChange("rating", e.target.value)}
            placeholder="Rating"
            required
            type="number"
            min="0"
            max="5"
          />
        </Form.Item>
        <Form.Item label="Description 1">
          <TextArea
            value={formData.descriptionOne}
            onChange={(e) =>
              handleInputChange("descriptionOne", e.target.value)
            }
            placeholder="Description 1"
            required
          />
        </Form.Item>
        <Form.Item label="Description 2">
          <TextArea
            value={formData.descriptionTwo}
            onChange={(e) =>
              handleInputChange("descriptionTwo", e.target.value)
            }
            placeholder="Description 2"
            required
          />
        </Form.Item>

        <h6>Features</h6>
        <div className="row">
          <div className="d-flex flex-column gap-2 mt-3">
            <button
              type="button"
              className="health-package-add-feature d-flex gap-2 align-items-center mb-2"
              onClick={handleAddFeatures}
            >
              Add +
            </button>
            {features.map((tag, index) => (
              <div key={index} className="d-flex align-items-center gap-2">
                <Form.Item className="mb-0">
                  <input
                    className="health-package-input"
                    type="text"
                    value={tag}
                    onChange={(e) => handleFeaturesChange(e, index)}
                    placeholder="Add feature"
                    style={{ marginBottom: "0px" }}
                  />
                </Form.Item>
                <FaTrash
                  className="trash-icon-health-package"
                  onClick={() => handleRemoveFeatures(index)}
                />
              </div>
            ))}
          </div>
        </div>

        <Form.Item label="Duration">
          <Select
            value={formData.duration}
            onChange={(value) => handleInputChange("duration", value)}
            required
          >
            <Option value="monthly">Monthly</Option>
            <Option value="yearly">Yearly</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Billing Cycle">
          <Input
            value={formData.billingCycle}
            onChange={(e) => handleInputChange("billingCycle", e.target.value)}
            placeholder="Billing Cycle"
            required
            type="number"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditHealthPackage;
