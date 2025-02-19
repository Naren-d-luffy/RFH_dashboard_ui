import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Form, Input, Upload, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Instance } from "../../../AxiosConfig";
import { showSuccessMessage, validateImage } from "../../../globalConstant";
import { useDispatch } from "react-redux";
import Loader from "../../../Loader";
import { editService } from "../../../Features/ServiceSlice";
import JoditEditor from "jodit-react";
import { FiMaximize2, FiMinimize2, FiX } from "react-icons/fi";

const modules = {
  toolbar: [
    [{ font: [] }, { size: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ script: "sub" }, { script: "super" }],
    [{ direction: "rtl" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link", "image", "formula"],
    ["clean"],
  ],
};
const { TextArea } = Input;
const EditService = ({ open, handleCancel, serviceData }) => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleUploadThumbnail = (info) => {
    const file = info.file.originFileObj;
    if (!validateImage(file)) return false;
    setThumbnailImage(file);
  };
  const handleDeleteThumbnail = () => {
    setThumbnailImage(null);
  };

  const editor = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const toggleMaximize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMaximized(!isMaximized);
  };

  const handleSave = async () => {
    if (!heading || !subHeading || !thumbnailImage) {
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

      const response = await Instance.put(
        `/depcat/service/${serviceData._id}`,
        formData
      );
      if (response?.status === 200 || response?.status === 201) {
        handleCancel();

        showSuccessMessage("Service edited successfully!");
        dispatch(editService(response.data));
        setHeading("");
        setSubHeading("");
        setContent("");
        setThumbnailImage(null);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to Update Service.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open && serviceData) {
      setHeading(serviceData.heading || "");
      setSubHeading(serviceData.subHeading || "");
      setContent(serviceData.content || "");
      setThumbnailImage(serviceData.thumbnail || null);
    }
  }, [open, serviceData]);

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
          <span className="create-campaign-modal-title">Edit Our Services</span>
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
              <span style={{ color: "red" }}>*</span> Sub Heading
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
                  <IoCloudUploadOutline className="image-upload-icon" />{" "}
                  <span style={{ color: "#727880" }}>Upload Thumbnail</span>
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
                      onClick={handleDeleteThumbnail}
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
            <JoditEditor
              ref={editor}
              value={content}
              onChange={setContent}
              required
            />
            <span className="create-campaign-input-span">Content</span>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditService;
