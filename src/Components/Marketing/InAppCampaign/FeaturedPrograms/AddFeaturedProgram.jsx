import React, { useRef, useState } from "react";
import { Button, Modal, Form, Input, message, Upload } from "antd";
import { Instance } from "../../../../AxiosConfig";
import { showSuccessMessage, validateImage,editorConfig, formatListWithTriangleBullets } from "../../../../globalConstant";
import { useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa6";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { addFeature } from "../../../../Features/FeatureSlice";
import JoditEditor from "jodit-react";
import { FiMaximize2, FiMinimize2, FiX } from "react-icons/fi";
const { TextArea } = Input;
const AddFeaturesModal = ({ open, handleCancel }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [features, setFeatures] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleAddFeatures = () => {
    setFeatures([...features, ""]);
  };
  const handleUpload = (info) => {
    const file = info.file.originFileObj;
    if (!validateImage(file)) return;
    setUploadedImage(file);
  };

  const handleDeleteImage = () => {
    setUploadedImage(null);
  };
  const handleFeaturesChange = (e, index) => {
    const newTags = [...features];
    newTags[index] = e.target.value;
    setFeatures(newTags);
  };

  const handleRemoveFeatures = (index) => {
    const newTags = features.filter((_, idx) => idx !== index);
    setFeatures(newTags);
  };
  const editor = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const toggleMaximize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMaximized(!isMaximized);
  };
  const handleSave = async () => {
    if (!title || !description || !uploadedImage) {
      message.error("Please fill in all required fields.");
      return;
    }

    const payload = {
      title: title,
      description: description,
      tags: features,
      content: content,
      thumbnail: uploadedImage,
    };
    setIsLoading(true);
    try {
      const response = await Instance.post(
        "/discover/featuredProgram",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.status === 200 || response?.status === 201) {
        handleCancel();
        showSuccessMessage("Feature added successfully!");
        dispatch(addFeature(response.data.data));
        setTitle("");
        setDescription("");
        setFeatures([]);
        setContent("");
        setUploadedImage(null);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to create feature.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancelClick = () => {
    setTitle("");
    setDescription("");
    setFeatures([]);
    setContent("");
    setUploadedImage(null);
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
    <Modal
      visible={open}
      title={
        <span className="create-campaign-modal-title">
          Create Feature Program
        </span>
      }
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
        <Form.Item>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <span className="create-campaign-input-span">
            <span style={{ color: "red" }}>*</span> Feature Title
          </span>
        </Form.Item>

        <Form.Item>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description "
            required
          />
          <span className="create-campaign-input-span">
            <span style={{ color: "red" }}>*</span> Description
          </span>
        </Form.Item>

        <h6 style={{ color: "var(--black-color)" }}>Features</h6>
        <div className="row mb-4">
          <div className="d-flex flex-column gap-2 mt-3">
            <button
              type="button"
              className="health-package-add-feature d-flex gap-2 align-items-center mb-2"
              onClick={handleAddFeatures}
            >
              Add +
            </button>
            {features?.map((tag, index) => (
              <div key={index} className="d-flex align-items-center gap-2">
                <Form.Item className="mb-0">
                  <input
                    className="health-package-input "
                    type="text"
                    value={tag}
                    onChange={(e) => handleFeaturesChange(e, index)}
                    placeholder="Add tag"
                    style={{ marginBottom: "0px" }}
                  />
                </Form.Item>
                <FaTrash
                  className="trash-icon-health-package"
                  onClick={() => handleRemoveFeatures(index)}
                />
              </div>
            ))}
          </div>
        </div>
        <Form.Item>
          <JoditEditor
            ref={editor}
            value={content}
            config={editorConfig}
            onBlur={(newContent) => {
              const modifiedContent = formatListWithTriangleBullets(newContent);
            setContent(modifiedContent)}}
            required
          />
          <span className="create-campaign-input-span">Content</span>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddFeaturesModal;
