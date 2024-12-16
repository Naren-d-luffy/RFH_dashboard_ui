import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { Instance } from "../../../AxiosConfig";
import { showSuccessMessage } from "../../../globalConstant";
import { editHelloDoctorVideos } from "../../../Features/HelloDoctorSlice";
import { useDispatch } from "react-redux";

const EditVideo = ({ open, handleCancel, videoData, refreshList }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch=useDispatch();

  useEffect(() => {
    if (videoData) {
      setTitle(videoData.title || "");
      setUrl(videoData.url || "");
    }
  }, [videoData]);

  const handleUpdate = async () => {
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

      const response = await Instance.put(`/videos/${videoData._id}`, payload);
      if (response?.status === 200 || response?.status === 201) {
        showSuccessMessage("Video updated successfully!");
        handleCancel(); 
        dispatch(editHelloDoctorVideos(response.data));
      }
    } catch (error) {
      console.error("Failed to update video:", error);
      message.error("Failed to update video.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      visible={open}
      title={<span className="create-campaign-modal-title">Edit Video</span>}
      onCancel={handleCancel}
      width={680}
      footer={[
        <Button key="back" onClick={handleCancel} className="create-campaign-cancel-button">
          Cancel
        </Button>,
        <Button key="save" onClick={handleUpdate} className="create-campaign-save-button" loading={isLoading}>
          Update
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

export default EditVideo;
