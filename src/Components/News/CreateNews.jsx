import React, { useState } from "react";
import { Button, Modal, Form, Input, Upload, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ColorPicker } from "antd";
import { Instance } from "../../AxiosConfig";
import { showSuccessMessage } from "../../globalConstant";
import { addNews } from "../../Features/NewsSlice";
import { useDispatch } from "react-redux";
import Loader from "../../Loader";
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

const CreateNews = ({ open, handleCancel }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [about, setAbout] = useState("");
  const [content, setContent] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleUpload = (info) => {
    const file = info.file.originFileObj;
    setUploadedImage(file);
  };

  const handleDeleteImage = () => {
    setUploadedImage(null);
  };

  const handleSave = async () => {
    if (
      !heading ||
      !subheading ||
      !content ||
      !uploadedImage ||
      !about ||
      !backgroundColor
    ) {
      message.error("Please fill in all required fields.");
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("heading", heading);
      formData.append("subheading", subheading);
      formData.append("about", about);
      formData.append("content", content);
      formData.append("backgroundColor", backgroundColor);
      if (uploadedImage) {
        formData.append("image", uploadedImage);
      }
      const response = await Instance.post("/cards", formData);
      if (response?.status === 200 || response?.status === 201) {
        handleCancel();
        showSuccessMessage("News created successfully!");
        dispatch(addNews(response.data.data));
        setHeading("");
        setSubheading("");
        setAbout("");
        setContent("");
        setUploadedImage("");
        setBackgroundColor("");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to create news.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancelClick = () => {
    setHeading("");
    setSubheading("");
    setAbout("");
    setContent("");
    setUploadedImage("");
    setBackgroundColor("");
    handleCancel();
  };
  return (
    <>
      {isLoading && <Loader />}
      <Modal
        visible={open}
        title={<span className="create-campaign-modal-title">Create News</span>}
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
                <IoCloudUploadOutline />{" "}
                <span style={{ color: "#727880" }}>Upload Image</span>
              </span>
            </Upload>
            {uploadedImage && (
              <div className="uploaded-image-preview d-flex gap-2">
                <img
                  src={URL.createObjectURL(uploadedImage)}
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
            <span className="create-campaign-input-span">Image</span>
          </Form.Item>
          <Form.Item>
            <Input
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="Add Heading"
              required
            />
            <span className="create-campaign-input-span">Heading</span>
          </Form.Item>
          <Form.Item>
            <Input
              value={subheading}
              onChange={(e) => setSubheading(e.target.value)}
              placeholder="Add Sub Heading"
              required
            />
            <span className="create-campaign-input-span">Sub Heading</span>
          </Form.Item>
          <Form.Item>
            <TextArea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="About"
              required
            />
            <span className="create-campaign-input-span">About</span>
          </Form.Item>
          <Form.Item>
            <ColorPicker
              defaultValue={backgroundColor}
              onChange={(color) => {
                const hexColor = color.toHexString();
                setBackgroundColor(hexColor);
              }}
              showText
              allowClear={false}
              required
            />
            <span className="create-campaign-input-span">Background Color</span>
          </Form.Item>

          <Form.Item>
            <ReactQuill
              theme="snow"
              modules={modules}
              value={content}
              onChange={setContent}
              placeholder="Your text goes here"
              required
            />
            <span className="create-campaign-input-span">Content Points</span>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateNews;
