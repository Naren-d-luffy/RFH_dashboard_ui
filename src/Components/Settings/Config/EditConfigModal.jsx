import React, { useState, useEffect } from "react";
import { Modal, Button, Input, message } from "antd";
import { Instance } from "../../../AxiosConfig";

const EditConfigModal = ({ config, onClose, refreshList }) => {
    const [configData, setConfigData] = useState([]);

    // Initialize form data with the existing configuration
    useEffect(() => {
        console.log('Config data:', config); // Debugging the config object
        if (config && config.config) {
            const formattedData = Object.entries(config.config).map(([key, value]) => ({
                key,
                value,
            }));
            setConfigData(formattedData);
        } else {
            console.warn('Config data is missing or invalid');
            setConfigData([]);  // Optionally set empty array or default value
        }
    }, [config]);
    

    const handleAddField = () => setConfigData([...configData, { key: "", value: "" }]);

    const handleInputChange = (index, field, value) => {
        const updatedData = [...configData];
        updatedData[index][field] = value;
        setConfigData(updatedData);
    };

    const handleSave = async () => {
        const formattedData = configData.reduce((acc, { key, value }) => {
            if (key && value) acc[key] = value;
            return acc;
        }, {});

        try {
            await Instance.put(`/config`, {
                configId: config._id,
                updatedConfig: formattedData,
            });
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
            title="Edit Configuration"
            visible={!!config}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="save" type="primary" onClick={handleSave}>
                    Save Changes
                </Button>,
            ]}
        >
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
            <Button type="dashed" onClick={handleAddField}>
                Add Field
            </Button>
        </Modal>
    );
};

export default EditConfigModal;
