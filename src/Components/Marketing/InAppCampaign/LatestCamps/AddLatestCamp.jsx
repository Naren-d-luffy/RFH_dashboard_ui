import React, { useState } from "react";
import { Button, Modal, Form, Input, DatePicker, TimePicker, message } from "antd";
import "react-quill/dist/quill.snow.css";
import { EnvironmentOutlined } from "@ant-design/icons";
import { showSuccessMessage } from "../../../../globalConstant";
import { Instance } from "../../../../AxiosConfig";
import { useDispatch } from "react-redux";
import { addCamp } from "../../../../Features/CampSlice";
const { TextArea } = Input;

const AddLatestCamps = ({ open, handleCancel }) => {
  const [formData, setFormData] = useState({
    campName: "",
    date: null,
    time: null,
    description: "",
    hospitalName: "",
    location: "",
    address: "",
    pinCode: "",
  });

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const resetForm = () => {
    setFormData({
      campName: "",
      date: null,
      time: null,
      description: "",
      hospitalName: "",
      location: "",
      address: "",
      pinCode: "",
    });
  };
  const dispatch=useDispatch()
  const handleSave = async () => {
    const formattedData = {
      ...formData,
      date: formData.date?.format("YYYY-MM-DD"),
      time: formData.time?.format("hh:mm A"),  
    };

    try {
      const response = await Instance.post("/camp", formattedData);
      if (response?.status === 200 || response?.status === 201) {
        dispatch(addCamp(response.data))
        showSuccessMessage("Successfully Created", "");
        handleCancel();
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to create Camp.");
    }
  };
  const handleCancelClick = () => {
    resetForm(); 
    handleCancel();
  };
  return (
    <Modal
      open={open}
      title={<span className="create-campaign-modal-title">Latest Camps</span>}
      onCancel={handleCancelClick}
      width={680}
      footer={[
        <Button key="back" onClick={handleCancelClick} className="create-campaign-cancel-button">
          Cancel
        </Button>,
        <Button key="save" onClick={handleSave} className="create-campaign-save-button">
          Save
        </Button>,
      ]}
    >
      <Form layout="vertical" className="mt-4">
        <div className="row">
          <div className="col-md-6 mt-2">
            <Form.Item>
              <Input
                className="settings-input"
                placeholder="Camp Name"
                value={formData.campName}
                onChange={(e) => handleInputChange("campName", e.target.value)}
              />
              <span className="settings-input-span">Camp name</span>
            </Form.Item>
          </div>
          <div className="col-md-3 mt-2">
            <Form.Item>
              <DatePicker
                className="settings-input w-100"
                placeholder="Select Date"
                format="DD-MM-YYYY"
                value={formData.date}
                onChange={(date) => handleInputChange("date", date)}
              />
              <span className="settings-input-span">Camp Date</span>
            </Form.Item>
          </div>
          <div className="col-md-3 mt-2">
            <Form.Item>
              <TimePicker
                className="settings-input w-100"
                placeholder="Select Time"
                format="HH:mm"
                value={formData.time}
                onChange={(time) => handleInputChange("time", time)}
              />
              <span className="settings-input-span">Camp Time</span>
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-2">
            <Form.Item>
              <TextArea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
              <span className="create-campaign-input-span">Description</span>
            </Form.Item>
          </div>
          <div className="col-md-6 mt-2">
            <Form.Item>
              <Input
                className="settings-input"
                placeholder="Hospital Name"
                value={formData.hospitalName}
                onChange={(e) => handleInputChange("hospitalName", e.target.value)}
              />
              <span className="settings-input-span">Hospital Name</span>
            </Form.Item>
          </div>
          <div className="col-md-6 mt-2">
            <Form.Item>
              <Input
                className="settings-input"
                placeholder="Enter latitude and longitude"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
              <span className="settings-input-span">Location</span>
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mt-2">
            <Form.Item>
              <Input
                className="settings-input"
                placeholder="Enter Address"
                prefix={<EnvironmentOutlined style={{ color: "#00963F", fontSize: "14px" }} />}
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
              <span className="settings-input-span">Address</span>
            </Form.Item>
          </div>
          <div className="col-md-6 mt-2">
            <Form.Item>
              <Input
                className="settings-input"
                placeholder="Enter Pincode"
                value={formData.pinCode}
                onChange={(e) => handleInputChange("pinCode", e.target.value)}
              />
              <span className="settings-input-span">Pin Code</span>
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default AddLatestCamps;
