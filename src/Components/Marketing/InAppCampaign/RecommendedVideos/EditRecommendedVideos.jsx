import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, message, Upload } from "antd";
import { Instance } from "../../../../AxiosConfig";
import { showSuccessMessage } from "../../../../globalConstant";
import { useDispatch } from "react-redux";
import Loader from "../../../../Loader";
import { editRecommendedVideos } from "../../../../Features/RecommendedVideosSlice";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";

const EditRecommendedVideos = ({ open, handleCancel, videoData }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null); 
  const [file, setFile] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (videoData) {
      setTitle(videoData.name || "");
      setUrl(videoData.video_URL || videoData.Video_file || "");
      setUploadedImage(videoData.thumbnail || null);
    }
  }, [videoData]);

  const handleUpload = (info) => {
      const file = info.file.originFileObj;
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
        return;
      }
      setUploadedImage(file);
    };
  
  
    const handleDeleteImage = () => {
      setUploadedImage(null);
    };

  const handleUpdate = async () => {
   
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", title); 
      formData.append("video_URL", url);  
      formData.append("thumbnail", uploadedImage);  
      const response = await Instance.put(`/recommended/${videoData._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
              placeholder="Enter Video URL"
              required
            />
            <span className="create-campaign-input-span">Video URL</span>
          </Form.Item>

          {/* <Form.Item>
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
    // Display the new uploaded file
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
    // Display the existing thumbnail from videoData
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
    // Display a placeholder if no thumbnail exists
    <p style={{ marginTop: "10px", color: "#727880" }}>
      No thumbnail available
    </p>
  )}
  <span className="create-campaign-input-span">Thumbnail</span>
</Form.Item> */}

<Form.Item>
            <Upload
              listType="picture"
              showUploadList={false}
              onChange={handleUpload}
              className="create-campaign-upload"
            >
              <p className="create-campaign-ant-upload-text">Drop files here or click to upload</p>
              <span className="create-campaign-ant-upload-drag-icon">
                <IoCloudUploadOutline /> <span style={{ color: "#727880" }}>Upload Image</span>
              </span>
            </Upload>
            {uploadedImage && (
              <div className="uploaded-image-preview d-flex gap-2">
                <img
                  src={
                    typeof uploadedImage === "string"
                      ? uploadedImage 
                      : URL.createObjectURL(uploadedImage) 
                  }
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

        </Form>
      </Modal>
    </>
  );
};

export default EditRecommendedVideos;

