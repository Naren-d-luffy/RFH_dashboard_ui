import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import "react-quill/dist/quill.snow.css";
import { Upload } from "antd";
import { IoCloudUploadOutline } from "react-icons/io5";
import { showSuccessMessage } from "../../../globalConstant";
import { RiDeleteBin5Line } from "react-icons/ri";

const handleClick = () => {
  showSuccessMessage("Successfully Created", "");
};

const RecommendedVideo = ({ open, handleCancel }) => {
  const [uploadedVideo, setUploadedVideo] = useState(null);

  const handleUpload = (info) => {
    const file = info.file.originFileObj;

    // Only process video files
    if (file && file.type.startsWith("video/")) {
      const videoUrl = URL.createObjectURL(file);
      setUploadedVideo(videoUrl);
    } else {
      alert("Please upload a valid video file.");
    }
  };

  const handleDeleteVideo = () => {
    setUploadedVideo(null);
  };

  return (
    <Modal
      open={open}
      title={<span className="create-campaign-modal-title">Recommended Video</span>}
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
          onClick={handleClick}
          className="create-campaign-save-button"
        >
          Save
        </Button>,
      ]}
    >
      <Form layout="vertical" className="mt-4">
        <Form.Item label="Upload video">
          <Upload
            listType="picture"
            showUploadList={false}
            onChange={handleUpload}
            className="create-campaign-upload"
          >
            <p className="create-campaign-ant-upload-text">
              Drop files here or click to upload
            </p>
            <span className="create-campaign-ant-upload-drag-icon">
              <IoCloudUploadOutline />{" "}
              <span style={{ color: "#727880" }}>Upload Video</span>
            </span>
          </Upload>
          {uploadedVideo && (
            <div className="uploaded-video-preview d-flex gap-2" style={{ marginTop: "10px" }}>
              <video
                src={uploadedVideo}
                controls
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "300px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <Button
                onClick={handleDeleteVideo}
                style={{
                  marginTop: "10px",
                  backgroundColor: "#e6f2ed",
                  borderRadius: "50%",
                  fontSize: "16px",
                  padding: "4px 12px",
                }}
              >
                <RiDeleteBin5Line />
              </Button>
            </div>
          )}
        </Form.Item>

        <Form.Item>
          <Input
            className="settings-input"
            placeholder="Show video title"
            defaultValue="Gastro"
          />
          <span className="settings-input-span">Video Title</span>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RecommendedVideo;
