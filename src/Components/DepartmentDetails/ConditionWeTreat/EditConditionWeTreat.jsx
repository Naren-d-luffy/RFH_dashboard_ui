import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Upload, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Instance } from "../../../AxiosConfig";
import { showSuccessMessage, validateImage } from "../../../globalConstant";
import Loader from "../../../Loader";
import { useDispatch } from "react-redux";
import { editConditionWeTreat } from "../../../Features/ConditionWeTreatSlice";

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

const EditConditionWeTreat = ({ open, handleCancel, conditionData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  // const [, setUploadedImage] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (open && conditionData) {
      setTitle(conditionData.heading || "");
      setDescription(conditionData.subHeading || "");
      setContent(conditionData.content || "");
      // setUploadedImage(conditionData.video || null);
      setThumbnailImage(conditionData.thumbnail || null);
    }
  }, [open, conditionData]);

  const handleUploadThumbnail = (info) => {
    const file = info.file.originFileObj;
    if (!validateImage(file)) return false;
    setThumbnailImage(file);
  };

  const handleDeleteThumbnail = () => {
    setThumbnailImage(null);
  };

  const handleUpdate = async () => {
    if (!title || !description || !content) {
      message.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("heading", title);
      formData.append("subHeading", description);
      formData.append("content", content);

      if (thumbnailImage && typeof thumbnailImage !== "string") {
        formData.append("thumbnail", thumbnailImage);
      }

      const response = await Instance.put(
        `/depcat/treat/${conditionData._id}`,
        formData
      );
      if (response?.status === 200 || response?.status === 201) {
        showSuccessMessage("Condition we treat updated successfully!");
        handleCancel();
        dispatch(editConditionWeTreat(response.data));
      }
    } catch (error) {
      console.error("Failed to update Condition we treat:", error);
      message.error("Failed to update Condition we treat.");
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
            Edit Condition we treat
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
          <Form.Item>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add Title"
              required
            />
            <span className="create-campaign-input-span">Title</span>
          </Form.Item>
          <Form.Item>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
            <span className="create-campaign-input-span">Description</span>
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
                          : URL.createObjectURL(thumbnailImage)
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
            <span className="create-campaign-input-span">Content</span>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditConditionWeTreat;
