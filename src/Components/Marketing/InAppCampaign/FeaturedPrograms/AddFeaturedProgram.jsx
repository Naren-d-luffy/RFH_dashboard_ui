import React, { useState } from "react";
import { Button, Modal, Form, Input, message, Select, Upload } from "antd";
import { Instance } from "../../../../AxiosConfig";
import { showSuccessMessage } from "../../../../globalConstant";
import { useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa6";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { addFeature } from "../../../../Features/FeatureSlice";
const { TextArea } = Input;
const { Option } = Select;
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic"],
    ["link", "image"],
    ["clean"],
  ],
};
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

  const handleSave = async () => {
    if (
      !title ||
      !description ||
      !content ||
      features.length === 0 ||
      !uploadedImage
    ) {
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
    console.log(payload);
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
        dispatch(addFeature(response.data));
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
  return (
    <Modal
      visible={open}
      title={
        <span className="create-campaign-modal-title">
          Create Feature Program
        </span>
      }
      onCancel={handleCancelClick}
      width={680}
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
          >
            <p className="create-campaign-ant-upload-text">
              Drop files here or click to upload
            </p>
            <span className="create-campaign-ant-upload-drag-icon">
              <IoCloudUploadOutline />{" "}
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
          <span className="create-campaign-input-span">Image</span>
        </Form.Item>
        <Form.Item label="Feature Title">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
        </Form.Item>

        <Form.Item label="Description ">
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description "
            required
          />
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
            {features.map((tag, index) => (
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
          <ReactQuill
            theme="snow"
            modules={modules}
            value={content}
            onChange={setContent}
            placeholder="Your text goes here"
            required
          />
          <span className="create-campaign-input-span">Content</span>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddFeaturesModal;
