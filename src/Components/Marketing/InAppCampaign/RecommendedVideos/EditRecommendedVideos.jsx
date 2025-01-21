import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { Instance } from "../../../../AxiosConfig";
import { showSuccessMessage } from "../../../../globalConstant";
import { useDispatch } from "react-redux";
import Loader from "../../../../Loader";
import { editRecommendedVideos } from "../../../../Features/RecommendedVideosSlice";

const EditRecommendedVideos = ({ open, handleCancel, videoData, refreshList }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [thumbnail, setThumbnail] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (videoData) {
      setTitle(videoData.name || ""); 
      setUrl(videoData.video_URL || videoData.Video_file || "");
      setThumbnail(videoData.thumbnail || ""); 
    }
  }, [videoData]);

  const handleUpdate = async () => {
    if (!title || !url || !thumbnail) {
      message.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        name: title, 
        Video_file: url, 
        thumbnail: thumbnail, 
      };

      const response = await Instance.put(`/recommended/${videoData._id}`, payload);
      if (response?.status === 200 || response?.status === 201) {
        showSuccessMessage("Video updated successfully!");
        handleCancel();
        dispatch(editRecommendedVideos(response.data)); 
        refreshList(); 
      }
    } catch (error) {
      console.error("Failed to update video:", error);
      message.error("Failed to update video.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />} 
      <Modal
        visible={open}
        title={<span className="create-campaign-modal-title">Edit Video</span>}
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
              placeholder="Enter Title"
              required
            />
            <span className="create-campaign-input-span">Video Title</span>
          </Form.Item>
          <Form.Item>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL"
              required
            />
            <span className="create-campaign-input-span">Video URL</span>
          </Form.Item>
          <Form.Item>
            <Input
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="Enter Thumbnail URL"
              required
            />
            <span className="create-campaign-input-span">Thumbnail URL</span>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditRecommendedVideos;
