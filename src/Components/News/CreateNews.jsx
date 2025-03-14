import React, { useState } from "react";
import { Button, Modal, Form, Input, Upload, message, Select } from "antd";
import "react-quill/dist/quill.snow.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ColorPicker } from "antd";
import { Instance } from "../../AxiosConfig";
import { showSuccessMessage } from "../../globalConstant";
import { addNews } from "../../Features/NewsSlice";
import { useDispatch } from "react-redux";
import Loader from "../../Loader";
import { Option } from "antd/es/mentions";
import { FiMaximize2, FiMinimize2, FiX } from "react-icons/fi";

const CreateNews = ({ open, handleCancel }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [about, setAbout] = useState("");
  const [content, setContent] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [isMaximized, setIsMaximized] = useState(false);
  const toggleMaximize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMaximized(!isMaximized);
  };
  const handleUpload = (info) => {
    const file = info.file.originFileObj;
    setUploadedImage(file);
  };
  const [type, setType] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const handleDeleteImage = () => {
    setUploadedImage(null);
  };

  const handleSave = async () => {
    if (!heading || !subheading || !uploadedImage||!type || !backgroundColor) {
      message.error("Please fill in all required fields.");
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("heading", heading);
      formData.append("subheading", subheading);
      formData.append("about", about);
      formData.append("content", content);
      formData.append("backgroundColor", backgroundColor);
      formData.append("type", type);
      formData.append("video_URL", videoURL);
      if (uploadedImage) {
        formData.append("image", uploadedImage);
      }
      const response = await Instance.post("/cards", formData);
      if (response?.status === 200 || response?.status === 201) {
        handleCancel();
        showSuccessMessage("News created successfully!");
        dispatch(addNews(response.data.data));
        setHeading("");
        setSubheading("");
        setAbout("");
        setContent("");
        setUploadedImage("");
        setBackgroundColor("");
        setType("");
        setVideoURL("");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to create news.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancelClick = () => {
    setHeading("");
    setSubheading("");
    setAbout("");
    setContent("");
    setUploadedImage("");
    setBackgroundColor("");
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
        title={<span className="create-campaign-modal-title">Create News</span>}
        onCancel={handleCancelClick}
        closeIcon={closeButtons}
        width={isMaximized ? "98%" : 680}
        style={isMaximized ? { top: 10, padding: 0, maxWidth: "98%" } : {}}
        bodyStyle={
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
            <Upload
              listType="picture"
              showUploadList={false}
              onChange={handleUpload}
              className="create-campaign-upload"
              accept="image/*"
            >
              <p className="create-campaign-ant-upload-text">
                Drop files here or click to upload
              </p>
              <span className="create-campaign-ant-upload-drag-icon">
                <IoCloudUploadOutline className="image-upload-icon" />{" "}
                <span style={{ color: "#727880" }}>Upload Image</span>
              </span>
            </Upload>
            {uploadedImage && (
              <div className="uploaded-image-preview d-flex gap-2">
                <img
                  src={URL.createObjectURL(uploadedImage)}
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
            <span className="create-campaign-input-span">
              <span style={{ color: "red" }}>*</span> Image
            </span>
          </Form.Item>
          <div className="row">
            <div className="col-lg-12">
              <Form.Item>
                <Input
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                  placeholder="Add Heading"
                  required
                />
                <span className="create-campaign-input-span">
                  <span style={{ color: "red" }}>*</span> Heading
                </span>{" "}
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item>
                <Input
                  value={subheading}
                  onChange={(e) => setSubheading(e.target.value)}
                  placeholder="Add Sub Heading"
                  required
                />
                <span className="create-campaign-input-span">
                <span style={{ color: "red" }}>*</span>Sub Heading</span>{" "}
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item>
                <Select
                  className="create-camapign-input-select"
                  placeholder={type ? type : "Select Type"}
                  style={{ width: "100%" }}
                  // value={type}
                  value={type || undefined}
                  onChange={(value) => setType(value)}
                  allowClear
                  dropdownClassName="create-campaign-dropdown"
                >
                  <Option value="Blog">Blog</Option>
                  <Option value="Hello Doctor">Hello Doctor</Option>
                  <Option value="Patient Education">Patient Education</Option>
                  <Option value="Interview">Interview</Option>
                </Select>
                <span className="create-campaign-input-span">
                <span style={{ color: "red" }}>*</span>Type</span>
              </Form.Item>
            </div>
          </div>

          <Form.Item>
            <Input
              className="settings-input"
              placeholder="Enter URL"
              defaultValue=""
              value={videoURL}
              onChange={(e) => setVideoURL(e.target.value)}
            />
            <span className="create-campaign-input-span">Video URL</span>
          </Form.Item>

          <div className="col-lg-6">
            <Form.Item>
              <ColorPicker
                defaultValue={backgroundColor}
                onChange={(color) => {
                  const hexColor = color.toHexString();
                  setBackgroundColor(hexColor);
                }}
                showText
                allowClear={false}
                required
              />
              <span className="create-campaign-input-span">
              <span style={{ color: "red" }}>*</span>
                Background Color
              </span>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default CreateNews;
