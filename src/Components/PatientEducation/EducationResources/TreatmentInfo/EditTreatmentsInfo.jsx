import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Upload, message,Switch } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Instance } from "../../../../AxiosConfig";
import { showSuccessMessage, validateImage } from "../../../../globalConstant";
import { useDispatch } from "react-redux";
import Loader from "../../../../Loader";
import { editTreatment } from "../../../../Features/TreatmentInfoSlice";
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

const EditTreatmentsInfo = ({ open, handleCancel, treatmentData }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [service, setService] = useState(false);
  const [conditions, setConditions] = useState(false);
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
  useEffect(() => {
    if (open && treatmentData) {
      setTitle(treatmentData.title || "");
      setDescription(treatmentData.description || "");
      setContent(treatmentData.content || "");
      setUploadedImage(treatmentData.headerImage || null);
      setThumbnailImage(treatmentData.thumbnail || null);
      setConditions(treatmentData.condition);
      setService(treatmentData.service)
    }
  }, [open, treatmentData]);

  const handleSave = async () => {
    const strippedContent = content.replace(/<[^>]*>/g, "").trim();
    if (
      !title ||
      !description ||
      !strippedContent ||
      !uploadedImage ||
      !thumbnailImage
    ) {
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
      const response = await Instance.put(
        `/education/${treatmentData._id}`,
        formData
      );
      if (response?.status === 200 || response?.status === 201) {
        handleCancel();
        dispatch(editTreatment(response.data.data));
        showSuccessMessage("Common procedure updated successfully!");
        setTitle("");
        setDescription("");
        setContent("");
        setUploadedImage("");
        setThumbnailImage("");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to update.");
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
            Edit Common procedure{" "}
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
                      src={
                        thumbnailImage instanceof File
                          ? URL.createObjectURL(thumbnailImage)
                          : thumbnailImage
                      }
                      alt="Thumbnail"
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
            <ReactQuill
              theme="snow"
              modules={modules}
              value={content}
              onChange={setContent}
              placeholder="Your text goes here"
              required
            />
            <span className="create-campaign-input-span">
              <span style={{ color: "red" }}>*</span> Content Points
            </span>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default EditTreatmentsInfo;
