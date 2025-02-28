import React, { useMemo, useRef, useState } from "react";
import { Button, Modal, Form, Input, Upload, message } from "antd";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Instance } from "../../../AxiosConfig";
import { showSuccessMessage, validateImage,editorConfig } from "../../../globalConstant";
import { useDispatch,useSelector } from "react-redux";
import Loader from "../../../Loader";
import { addFacility } from "../../../Features/FacilitySlice";
import JoditEditor from "jodit-react";
import { FiMaximize2, FiMinimize2, FiX } from "react-icons/fi";

const { TextArea } = Input;

const AddFacility = ({ open, handleCancel,onFacilityAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [videoHeading, setVideoHeading] = useState("");
  const [videoSubHeading, setVideoSubHeading] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState("");

  const facilities = useSelector((state) => state.facility.facilities);
  const maxAllowedPosition = facilities.length + 1;
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
  const editor = useRef(null);
  
  const handleUpload = (info) => {
    const file = info.file.originFileObj;
    const isVideo = file.type.startsWith("video/");
    const isLt50MB = file.size / 1024 / 1024 < 50;

    if (!isVideo) {
      message.destroy();
      message.error("Only video files are allowed!");
      return;
    }

    if (!isLt50MB) {
      message.destroy();
      message.error("Video size must be less than 50MB!");
      return;
    }

    setUploadedImage(file);
  };

  const handleDeleteImage = () => {
    setUploadedImage(null);
  };

  const toggleMaximize = (e) => {
    e.preventDefault(); // Prevent any form submission
    e.stopPropagation(); // Stop event bubbling
    setIsMaximized(!isMaximized);
  };

  const handleUploadThumbnail = (info) => {
    const file = info.file.originFileObj;
    if (!validateImage(file)) return false;
    setThumbnailImage(file);
  };

  const handleDeleteThumbnail = () => {
    setThumbnailImage(null);
  };

  const handleSave = async () => {
    if (!title || !thumbnailImage|| !position) {
      message.error("Please fill in all required fields.");
      return;
    }
    const isAnyVideoFieldFilled =
      videoHeading || videoSubHeading || uploadedImage;
    const areAllVideoFieldsFilled =
      videoHeading && videoSubHeading && uploadedImage;

    if (isAnyVideoFieldFilled && !areAllVideoFieldsFilled) {
      message.error(
        "If you provide a Video Heading, Video Subheading, or Upload a Video, then all three must be filled."
      );
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("heading", title);
      formData.append("subHeading", description);
      formData.append("thumbnail", thumbnailImage);
      formData.append("content", content);
      formData.append("video_heading", videoHeading);
      formData.append("video", uploadedImage ? uploadedImage : "");
      formData.append("video_subHeading", videoSubHeading);
      formData.append("position",position);
      const response = await Instance.post("/depcat/facility", formData);
      if (response?.status === 200 || response?.status === 201) {
        handleCancel();

        showSuccessMessage("Facility added successfully!");
        dispatch(addFacility(response.data));
        if (onFacilityAdded) {
          await onFacilityAdded(response.data);
        }
        setTitle("");
        setDescription("");
        setContent("");
        setUploadedImage(null);
        setThumbnailImage(null);
        setVideoHeading("");
        setVideoSubHeading("");
        setPosition("");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to add facility.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancelClick = (e) => {
    e.preventDefault(); // Prevent any form submission
    e.stopPropagation(); // Stop event bubbling
    setTitle("");
    setDescription("");
    setContent("");
    setUploadedImage(null);
    setThumbnailImage(null);
    setVideoHeading("");
    setVideoSubHeading("");
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
          <span className="create-campaign-modal-title">Add Facility</span>
        }
        closeIcon={closeButtons}
        onCancel={handleCancelClick}
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
          <Form.Item>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
            <span className="create-campaign-input-span">Description</span>
          </Form.Item>
          <div className="row">
            <div className="col-lg-12">
              <Form.Item>
                <Upload
                  listType="picture"
                  showUploadList={false}
                  onChange={handleUploadThumbnail}
                  className="create-campaign-upload"
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
              onChange={(newContent) => setContent(newContent)}
            />
            <span className="create-campaign-input-span">Content</span>
          </Form.Item>
          <Form.Item>
            <Input
              value={videoHeading}
              onChange={(e) => setVideoHeading(e.target.value)}
              placeholder="Video Heading"
              required
            />
            <span className="create-campaign-input-span">Video Heading</span>
          </Form.Item>
          <Form.Item>
            <Input
              value={videoSubHeading}
              onChange={(e) => setVideoSubHeading(e.target.value)}
              placeholder="Video Subheading"
              required
            />
            <span className="create-campaign-input-span">Video Subheading</span>
          </Form.Item>
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
                <IoCloudUploadOutline />{" "}
                <span style={{ color: "#727880" }}>Upload Video</span>
              </Upload>
              {uploadedImage && (
                <div className="uploaded-image-preview">
                  <img
                    src={URL.createObjectURL(uploadedImage)}
                    alt="Video"
                    style={{
                      width: "200px",
                      height: "auto",
                      marginTop: "10px",
                    }}
                  />
                  <Button
                    onClick={handleDeleteImage}
                    className="model-image-upload-delete-icon"
                  >
                    <RiDeleteBin5Line />
                  </Button>
                </div>
              )}
              <span className="create-campaign-input-span">Upload Video</span>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AddFacility;
