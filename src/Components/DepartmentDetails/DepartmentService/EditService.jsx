import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Modal, Form, Input, Upload, message } from "antd";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Instance } from "../../../AxiosConfig";
import { showSuccessMessage, validateImage ,editorConfig} from "../../../globalConstant";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Loader";
import { editService } from "../../../Features/ServiceSlice";
import JoditEditor from "jodit-react";
import { FiMaximize2, FiMinimize2, FiX } from "react-icons/fi";

const { TextArea } = Input;
const EditService = ({ open, handleCancel, serviceData,onServiceAdded }) => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

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

  const editor = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);
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

      const response = await Instance.put(
        `/depcat/service/${serviceData._id}`,
        formData
      );
      if (response?.status === 200 || response?.status === 201) {
        handleCancel();

        showSuccessMessage("Service edited successfully!");
        dispatch(editService(response.data));
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
      setPosition(serviceData?.position || "");
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
              // config={editorConfig}
              config={{ ...editorConfig, className: "hide-placeholder-editor" }}
              onBlur={(newContent) => setContent(newContent)}
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
