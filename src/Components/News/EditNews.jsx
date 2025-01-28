import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Upload, message, Row, Col } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ColorPicker } from "antd";
import { Instance } from "../../AxiosConfig";

import { showSuccessMessage } from "../../globalConstant";
import DOMPurify from "dompurify";
import { editNews } from "../../Features/NewsSlice";
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

const EditNews = ({ open, handleCancel, newsData }) => {
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

  useEffect(() => {
    if (newsData) {
      setHeading(newsData.heading || "");
      setSubheading(newsData.subheading || "");
      setAbout(newsData.about || "");
      setContent(DOMPurify.sanitize(newsData.content || ""));
      setBackgroundColor(newsData.backgroundColor || "#1677ff");
      setUploadedImage(newsData.image || null);
    }
  }, [newsData]);

  const handleUpdate = async () => {
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

      const data = {
        heading: heading || "",
        subheading: subheading || "",
        about: about || "",
        content: content || "",
        backgroundColor: backgroundColor || "#1677ff",
      };

      formData.append("data", JSON.stringify(data));

      if (uploadedImage) {
        formData.append("image", uploadedImage);
      } else if (newsData.image) {
        formData.append("image", newsData.image);
      }

      console.log("Form data being sent:", formData);
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await Instance.put(`/cards/${newsData._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("edit", response);
      if (response?.status === 200 || response?.status === 201) {
        handleCancel();
        showSuccessMessage("News Edited successfully!");
        dispatch(editNews(response?.data));
      }
    } catch (error) {
      console.error("Error updating news:", error);
      message.error("Failed to update news.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Modal
        visible={open}
        title={<span className="create-campaign-modal-title">Edit News</span>}
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
                <IoCloudUploadOutline className="image-upload-icon"/>{" "}
                <span style={{ color: "#727880" }}>Upload Image</span>
              </span>
            </Upload>
            {uploadedImage && (
              <div className="uploaded-image-preview d-flex gap-2">
                <img
                  src={
                    typeof uploadedImage === "string"
                      ? uploadedImage
                      : URL.createObjectURL(uploadedImage)
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
              <span style={{ color: "red" }}>*</span> Image
            </span>{" "}
          </Form.Item>
          <Form.Item>
            <Input
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="Add Heading"
            />
            <span className="create-campaign-input-span">
              <span style={{ color: "red" }}>*</span> Heading
            </span>{" "}
          </Form.Item>
          <Form.Item>
            <Input
              value={subheading}
              onChange={(e) => setSubheading(e.target.value)}
              placeholder="Add Sub Heading"
            />
            <span className="create-campaign-input-span">
              <span style={{ color: "red" }}>*</span> Sub Heading
            </span>{" "}
          </Form.Item>
          <Form.Item>
            <TextArea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="About"
            />
            <span className="create-campaign-input-span">
              <span style={{ color: "red" }}>*</span> About
            </span>{" "}
          </Form.Item>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item>
                <ColorPicker
                  value={backgroundColor}
                  onChange={(color) => {
                    const hexColor = color.toHexString();
                    setBackgroundColor(hexColor);
                  }}
                  showText
                  allowClear={false}
                />

                <span className="create-campaign-input-span">
                  <span style={{ color: "red" }}>*</span> Background Color
                </span>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <ReactQuill
              theme="snow"
              modules={modules}
              value={content}
              onChange={setContent}
              placeholder="Your text goes here"
              className="news-content"
            />
            <span className="create-campaign-input-span">
              <span style={{ color: "red" }}>*</span> Content Points
            </span>{" "}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditNews;
