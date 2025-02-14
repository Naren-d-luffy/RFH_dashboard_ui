import React, { useState } from "react";
import { Button, Modal, Form, Input, Upload, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Instance } from "../../../AxiosConfig";
import { showSuccessMessage, validateImage } from "../../../globalConstant";
import { useDispatch } from "react-redux";
import Loader from "../../../Loader";
import { addFacility } from "../../../Features/FacilitySlice";

const modules = {
  toolbar: [
    [{ font: [] }, { size: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }], 
    [{ script: "sub" }, { script: "super" }],
    [{ direction: "rtl" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link", "image", "formula"],
    ["clean"],
  ],
};

const { TextArea } = Input;

const AddFacility = ({ open, handleCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [videoHeading, setVideoHeading] = useState("");
  const [videoSubHeading, setVideoSubHeading] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleUpload = (info) => {
    const file = info.file.originFileObj;
    const isVideo = file.type.startsWith("video/");
    const isLt50MB = file.size / 1024 / 1024 < 50;
  
    if (!isVideo) {
      message.destroy()
      message.error("Only video files are allowed!");
      return;
    }
  
    if (!isLt50MB) {
      message.destroy()
      message.error("Video size must be less than 50MB!");
      return;
    }
  
    setUploadedImage(file);
  };
  

  const handleDeleteImage = () => {
    setUploadedImage(null);
  };

  const handleUploadThumbnail = (info) => {
    const file = info.file.originFileObj;
    if (!validateImage(file)) return false;
    setThumbnailImage(file);
  };

  const handleDeleteThumbnail = () => {
    setThumbnailImage(null);
  };
  const isContentEmpty = (content) => {
    if (!content || content.trim() === "") return true;
  
    // Remove all HTML tags and check if there's any meaningful text left
    const strippedContent = content.replace(/<\/?[^>]+(>|$)/g, "").trim();
  
    return strippedContent === "";
  };
  const handleSave = async () => {
    if (
      !title ||
      !description ||
      isContentEmpty(content) ||      
      !uploadedImage ||
      !thumbnailImage ||
      !videoHeading ||
      !videoSubHeading
    ) {
      message.error("Please fill in all required fields.");
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
      formData.append("video", uploadedImage);
      formData.append("video_subHeading", videoSubHeading);

      const response = await Instance.post("/depcat/facility", formData);
      if (response?.status === 200 || response?.status === 201) {
        handleCancel();

        showSuccessMessage("Facility added successfully!");
        dispatch(addFacility(response.data));
        setTitle("");
        setDescription("");
        setContent("");
        setUploadedImage(null);
        setThumbnailImage(null);
        setVideoHeading("");
        setVideoSubHeading("");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to add facility.");
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
    setVideoHeading("");
    setVideoSubHeading("");
    handleCancel();
  };
  return (
    <>
      {isLoading && <Loader />}
      <Modal
        visible={open}
        title={
          <span className="create-campaign-modal-title">
            Add Facility
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
                <IoCloudUploadOutline className="image-upload-icon"/>{" "}
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
            <ReactQuill
              theme="snow"
              modules={modules}
              value={content}
              onChange={setContent}
              placeholder="Your text goes here"
              required
            />
            <span className="create-campaign-input-span">
              <span style={{ color: "red" }}>*</span> Content
            </span>
          </Form.Item>
          <Form.Item>
            <Input
              value={videoHeading}
              onChange={(e) => setVideoHeading(e.target.value)}
              placeholder="Video Heading"
              required
            />
            <span className="create-campaign-input-span">
              <span style={{ color: "red" }}>*</span>Video Heading
            </span>
          </Form.Item>
          <Form.Item>
            <Input
              value={videoSubHeading}
              onChange={(e) => setVideoSubHeading(e.target.value)}
              placeholder="Video Subheading"
              required
            />
            <span className="create-campaign-input-span">
              <span style={{ color: "red" }}>*</span> Video Subheading
            </span>
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
              <span className="create-campaign-input-span">
                <span style={{ color: "red" }}>*</span> Upload Video
              </span>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AddFacility;
