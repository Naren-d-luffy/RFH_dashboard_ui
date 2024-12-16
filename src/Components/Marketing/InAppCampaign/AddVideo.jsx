import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { Instance } from "../../../AxiosConfig";
import { showSuccessMessage } from "../../../globalConstant";
import { addHelloDoctorVideos } from "../../../Features/HelloDoctorSlice";
import { useDispatch } from "react-redux";

const AddVideo = ({ open, handleCancel, refreshList }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch=useDispatch();

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
        // refreshList(); 
        dispatch(addHelloDoctorVideos(response.data));
      }
    } catch (error) {
      console.error("Failed to add video:", error);
      message.error("Failed to add video.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      visible={open}
      title={<span className="create-campaign-modal-title">Add Video</span>}
      onCancel={handleCancel}
      width={680}
      footer={[
        <Button key="back" onClick={handleCancel} className="create-campaign-cancel-button">
          Cancel
        </Button>,
        <Button key="save" onClick={handleSave} className="create-campaign-save-button" loading={isLoading}>
          Save
        </Button>,
      ]}
    >
      <Form layout="vertical" className="mt-4">
        <Form.Item label="Video Title">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title"
            required
          />
        </Form.Item>
        <Form.Item label="Video URL">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            required
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddVideo;
