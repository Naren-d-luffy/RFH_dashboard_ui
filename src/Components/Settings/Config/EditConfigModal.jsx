import React, { useState, useEffect } from "react";
import { Modal, Button, Input, message } from "antd";
import { Instance } from "../../../AxiosConfig";

const EditConfigModal = ({ config, onClose, refreshList }) => {
  const [name, setName] = useState("");
  const [configData, setConfigData] = useState([]);

  useEffect(() => {
    if (config) {
      setName(config.name || "");
      const formattedData = Object.entries(config.content || {}).map(
        ([key, value]) => ({
          key,
          value: value || "",
        })
      );
      setConfigData(
        formattedData.length ? formattedData : [{ key: "", value: "" }]
      );
    }
  }, [config]);

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

    const content = configData.reduce((acc, { key, value }) => {
      if (key && value) acc[key] = value;
      return acc;
    }, {});

    try {
      await Instance.put(`/config/id/${config._id}`, { name, content });
      message.success("Configuration updated successfully.");
      refreshList();
      onClose();
    } catch (error) {
      message.error("Failed to update configuration.");
      console.error("Error updating config:", error);
    }
  };

  return (
    <Modal
      title={
        <span className="create-campaign-modal-title">Edit Configuration</span>
      }
      visible={!!config}
      onCancel={onClose}
      footer={[
        <Button key="cancel" className="create-campaign-cancel-button" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" className="create-campaign-save-button" onClick={handleSave}>
          Save Changes
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
      <Button type="dashed" className="create-campaign-cancel-button" onClick={handleAddField}>
        Add Field
      </Button>
    </Modal>
  );
};

export default EditConfigModal;
