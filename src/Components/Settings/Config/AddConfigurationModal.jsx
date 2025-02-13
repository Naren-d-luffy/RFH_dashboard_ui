import React, { useState } from "react";
import { Modal, Button, Input, message } from "antd";
import { Instance } from "../../../AxiosConfig";

const AddConfigurationModal = ({ visible, onClose, refreshList }) => {
  const [name, setName] = useState("");
  const [configData, setConfigData] = useState([{ key: "", value: "" }]);

  const handleAddField = () =>
    setConfigData([...configData, { key: "", value: "" }]);

  const handleInputChange = (index, field, value) => {
    const updatedData = [...configData];
    updatedData[index][field] = value;
    setConfigData(updatedData);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      message.error("Configuration name is required");
      return;
    }

    for (const { key, value } of configData) {
      if (key.trim() && !value.trim()) {
        message.error("Each key must have a corresponding value.");
        return;
      }
    }
  
    const validConfigData = configData.filter(({ key, value }) => key.trim() && value.trim());
    if (validConfigData.length === 0) {
      message.error("At least one key-value pair is required.");
      return;
    }
  
    const content = validConfigData.reduce((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, {});

    try {
      await Instance.post(`/config`, { name, content });
      message.success("Configuration added successfully.");
      refreshList();
      onClose();
      setName("");
      setConfigData([{ key: "", value: "" }]);
    } catch (error) {
      message.error("Failed to add configuration.");
      console.error("Error adding config:", error);
    }
  };
  const handleClose = () => {
    setName("");
    setConfigData([{ key: "", value: "" }]);
    onClose();
  };
  return (
    <Modal
      title={
        <span className="create-campaign-modal-title">Add Configuration</span>
      }
      visible={visible}
      onCancel={handleClose}
      footer={[
        <Button
          className="create-campaign-cancel-button"
          key="cancel"
          onClick={handleClose}
        >
          Cancel
        </Button>,
        <Button
          key="save"
          className="create-campaign-save-button"
          onClick={handleSave}
        >
          Save
        </Button>,
      ]}
    >
      <div className="mb-3">
        <Input
          placeholder="Configuration Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-3"
        />
      </div>
      {configData.map((field, index) => (
        <div key={index} className="d-flex align-items-center mb-3">
          <Input
            placeholder="Key"
            value={field.key}
            onChange={(e) => handleInputChange(index, "key", e.target.value)}
            className="me-2"
          />
          <Input
            placeholder="Value"
            value={field.value}
            onChange={(e) => handleInputChange(index, "value", e.target.value)}
          />
        </div>
      ))}
      <Button
        type="dashed"
        className="create-campaign-cancel-button"
        onClick={handleAddField}
      >
        Add Field
      </Button>
    </Modal>
  );
};

export default AddConfigurationModal;
