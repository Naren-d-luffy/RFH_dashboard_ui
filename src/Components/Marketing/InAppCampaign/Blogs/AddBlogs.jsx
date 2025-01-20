import React, { useState } from "react";
import { Button, Modal, Form, Input, Upload, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Instance } from "../../../../AxiosConfig";
import { showSuccessMessage } from "../../../../globalConstant";
import { useDispatch } from "react-redux";
import Loader from "../../../../Loader";
import { addBlog } from "../../../../Features/BlogSlice";
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

const AddBlogs = ({ open, handleCancel }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleUpload = (info) => {
    const file = info.file.originFileObj;
    setUploadedImage(file);
  };

  const handleDeleteImage = () => {
    setUploadedImage(null);
  };
  const handleUpload1 = (info) => {
    const file = info.file.originFileObj;
    setThumbnailImage(file);
  };

  const handleDeleteImage1 = () => {
    setThumbnailImage(null);
  };

  const handleSave = async () => {
    if (
      !heading ||
      !subHeading ||
      !content ||
      !uploadedImage ||
      !thumbnailImage
    ) {
      message.error("Please fill in all required fields.");
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("heading", heading);
      formData.append("subHeading", subHeading);
      formData.append("content", content);
      formData.append("image", uploadedImage);
      formData.append("thumbnail", thumbnailImage);

      const response = await Instance.post("/discover/blog", formData);
      console.log("blog",response)
      if (response?.status === 200 || response?.status === 201) {
        handleCancel();

        showSuccessMessage("Blog Added successfully!");
        dispatch(addBlog(response.data));
        setHeading("");
        setSubHeading("");
        setContent("");
        setUploadedImage("");
        setThumbnailImage("");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to add Blog.");
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
            Add Blog
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
            Save
          </Button>,
        ]}
      >
        <Form layout="vertical" className="mt-4">
          <Form.Item>
            <Input
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="Add heading"
              required
            />
            <span className="create-campaign-input-span">heading</span>
          </Form.Item>
          <Form.Item>
            <TextArea
              value={subHeading}
              onChange={(e) => setSubHeading(e.target.value)}
              placeholder="Sub Heading"
              required
            />
            <span className="create-campaign-input-span">Sub Heading</span>
          </Form.Item>
          <div className="row">
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
                <span className="create-campaign-input-span">Header Image</span>
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
                    <IoCloudUploadOutline />{" "}
                    <span style={{ color: "#727880" }}>Upload Image</span>
                  </span>
                </Upload>
                {thumbnailImage && (
                  <div className="uploaded-image-preview d-flex gap-2">
                    <img
                      src={URL.createObjectURL(thumbnailImage)}
                      alt="Uploaded"
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
                  Thumbnail Image
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
            <span className="create-campaign-input-span">Content Points</span>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AddBlogs;
