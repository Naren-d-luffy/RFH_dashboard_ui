import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Form, Input, message, Upload } from "antd";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { showSuccessMessage,editorConfig, formatListWithTriangleBullets } from "../../globalConstant";
import { Instance } from "../../AxiosConfig";
import { editDepartment } from "../../Features/DepartmentSlice";
import { IoCloudUploadOutline } from "react-icons/io5";
import Loader from "../../Loader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import JoditEditor from "jodit-react";
import { FiMaximize2, FiMinimize2, FiX } from "react-icons/fi";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic"],
    ["link", "image"],
    ["clean"],
  ],
};
// const { TextArea } = Input;

const EditDepartmentDetails = ({ open, handleCancel, departmentData }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (departmentData) {
      setTitle(departmentData.title || "");
      setSubtitle(departmentData.subtitle || "");
      setDescription(departmentData.description || "");
      if (departmentData.thumbnail) {
        setImagePreviewUrl(departmentData.thumbnail);
      }
    }
  }, [departmentData]);

  const editor = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const toggleMaximize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMaximized(!isMaximized);
  };

  const handleUpdate = async () => {
   
    if (!title || !subtitle || !imagePreviewUrl) {
      message.error("Please fill in all required fields.");
      return;
    }
    setIsLoading(true);
    try {
      const requestData = new FormData();
      requestData.append("title", title);
      requestData.append("subtitle", subtitle);
      requestData.append("description", description);
      if (uploadedImage) {
        requestData.append("thumbnail", uploadedImage);
      }

      const response = await Instance.put(
        `/department/${departmentData._id}`,
        requestData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      dispatch(editDepartment(response.data));
      showSuccessMessage("Department Updated successfully!");
      resetForm();
      handleCancel();
    } catch (error) {
      console.error("Error during department creation:", {
        error: error,
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      message.error("Failed to create department.");
    } finally {
      setIsLoading(false);
    }
  };
  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setDescription("");
    setUploadedImage(null);
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
          <span className="create-campaign-modal-title">Edit Department</span>
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
            <Input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Add Subtitle"
              required
            />
            <span className="create-campaign-input-span">
              <span style={{ color: "red" }}>*</span> Subtitle
            </span>
          </Form.Item>


          <Form.Item>
            <JoditEditor
              ref={editor}
              // config={editorConfig}
              config={{ ...editorConfig, className: "hide-placeholder-editor" }}
              value={description}
              onBlur={(newContent) => {
                const modifiedContent = formatListWithTriangleBullets(newContent);
                setDescription(modifiedContent)}}
              required
            />
            <span className="create-campaign-input-span">Description</span>

          </Form.Item>

          <Form.Item>
            <Upload
              listType="picture"
              showUploadList={false}
              beforeUpload={(file) => {
                setUploadedImage(file);
                setImagePreviewUrl(URL.createObjectURL(file));
                return false;
              }}
              className="upload-users-image"
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
            {(uploadedImage || imagePreviewUrl) && (
              <div className="uploaded-image-preview d-flex gap-2">
                <img
                  src={
                    uploadedImage
                      ? URL.createObjectURL(uploadedImage)
                      : imagePreviewUrl
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
                  onClick={() => {
                    setUploadedImage(null);
                    setImagePreviewUrl("");
                  }}
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
        </Form>
      </Modal>
    </>
  );
};

export default EditDepartmentDetails;
