import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Select,
  Switch,
} from "antd";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Instance } from "../../../../AxiosConfig";
import {
  showSuccessMessage,
  validateImage,
  editorConfig,
} from "../../../../globalConstant";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../Loader";
import { editGastroIllness } from "../../../../Features/GastroIllnessSlice";
import JoditEditor from "jodit-react";
import { FiMaximize2, FiMinimize2, FiX } from "react-icons/fi";

const { TextArea } = Input;

const EditEventsGastroIllness = ({ open, handleCancel, EventData,  onServiceAdded }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [, setThumbnailImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [service, setService] = useState(false);
  const [conditions, setConditions] = useState(false);
  const dispatch = useDispatch();
  const editor = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState("");

  const gastroEvents = useSelector(
    (state) => state.gastroIllness.gastroIllness || []
  );
  const maxAllowedPosition = gastroEvents.length;
  const handlePositionChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setPosition("");
      return;
    }
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0 && numValue <= maxAllowedPosition) {
      setPosition(numValue.toString());
    } else if (numValue > maxAllowedPosition) {
      message.error(`Position cannot be greater than ${maxAllowedPosition}`);
    }
  };

  const toggleMaximize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMaximized(!isMaximized);
  };
  const handleUpload = (info) => {
    const file = info.file.originFileObj;
    if (!validateImage(file)) return false;

    setUploadedImage(file);
  };
  const [type, setType] = useState("");

  const handleDeleteImage = () => {
    setUploadedImage(null);
  };

  useEffect(() => {
    if (open && EventData) {
      setTitle(EventData.title || "");
      setDescription(EventData.description || "");
      setContent(EventData.content || "");
      setUploadedImage(EventData.headerImage || null);
      setType(EventData.type || "");
      setService(EventData.service);
      setConditions(EventData.condition);
      setPosition(EventData.position);
      // setThumbnailImage(EventData.thumbnail || null);
    }
  }, [open, EventData]);

  const handleSave = async () => {
    if (!title || !type || !description || !uploadedImage) {
      message.error("Please fill in all required fields.");
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", content);
      formData.append("headerImage", uploadedImage);
      // formData.append("thumbnail", thumbnailImage);
      formData.append("type", type); // Include type
      formData.append("service", service);
      formData.append("condition", conditions);
      formData.append("position", position);
      const response = await Instance.put(`/gastro/${EventData._id}`, formData);
      if (response?.status === 200 || response?.status === 201) {
        handleCancel();
        showSuccessMessage("GastroIllness Info Updated successfully!");
        dispatch(editGastroIllness(response.data.data));
        if (onServiceAdded) {
          await onServiceAdded(response.data.data);
        }
        setTitle("");
        setDescription("");
        setContent("");
        setUploadedImage("");
        setThumbnailImage("");
        setType("");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to update.");
    } finally {
      setIsLoading(false);
    }
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
        onClick={handleCancel}
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
        title={
          <span className="create-campaign-modal-title">
            Edit Overview Info{" "}
          </span>
        }
        onCancel={handleCancel}
        closeIcon={closeButtons}
        width={isMaximized ? "98%" : 680}
        style={isMaximized ? { top: 10, padding: 0, maxWidth: "98%" } : {}}
        bodyStyle={
          isMaximized ? { height: "calc(100vh - 110px)", overflow: "auto" } : {}
        }
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
            Update
          </Button>,
        ]}
      >
        <Form layout="vertical" className="mt-4">
          <Form.Item>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add Title"
              required
            />
            <span className="create-campaign-input-span">
              <span style={{ color: "red" }}>*</span> Title
            </span>
          </Form.Item>
          <Form.Item>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
            <span className="create-campaign-input-span">
              <span style={{ color: "red" }}>*</span> Description
            </span>
          </Form.Item>
          <div className="row">
            <div className="col-lg-6">
              <Form.Item>
                <Select
                  placeholder="Select Type"
                  value={type || undefined}
                  onChange={(value) => setType(value)}
                >
                  <Select.Option value="Overview of Digestive System">
                    Overview of Digestive System
                  </Select.Option>
                  <Select.Option value="Common Diseases">
                    Common Diseases
                  </Select.Option>
                  <Select.Option value="Common Symptoms">
                    Common Symptoms
                  </Select.Option>
                </Select>
                <span className="create-campaign-input-span">
                  <span style={{ color: "red" }}>*</span> Type
                </span>
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item>
                <Input
                  value={position}
                  onChange={handlePositionChange}
                  placeholder="Position (positive numbers only)"
                  required
                  type="number"
                  min="1"
                />
                <span className="create-campaign-input-span">
                  <span style={{ color: "red" }}>*</span> Position
                </span>
              </Form.Item>
            </div>
            <div className="col-lg-7">
              <div
                className="mt-2"
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <div>
                  <span style={{ color: "var(--black-color)" }}>
                    Department Services{" "}
                  </span>
                  <Switch
                    className="gastro-switch-button"
                    checked={service}
                    onChange={(checked) => setService(checked)}
                  />
                </div>
                <div>
                  <span style={{ color: "var(--black-color)" }}>
                    Conditions we Treat{" "}
                  </span>
                  <Switch
                    className="gastro-switch-button"
                    checked={conditions}
                    onChange={(checked) => setConditions(checked)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-12">
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
                    <IoCloudUploadOutline className="image-upload-icon" />{" "}
                    <span style={{ color: "#727880" }}>Upload Image</span>
                  </span>
                </Upload>
                {uploadedImage && (
                  <div className="uploaded-image-preview d-flex gap-2">
                    <img
                      src={
                        uploadedImage instanceof File
                          ? URL.createObjectURL(uploadedImage)
                          : uploadedImage
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
                <span className="create-campaign-input-span">
                  <span style={{ color: "red" }}>*</span> Header Image
                </span>
              </Form.Item>
            </div>
          </div>
          <Form.Item>
            <JoditEditor
              ref={editor}
              value={content}
              // config={editorConfig}
              config={{ ...editorConfig, className: "hide-placeholder-editor" }}
              onBlur={(newContent) => setContent(newContent)}
            />
            <span className="create-campaign-input-span"> Content Points</span>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default EditEventsGastroIllness;
