import React, { useRef, useState } from "react";
import { Button, Modal, Form, Input, message, Upload } from "antd";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Instance } from "../../AxiosConfig";
import { IoCloudUploadOutline } from "react-icons/io5";
import Loader from "../../Loader";
import { addDepartment } from "../../Features/DepartmentSlice";
import { showSuccessMessage,editorConfig } from "../../globalConstant";
import JoditEditor from "jodit-react";
import { FiMaximize2, FiMinimize2, FiX } from "react-icons/fi";


const CreateDepartmentDetails = ({ open, handleCancel }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
   const [content, setContent] = useState("");
  const dispatch = useDispatch();
    const [isMaximized, setIsMaximized] = useState(false);
  
    const editor = useRef(null);
    const toggleMaximize = (e) => {
      e.preventDefault(); // Prevent any form submission
      e.stopPropagation(); // Stop event bubbling
      setIsMaximized(!isMaximized);
    };

  const resetForm = () => {
    setUploadedImage(null);
    setTitle("");
    setSubtitle("");
    setDescription("");
  };
  const handleSave = async () => {
      if (
          !title ||
          !subtitle||
          !uploadedImage
        ) {
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
      const response = await Instance.post("/department", requestData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch(addDepartment(response.data));
      message.success("Department created successfully!");
      showSuccessMessage("Department added successfully!");
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
          <span className="create-campaign-modal-title">Create Department</span>
        }
        closeIcon={closeButtons}
        onCancel={handleCancel}
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
              config={editorConfig}
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />
            <span className="create-campaign-input-span">Content</span>
          </Form.Item>
          <Form.Item>
            <Upload
              listType="picture"
              showUploadList={false}
              beforeUpload={(file) => {
                setUploadedImage(file);
                return false;
              }}
              className="upload-users-image"
            >
              <p className="create-campaign-ant-upload-text">
                Drop files here or click to upload
              </p>
              <span className="create-campaign-ant-upload-drag-icon">
                <IoCloudUploadOutline className="image-upload-icon"/>{" "}
                <span style={{ color: "#727880" }}>Upload Image</span>
              </span>
            </Upload>
            {uploadedImage && (
              <div className="uploaded-image-preview d-flex gap-2">
                <img
                  src={URL.createObjectURL(uploadedImage)}
                  alt="Thumbnail Preview"
                  style={{
                    width: "200px",
                    height: "auto",
                    marginTop: "10px",
                    borderRadius: "5px",
                  }}
                />
                <Button
                  onClick={() => setUploadedImage(null)}
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

export default CreateDepartmentDetails;
