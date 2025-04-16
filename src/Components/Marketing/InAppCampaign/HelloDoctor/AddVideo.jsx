import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { Instance } from "../../../../AxiosConfig";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../globalConstant";
import { addHelloDoctorVideos } from "../../../../Features/HelloDoctorSlice";
import { useDispatch } from "react-redux";
import Loader from "../../../../Loader";
import { FiMaximize2, FiMinimize2, FiX } from "react-icons/fi";

const AddVideo = ({ open, handleCancel }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [isMaximized, setIsMaximized] = useState(false);
  const toggleMaximize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMaximized(!isMaximized);
  };
  const handleSave = async () => {
    if (!title || !url) {
      message.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        title,
        url,
      };

      const response = await Instance.post("/videos", payload);
      if (response?.status === 200 || response?.status === 201) {
        showSuccessMessage("Video added successfully!");
        handleCancel();
        setTitle("");
        setUrl("");
        dispatch(addHelloDoctorVideos(response.data.data));
      }
    } catch (error) {
      console.error("Failed to add video:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Error adding video";
      showErrorMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancelClick = (e) => {
    e.preventDefault(); // Prevent any form submission
    e.stopPropagation(); // Stop event bubbling
    setTitle("");
    setUrl("");
    handleCancel();
  };
  const closeButtons = (
    <div className="d-flex items-center gap-2 pe-5">
      <Button
        type="button"
        onClick={toggleMaximize}
        icon={
          isMaximized ? <FiMinimize2 size={16} /> : <FiMaximize2 size={16} />
        }
      />
      <Button
        type="button"
        className="p-0 w-10 h-10 flex items-center justify-center hover:bg-gray-100"
        onClick={handleCancelClick}
      >
        <span>
          <FiX size={18} />
        </span>
      </Button>
    </div>
  );
  return (
    <>
      {isLoading && <Loader />}
      <Modal
        visible={open}
        title={<span className="create-campaign-modal-title">Add Video</span>}
        onCancel={handleCancelClick}
        closeIcon={closeButtons}
        width={isMaximized ? "98%" : 680}
        style={isMaximized ? { top: 10, padding: 0, maxWidth: "98%" } : {}}
        styles={
          isMaximized ? { height: "calc(100vh - 110px)", overflow: "auto" } : {}
        }
        footer={[
          <Button
            key="back"
            onClick={handleCancelClick}
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
              placeholder="Enter Title"
              required
            />
            <span className="create-campaign-input-span">
              <span style={{ color: "red" }}>*</span> Video Title
            </span>
          </Form.Item>
          <Form.Item>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL"
              required
            />
            <span className="create-campaign-input-span">
              <span style={{ color: "red" }}>*</span> Video URL
            </span>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddVideo;
