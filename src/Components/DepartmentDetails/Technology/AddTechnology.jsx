import React, { useState } from "react";
import { Button, Modal, Form, Input, Upload, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Instance } from "../../../AxiosConfig";
import { showSuccessMessage } from "../../../globalConstant";
import { useDispatch } from "react-redux";
import Loader from "../../../Loader";
import { addTechnology } from "../../../Features/TechnologySlice";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic"],
    ["link", "image"],
    ["clean"],
  ],
};

const { TextArea } = Input;

const AddTechnology = ({ open, handleCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleUploadThumbnail = (info) => {
    const file = info.file.originFileObj;
    setThumbnailImage(file);
  };

  const handleDeleteThumbnail = () => {
    setThumbnailImage(null);
  };

  const handleSave = async () => {
    if (!title || !description || !content || !thumbnailImage) {
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

      const response = await Instance.post("/depcat/technology", formData);
      if (response?.status === 200 || response?.status === 201) {
        handleCancel();
        showSuccessMessage("Technology added successfully!");
        dispatch(addTechnology(response.data));
        setTitle("");
        setDescription("");
        setContent("");
        setThumbnailImage(null);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to add technology.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelClick = () => {
    setTitle("");
    setDescription("");
    setContent("");
    setThumbnailImage(null);
    handleCancel();
  };
  return (
    <>
      {isLoading && <Loader />}
      <Modal
        visible={open}
        title={
          <span className="create-campaign-modal-title">
            Add Department Technology
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
        </Form>
      </Modal>
    </>
  );
};

export default AddTechnology;
