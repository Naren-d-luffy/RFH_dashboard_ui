import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, message, Radio, Upload } from "antd";
import { Instance } from "../../../../AxiosConfig";
import { showSuccessMessage } from "../../../../globalConstant";
import { useDispatch } from "react-redux";
import Loader from "../../../../Loader";
import { editRecommendedVideos } from "../../../../Features/RecommendedVideosSlice";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";

const EditRecommendedVideos = ({
  open,
  handleCancel,
  videoData
 
}) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadType, setUploadType] = useState("url"); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (videoData) {
      setTitle(videoData.name || "");

      if (videoData.video_URL) {
        setUploadType("url");
        setUrl(videoData.video_URL);
        setFile(null);
      } else if (videoData.Video_file) {
        setUploadType("file");
        setUrl("");
        setFile(null);
      }
      
      setThumbnail(videoData.thumbnail || null);
    }
  }, [videoData, open]);

  const handleUploadThumbnail = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }
    setFile(file);
    return false;
  };

  const handleUploadVideo = (file) => {
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

  const handleUpdate = async () => {
    if (!title || !thumbnail || (uploadType === "url" && !url) || (uploadType === "file" && !file)) {
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

      const response = await Instance.put(
        `/recommended/${videoData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.status === 200 || response?.status === 201) {
        showSuccessMessage("Video updated successfully!");
        handleCancel();
        dispatch(editRecommendedVideos(response.data));
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
          <Form.Item label="Video Title">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
              required
            />
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
                <IoCloudUploadOutline />{" "}
                <span style={{ color: "#727880" }}>Upload Thumbnail Image</span>
              </span>
            </Upload>
            {file ? (
              <div className="uploaded-image-preview d-flex gap-2">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Uploaded"
                  style={{
                    width: "200px",
                    height: "auto",
                    marginTop: "10px",
                    borderRadius: "5px",
                  }}
                />
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
            ) : thumbnail ? (
              <img
                src={thumbnail}
                alt="Thumbnail"
                style={{
                  width: "200px",
                  height: "auto",
                  marginTop: "10px",
                  borderRadius: "5px",
                }}
              />
            ) : (
              <p style={{ marginTop: "10px", color: "#727880" }}>
                No thumbnail available
              </p>
            )}
            <span className="create-campaign-input-span">Thumbnail</span>
          </Form.Item>
          <Form.Item label="Upload Type">
            <Radio.Group
              value={uploadType}
              onChange={(e) => {
                setUploadType(e.target.value);
                // Reset related fields when changing upload type
                if (e.target.value === "url") {
                  setFile(null);
                } else {
                  setUrl("");
                }
              }}
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
                placeholder="Enter Video URL"
                required
              />
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
              {file && (
                <div className="uploaded-image-preview d-flex gap-2 align-items-center">
                  <div>
                    <p
                      style={{
                        marginTop: "10px",
                        color: "#555",
                        fontSize: "14px",
                        marginBottom: "5px",
                      }}
                    >
                      File: {file.name}
                    </p>
                    <p
                      style={{
                        color: "#777",
                        fontSize: "12px",
                        marginBottom: "10px",
                      }}
                    >
                      Path: {file.path || 'Local file'}
                    </p>
                  </div>
                  <Button
                    onClick={handleDeleteFile}
                    style={{
                      marginTop: "10px",
                      backgroundColor: "#e6f2ed",
                      borderRadius: "50%",
                      fontSize: "16px",
                      padding: "4px 12px",
                      height: "40px",
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

export default EditRecommendedVideos;




