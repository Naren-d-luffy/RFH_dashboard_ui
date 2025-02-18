import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Upload, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Instance } from "../../../AxiosConfig";
import { showSuccessMessage, validateImage } from "../../../globalConstant";
import Loader from "../../../Loader";
import { useDispatch } from "react-redux";
import { editFacility } from "../../../Features/FacilitySlice";

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

const EditFacility = ({ open, handleCancel, facilityData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [videoHeading, setVideoHeading] = useState("");
  const [videoSubHeading, setVideoSubHeading] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
console.log("FacilityData",facilityData)
  useEffect(() => {
    if (open && facilityData) {
      setTitle(facilityData.heading || "");
      setDescription(facilityData.subHeading || "");
      setContent(facilityData.content || "");
      setVideoHeading(facilityData.video_heading || "");
      setVideoSubHeading(facilityData.video_subHeading || "");
      setUploadedImage(facilityData.video || "");
      setThumbnailImage(facilityData.thumbnail || null);
    }
  }, [open, facilityData]);

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

  const handleUploadThumbnail = (info) => {
    const file = info.file.originFileObj;
    if (!validateImage(file)) return false;
    setThumbnailImage(file);
  };

  const handleDeleteThumbnail = () => {
    setThumbnailImage(null);
  };

  const handleUpdate = async () => {
    if (
      !title ||
      !thumbnailImage 
    ) {
      message.error("Please fill in all required fields.");
      return;
    }
    const isAnyVideoFieldFilled = videoHeading || videoSubHeading || uploadedImage;
    const areAllVideoFieldsFilled = videoHeading && videoSubHeading && uploadedImage;
  
    if (isAnyVideoFieldFilled && !areAllVideoFieldsFilled) {
      message.error("If you provide a Video Heading, Video Subheading, or Upload a Video, then all three must be filled.");
      return;
    }
  

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("heading", title);
      formData.append("subHeading", description);
      formData.append("content", content);
      formData.append("video_heading", videoHeading);
      formData.append("video_subHeading", videoSubHeading);

      if (uploadedImage && typeof uploadedImage !== "string") {
        formData.append("video", uploadedImage);
      }
      if (thumbnailImage && typeof thumbnailImage !== "string") {
        formData.append("thumbnail", thumbnailImage);
      }

      const response = await Instance.put(
        `/depcat/facility/${facilityData._id}`,
        formData
      );
      if (response?.status === 200 || response?.status === 201) {
        showSuccessMessage("Facility updated successfully!");
        handleCancel();
        dispatch(editFacility(response.data));
      }
    } catch (error) {
      console.error("Failed to update facility:", error);
      message.error("Failed to update facility.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Modal
        visible={open}
        title={
          <span className="create-campaign-modal-title">
            Edit Facility
          </span>
        }
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
            key="update"
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
             Description
            </span>
          </Form.Item>
          <div className="row">
            <div className="col-lg-6">
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
                  <IoCloudUploadOutline />{" "}
                  <span style={{ color: "#727880" }}>Upload Thumbnail</span>
                </Upload>
                {thumbnailImage && (
                  <div className="uploaded-image-preview">
                    <img
                      src={
                        typeof thumbnailImage === "string"
                          ? thumbnailImage
                          : URL.createObjectURL(thumbnailImage)
                      }
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
                  <IoCloudUploadOutline className="image-upload-icon" />{" "}
                  <span style={{ color: "#727880" }}>Upload Video</span>
                </Upload>
                {uploadedImage && (
                  <div className="uploaded-image-preview">
                    <img
                      src={
                        typeof uploadedImage === "string"
                          ? uploadedImage
                          : URL.createObjectURL(uploadedImage)
                      }
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
                  Upload video
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
              
            />
            <span className="create-campaign-input-span">
              Content
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
               Video Heading
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
               Video Subheading
            </span>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditFacility;
