import React, { useState } from "react";
import { Button, Modal, Form, Input, message, Radio, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Instance } from "../../../../AxiosConfig";
import { showSuccessMessage } from "../../../../globalConstant";
import { useDispatch } from "react-redux";
import Loader from "../../../../Loader";
import { addRecommendedVideos } from "../../../../Features/RecommendedVideosSlice";

const AddRecommendedVideos = ({ open, handleCancel, refreshList }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);
  const [uploadType, setUploadType] = useState("url");
  const dispatch = useDispatch();

  const handleSave = async () => {
    if (!title.trim() || !thumbnail.trim() || (uploadType === "url" && !url.trim()) || (uploadType === "file" && !file)) {
      message.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", title.trim());
      formData.append("thumbnail", thumbnail.trim());

      if (uploadType === "url") {
        formData.append("video_URL", url.trim());
      } else if (uploadType === "file") {
        formData.append("video", file);
      }

      const response = await Instance.post("/recommended", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.status === 200 || response?.status === 201) {
        showSuccessMessage("Video added successfully!");
        handleCancel();
        setTitle("");
        setUrl("");
        setThumbnail(""); 
        setFile(null);
        setUploadType("url");
        dispatch(addRecommendedVideos(response.data));
        if (refreshList) refreshList();
      }
    } catch (error) {
      console.error("Failed to add video:", error);
      message.error(error.response?.data?.message || "Failed to add video.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = (file) => {
    const isVideo = file.type.startsWith("video/");
    if (!isVideo) {
      message.error("You can only upload video files!");
      return false;
    }
    setFile(file);
    return false;
  };

  const handleDeleteFile = () => {
    setFile(null);
  };

  return (
    <>
      {isLoading && <Loader />}
      <Modal
        open={open}
        title={<span className="create-campaign-modal-title">Add Video</span>}
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
          <Form.Item label="Video Title">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
              required
            />
          </Form.Item>
          <Form.Item label="Thumbnail URL">
            <Input
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="Enter Thumbnail URL"
              required
            />
          </Form.Item>
          <Form.Item label="Upload Type">
            <Radio.Group
              value={uploadType}
              onChange={(e) => setUploadType(e.target.value)}
              className="mb-3"
            >
              <Radio value="url">Video URL</Radio>
              <Radio value="file">Upload Video File</Radio>
            </Radio.Group>
          </Form.Item>
          {uploadType === "url" ? (
            <Form.Item label="Video URL">
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
                required
              />
            </Form.Item>
          ) : (
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
                  <span style={{ color: "#727880" }}>Upload Video</span>
                </span>
              </Upload>
              {file && (
                <div className="uploaded-image-preview d-flex gap-2">
                  <p
                    style={{
                      marginTop: "10px",
                      color: "#555",
                      fontSize: "14px",
                    }}
                  >
                    {file.name}
                  </p>
                  <Button
                    onClick={handleDeleteFile}
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
              <span className="create-campaign-input-span">Video File</span>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default AddRecommendedVideos;
