import React, { useState } from "react";
import { Button, Modal, Form, Input, message, Radio, Upload } from "antd";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Instance } from "../../../../AxiosConfig";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../globalConstant";
import { useDispatch } from "react-redux";
import Loader from "../../../../Loader";
import { addRecommendedVideos } from "../../../../Features/RecommendedVideosSlice";

const AddRecommendedVideos = ({ open, handleCancel }) => {
  const [title, setTitle] = useState("");
  const [uploadType, setUploadType] = useState("url");
  const [url, setUrl] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleUploadThumbnail = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }
    setThumbnailFile(file);
    return false;
  };

  const handleUploadVideo = (file) => {
    const isVideo = file.type.startsWith("video/");
    if (!isVideo) {
      message.error("You can only upload video files!");
      return false;
    }
    setVideoFile(file);
    return false;
  };

  const handleDeleteThumbnail = () => setThumbnailFile(null);
  const handleDeleteVideoFile = () => setVideoFile(null);

  const handleSave = async () => {
    if (
      !title.trim() ||
      !thumbnailFile ||
      (uploadType === "url" && !url.trim()) ||
      (uploadType === "file" && !videoFile)
    ) {
      message.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", title.trim());
      formData.append("thumbnail", thumbnailFile);

      if (uploadType === "url") {
        formData.append("video_URL", url.trim());
      } else if (uploadType === "file") {
        formData.append("video", videoFile);
      }

      const response = await Instance.post("/recommended", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response?.status === 200 || response?.status === 201) {
        showSuccessMessage("Recommended Video added successfully!");
        handleCancel();
        setTitle("");
        setUrl("");
        setVideoFile(null);
        setThumbnailFile(null);
        setUploadType("url");
        dispatch(addRecommendedVideos(response.data));
      }
    } catch (error) {
      console.error("Failed to add recommended video:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error adding recommended video";
      showErrorMessage(errorMessage);
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
          <span className="create-campaign-modal-title">
            Add Recommended Video
          </span>
        }
        onCancel={() => {
          setTitle("");
          setUrl("");
          setVideoFile(null);
          setThumbnailFile(null);
          setUploadType("url");
          handleCancel();
        }}
        width={680}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setTitle("");
              setUrl("");
              setVideoFile(null);
              setThumbnailFile(null);
              setUploadType("url");
              handleCancel();
            }}
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
            <Upload
              listType="picture"
              showUploadList={false}
              beforeUpload={handleUploadThumbnail}
              className="create-campaign-upload"
            >
              <p className="create-campaign-ant-upload-text">
                Drop files here or click to upload
              </p>
              <span className="create-campaign-ant-upload-drag-icon">
                <IoCloudUploadOutline className="image-upload-icon"/>{" "}
                <span style={{ color: "#727880" }}>Upload Thumbnail</span>
              </span>
              <span className="create-campaign-input-span">
                <span style={{ color: "red" }}>*</span> Thumbnail
              </span>
            </Upload>
            {thumbnailFile && (
              <div className="uploaded-image-preview d-flex gap-2">
                <img
                  src={URL.createObjectURL(thumbnailFile)}
                  alt="Uploaded Thumbnail"
                  style={{
                    width: "200px",
                    height: "auto",
                    marginTop: "10px",
                    borderRadius: "5px",
                  }}
                />
                <Button
                  onClick={handleDeleteThumbnail}
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
          </Form.Item>

          <Form.Item
            label={
              <span>
                Upload Type <span style={{ color: "red" }}>*</span>
              </span>
            }
          >
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
            <Form.Item>
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter Video URL"
                required
              />
              <span className="create-campaign-input-span">
                <span style={{ color: "red" }}>*</span> Video URL
              </span>
            </Form.Item>
          ) : (
            <Form.Item>
              <Upload
                listType="picture"
                showUploadList={false}
                beforeUpload={handleUploadVideo}
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
              {videoFile && (
                <div className="uploaded-image-preview d-flex gap-2">
                  <p
                    style={{
                      marginTop: "10px",
                      color: "#555",
                      fontSize: "14px",
                    }}
                  >
                    {videoFile.name}
                  </p>
                  <Button
                    onClick={handleDeleteVideoFile}
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
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default AddRecommendedVideos;
