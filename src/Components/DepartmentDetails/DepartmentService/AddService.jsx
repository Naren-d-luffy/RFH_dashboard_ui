import React, { useRef, useState, useMemo } from "react";
import { Button, Modal, Form, Input, Upload, message } from "antd";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Instance } from "../../../AxiosConfig";
import { showSuccessMessage, validateImage,editorConfig, formatListWithTriangleBullets } from "../../../globalConstant";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Loader";
import { addService } from "../../../Features/ServiceSlice";
import JoditEditor from "jodit-react";
import { FiMaximize2, FiMinimize2, FiX } from "react-icons/fi";


const { TextArea } = Input;
const AddService = ({ open, handleCancel,onServiceAdded }) => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [isMaximized, setIsMaximized] = useState(false);
  const editor = useRef(null);
  const [position, setPosition] = useState("");
  const servicesList = useSelector((state) => state.service.services);
  const maxAllowedPosition = servicesList.length + 1;

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

  const handleUploadThumbnail = (info) => {
    const file = info.file.originFileObj;
    if (!validateImage(file)) return false;
    setThumbnailImage(file);
  };

  const handleDeleteThumbnail = () => {
    setThumbnailImage(null);
  };

  const toggleMaximize = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    setIsMaximized(!isMaximized);
  };



  const handleSave = async () => {
    if (!heading || !subHeading || !thumbnailImage || !position) {
      message.error("Please fill in all required fields.");
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("heading", heading);
      formData.append("subHeading", subHeading);
      formData.append("thumbnail", thumbnailImage);
      formData.append("content", content);
      formData.append("position", position);

      const response = await Instance.post("/depcat/service/", formData);
      if (response?.status === 200 || response?.status === 201) {
        handleCancel();

        showSuccessMessage("Service added successfully!");
        dispatch(addService(response.data));
        if (onServiceAdded) {
          await onServiceAdded(response.data);
        }
        setHeading("");
        setSubHeading("");
        setContent("");
        setThumbnailImage(null);
        setPosition("");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to add Service.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancelClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    setHeading("");
    setSubHeading("");
    setContent("");
    setThumbnailImage(null);
    setPosition("");
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
          <span className="create-campaign-modal-title">Add Our Services</span>
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
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="Add Heading"
              required
            />
            <span className="create-campaign-input-span">
              <span style={{ color: "red" }}>*</span> Heading
            </span>
          </Form.Item>
          <Form.Item>
            <TextArea
              value={subHeading}
              onChange={(e) => setSubHeading(e.target.value)}
              placeholder="sub Heading"
              required
            />
            <span className="create-campaign-input-span">
              <span style={{ color: "red" }}>*</span>Sub Heading
            </span>
          </Form.Item>
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
          <div className="row">
            <div className="col-lg-12">
              <Form.Item>
                <Upload
                  listType="picture"
                  showUploadList={false}
                  onChange={handleUploadThumbnail}
                  className="create-campaign-upload"
                  accept="image/*"
                >
                  <p className="create-campaign-ant-upload-text">
                    Drop files here or click to upload
                  </p>
                  <IoCloudUploadOutline className="image-upload-icon" />{" "}
                  <span style={{ color: "#727880" }}>Upload Thumbnail</span>
                </Upload>
                {thumbnailImage && (
                  <div className="uploaded-image-preview">
                    <img
                      src={URL.createObjectURL(thumbnailImage)}
                      alt="Thumbnail"
                      style={{
                        width: "200px",
                        height: "auto",
                        marginTop: "10px",
                      }}
                    />
                    <Button
                      onClick={handleDeleteThumbnail}
                      className="model-image-upload-delete-icon"
                    >
                      <RiDeleteBin5Line />
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
            <JoditEditor
              ref={editor}
              value={content}
              config={editorConfig}
              onBlur={(newContent) => {
                const modifiedContent = formatListWithTriangleBullets(newContent);
                setContent(newContent)}}
            />
            <span className="create-campaign-input-span">Content</span>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddService;
