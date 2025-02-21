import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Form, Input, Upload, message, Switch } from "antd";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Instance } from "../../../AxiosConfig";
import { showSuccessMessage, validateImage } from "../../../globalConstant";
import Loader from "../../../Loader";
import { useDispatch, useSelector } from "react-redux";
import { editTechnology } from "../../../Features/TechnologySlice";
import JoditEditor from "jodit-react";
import { FiMaximize2, FiMinimize2, FiX } from "react-icons/fi";

const { TextArea } = Input;

const EditTechnology = ({ open, handleCancel, technologyData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [, setUploadedImage] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [isOverview, setIsOverview] = useState(false);
  const [position, setPosition] = useState("");
  const editor = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const toggleMaximize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMaximized(!isMaximized);
  };
  console.log("tech", technologyData);
  useEffect(() => {
    if (open && technologyData) {
      setTitle(technologyData?.heading || "");
      setDescription(technologyData?.subHeading || "");
      setContent(technologyData?.content || "");
      setUploadedImage(technologyData?.video || null);
      setThumbnailImage(technologyData?.thumbnail || null);
      setIsOverview(technologyData?.isOverview);
      setPosition(technologyData?.position);
    }
  }, [open, technologyData]);

  const handleUploadThumbnail = (info) => {
    const file = info.file.originFileObj;
    if (!validateImage(file)) return false;

    setThumbnailImage(file);
  };

  const handleDeleteThumbnail = () => {
    setThumbnailImage(null);
  };
  const technologyList = useSelector((state) => state.technology.technologies);
  const maxAllowedPosition = technologyList.length + 1;

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
  const handleUpdate = async () => {
    if (isOverview) {
      if (!title || !position) {
        message.error(
          "Please fill in all required fields (Title and Position)."
        );
        return;
      }
    } else {
      if (!title || !description || !thumbnailImage || !position) {
        message.error("Please fill in all required fields.");
        return;
      }
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("heading", title);
      formData.append("position", position);
      formData.append("isOverview", isOverview);

      // Only append these fields if not in overview mode
      if (!isOverview) {
        formData.append("subHeading", description);
        formData.append("thumbnail", thumbnailImage);
        formData.append("content", content);
      }
      const response = await Instance.put(
        `/depcat/technology/${technologyData._id}`,
        formData
      );
      if (response?.status === 200 || response?.status === 201) {
        showSuccessMessage("Technology updated successfully!");
        handleCancel();
        dispatch(editTechnology(response.data));
      }
    } catch (error) {
      console.error("Failed to update technology:", error);
      message.error("Failed to update technology.");
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
          <span className="create-campaign-modal-title">Edit Technology</span>
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
          <div className="flex justify-between items-center mb-4">
            <Switch
              checked={isOverview}
              onChange={(checked) => setIsOverview(checked)}
              className="gastro-switch-button"
            />
            <span className="mx-2">Overview</span>
          </div>
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

          {!isOverview && (
            <>
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
                      <IoCloudUploadOutline className="image-upload-icon" />{" "}
                      <span style={{ color: "#727880" }}>Upload Thumbnail</span>
                    </Upload>
                    {thumbnailImage && (
                      <div className="uploaded-image-preview">
                        <img
                          src={
                            typeof thumbnailImage === "string"
                              ? thumbnailImage
                              : thumbnailImage
                              ? URL.createObjectURL(thumbnailImage)
                              : ""
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
              </div>

              <Form.Item>
                <JoditEditor
                  ref={editor}
                  value={content}
                  onChange={(newContent) => setContent(newContent)}
                />
                <span className="create-campaign-input-span">Content</span>
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default EditTechnology;
