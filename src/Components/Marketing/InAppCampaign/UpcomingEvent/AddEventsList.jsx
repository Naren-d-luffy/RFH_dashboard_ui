import React, { useState } from "react";
import { Button, Modal, Form, Input, message, Select, Upload } from "antd";
import { Instance } from "../../../../AxiosConfig";
import { showSuccessMessage } from "../../../../globalConstant";
import { useDispatch } from "react-redux";
import { addEvent } from "../../../../Features/DiscoverEventsCard";
import { FaTrash } from "react-icons/fa6";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import Loader from "../../../../Loader";

const { TextArea } = Input;
const { Option } = Select;

const AddEventsList = ({ open, handleCancel }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [order, setOrder] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [features, setFeatures] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);

  const dispatch = useDispatch();

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

  const handleUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }
    setUploadedImage(file);
    return false;
  };

  const handleDeleteImage = () => {
    setUploadedImage(null);
  };

  const handleSave = async () => {
    if (
      !title.trim() ||
      !description.trim() ||
      !link.trim() ||
      !order.trim() ||
      !uploadedImage ||
      features.length === 0
    ) {
      message.error("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("link", link.trim());
    formData.append("order", parseInt(order, 10));
    formData.append("isActive", isActive);
    formData.append("tags", features);
    formData.append("image", uploadedImage);
    setIsLoading(true);

    try {
      const response = await Instance.post("/discover/card", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.status === 200 || response?.status === 201) {
        console.log("add", response);
        handleCancel();
        console.log("Dispatching addEvent with payload:", response.data._doc);
        dispatch(addEvent(response.data._doc));

        showSuccessMessage("Event card added successfully!");
        setTitle("");
        setDescription("");
        setLink("");
        setOrder("");
        setIsActive(true);
        setFeatures([]);
        setUploadedImage(null);
      }
    } catch (error) {
      console.error("Error adding event card:", error);
      // message.error("Failed to add event card.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Modal
        visible={open}
        title={
          <span className="create-campaign-modal-title">Add Event Card</span>
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
          <Form.Item>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Event Title"
              required
            />
            <span className="create-campaign-input-span">Title</span>
          </Form.Item>
          <Form.Item>
            <Input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Enter Event Link"
              required
            />
            <span className="create-campaign-input-span">Link</span>
          </Form.Item>
          <Form.Item>
            <Upload
              listType="picture"
              showUploadList={false}
              beforeUpload={handleUpload}
              className="create-campaign-upload"
            >
              <p className="create-campaign-ant-upload-text">
                Drop files here or click to upload
              </p>
              <span className="create-campaign-ant-upload-drag-icon">
                <IoCloudUploadOutline />{" "}
                <span style={{ color: "#727880" }}>Upload Image</span>
              </span>
            </Upload>
            {uploadedImage && (
              <div className="uploaded-image-preview d-flex gap-2">
                <img
                  src={URL.createObjectURL(uploadedImage)}
                  alt="Uploaded"
                  style={{
                    width: "200px",
                    height: "auto",
                    marginTop: "10px",
                    borderRadius: "5px",
                  }}
                />
                <Button
                  onClick={handleDeleteImage}
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#e6f2ed",
                    borderRadius: "50%",
                    fontSize: "16px",
                    padding: "4px 12px",
                  }}
                >
                  <RiDeleteBin5Line className="model-image-upload-delete-icon" />
                </Button>
              </div>
            )}
            <span className="create-campaign-input-span">Image</span>
          </Form.Item>
          <Form.Item>
            <Input
              type="number"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              placeholder="Enter Display Order"
              required
            />
            <span className="create-campaign-input-span">Order</span>
          </Form.Item>
          <Form.Item>
            <Select
              value={isActive}
              onChange={(value) => setIsActive(value)}
              placeholder="Select Event Status"
              required
            >
              <Option value={true}>Active</Option>
              <Option value={false}>Inactive</Option>
            </Select>
            <span className="create-campaign-input-span">Status</span>
          </Form.Item>
          <Form.Item>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Event Description"
              required
            />
            <span className="create-campaign-input-span">Description</span>
          </Form.Item>
          <h6 style={{ color: "var(--black-color)" }}>Tags</h6>
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
                      className="health-package-input "
                      type="text"
                      value={tag}
                      onChange={(e) => handleFeaturesChange(e, index)}
                      placeholder="Add tag"
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
        </Form>
      </Modal>
    </>
  );
};

export default AddEventsList;























