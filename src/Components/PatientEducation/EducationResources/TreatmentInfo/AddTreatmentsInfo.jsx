import React, { useRef, useState } from "react";
import { Button, Modal, Form, Input, Upload, message, Switch } from "antd";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Instance } from "../../../../AxiosConfig";
import { showSuccessMessage, validateImage } from "../../../../globalConstant";
import { useDispatch } from "react-redux";
import Loader from "../../../../Loader";
import { addTreatment } from "../../../../Features/TreatmentInfoSlice";
import JoditEditor from "jodit-react";
import { FiMaximize2, FiMinimize2, FiX } from "react-icons/fi";

const { TextArea } = Input;

const AddTreatmentsInfo = ({ open, handleCancel }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [service, setService] = useState(false);
  const [conditions, setConditions] = useState(false);
  const dispatch = useDispatch();
  const editor = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);
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

  const handleDeleteImage = () => {
    setUploadedImage(null);
  };
  const handleUpload1 = (info) => {
    const file = info.file.originFileObj;
    if (!validateImage(file)) return false;
    setThumbnailImage(file);
  };

  const handleDeleteImage1 = () => {
    setThumbnailImage(null);
  };

  const handleSave = async () => {
    if (!title || !description || !uploadedImage || !thumbnailImage) {
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
      formData.append("thumbnail", thumbnailImage);
      formData.append("service", service);
      formData.append("condition", conditions);
      const response = await Instance.post("/education", formData);
      if (response?.status === 200 || response?.status === 201) {
        handleCancel();
        dispatch(addTreatment(response.data.data));
        showSuccessMessage("Common procedure added successfully!");
        setTitle("");
        setDescription("");
        setContent("");
        setUploadedImage("");
        setThumbnailImage("");
        setConditions(false);
        setService(false);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to add common procedure.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancelClick = () => {
    setTitle("");
    setDescription("");
    setContent("");
    setUploadedImage(null);
    setThumbnailImage(null);
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
        title={
          <span className="create-campaign-modal-title">
            Add Common procedure{" "}
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
            <div className="col-lg-12">
              <div
                className="mt-2"
                style={{ display: "flex", gap: "30px", alignItems: "center" }}
              >
                <div>
                  <span>Department Services </span>
                  <Switch
                    className="gastro-switch-button"
                    checked={service}
                    onChange={(checked) => setService(checked)}
                  />
                </div>
                <div>
                  <span>Conditions we Treat </span>
                  <Switch
                    className="gastro-switch-button"
                    checked={conditions}
                    onChange={(checked) => setConditions(checked)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-6">
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
                  <span style={{ color: "red" }}>*</span> Header Image
                </span>
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item>
                <Upload
                  listType="picture"
                  showUploadList={false}
                  onChange={handleUpload1}
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
                {thumbnailImage && (
                  <div className="uploaded-image-preview d-flex gap-2">
                    <img
                      src={URL.createObjectURL(thumbnailImage)}
                      alt="Uploaded"
                      style={{
                        width: "200px",
                        height: "auto",
                        marginTop: "10px",
                        borderRadius: "5px",
                      }}
                    />
                    <Button
                      onClick={handleDeleteImage1}
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
                  <span style={{ color: "red" }}>*</span> Thumbnail Image
                </span>
              </Form.Item>
            </div>
          </div>

          <Form.Item>
            <JoditEditor ref={editor} value={content} onChange={setContent} />
            <span className="create-campaign-input-span"> Content Points</span>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AddTreatmentsInfo;
