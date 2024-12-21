import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, message, Select } from "antd";
import "react-quill/dist/quill.snow.css";
import { Instance } from "../../../../AxiosConfig";
import { showSuccessMessage } from "../../../../globalConstant";
import { useDispatch } from "react-redux";
import Loader from "../../../../Loader";
import { editEvent } from "../../../../Features/DiscoverEventsCard";
import { FaTrash } from "react-icons/fa6";

const { TextArea } = Input;
const { Option } = Select;

const EditEventsList = ({ open, handleCancel, eventsData }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [order, setOrder] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [features, setFeatures] = useState([]);

  const dispatch = useDispatch();

  const handleAddFeatures = () => {
    setFeatures([...features, ""]);
  };

  const handleFeaturesChange = (e, index) => {
    const newFeatures = [...features];
    newFeatures[index] = e.target.value;
    setFeatures(newFeatures);
  };

  const handleRemoveFeatures = (index) => {
    const newFeatures = features.filter((_, idx) => idx !== index);
    setFeatures(newFeatures);
  };

  useEffect(() => {
    if (open && eventsData) {
      setTitle(eventsData.title || "");
      setDescription(eventsData.description || "");
      setLink(eventsData.link || "");
      setOrder(eventsData.order || "");
      setIsActive(eventsData.isActive || null);
      setImageUrl(eventsData.imageUrl || "");
      setFeatures(eventsData.tags || []);
    }
  }, [open, eventsData]);

  const handleUpdate = async () => {
    if (
      !title.trim() ||
      !description.trim() ||
      !link.trim() ||
      !order ||
      isNaN(order) ||
      !imageUrl.trim() ||
      features.length === 0
    ) {
      message.error("Please fill in all required fields.");
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      link: link.trim(),
      isActive,
      order: parseInt(order, 10),
      tags: features,
    };

    setIsLoading(true);

    try {
      const response = await Instance.put(`/discover/card/${eventsData._id}`, payload);

      if (response?.status === 200 || response?.status === 201) {
        handleCancel();
        dispatch(editEvent(response.data));
        showSuccessMessage("Event updated successfully!");
        setTitle("");
        setDescription("");
        setLink("");
        setOrder("");
        setImageUrl("");
        setIsActive(true);
        setFeatures([]);
      }
    } catch (error) {
      console.error("Error updating event card:", error);
      message.error("Failed to update event card.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Modal
        visible={open}
        title={<span className="create-campaign-modal-title">Update Event Card</span>}
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
            onClick={handleUpdate}
            className="create-campaign-save-button"
            loading={isLoading}
          >
            Update
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
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter Image URL"
              required
            />
            <span className="create-campaign-input-span">Image URL</span>
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
                      className="health-package-input"
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

export default EditEventsList;
