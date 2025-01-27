import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, message, Row, Col, Upload } from "antd";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { showSuccessMessage } from "../../globalConstant";
import { Instance } from "../../AxiosConfig";
import { editDepartment } from "../../Features/DepartmentSlice";
import { IoCloudUploadOutline } from "react-icons/io5";
import Loader from "../../Loader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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

const EditDepartmentDetails = ({ open, handleCancel, departmentData }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const [successStories, setSuccessStories] = useState([]);
  const dispatch = useDispatch();

  const handleAddSuccessStory = () => {
    setSuccessStories([
      ...successStories,
      { title: "", views: 0, video_thumbnail_url: "" },
    ]);
  };

  const handleSuccessStoryChange = (index, field, value) => {
    const updatedStories = [...successStories];

    updatedStories[index] = {
      ...updatedStories[index],
      [field]: value,
    };

    setSuccessStories(updatedStories);
  };

  const handleDeleteSuccessStory = (index) => {
    setSuccessStories(successStories.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (departmentData) {
      setTitle(departmentData.title || "");
      setSubtitle(departmentData.subtitle || "");
      setDescription(departmentData.description || "");
      if (departmentData.thumbnail) {
        setImagePreviewUrl(departmentData.thumbnail);
      }
      if (Array.isArray(departmentData.success_stories)) {
        setSuccessStories(
          departmentData.success_stories?.map((story) => ({
            title: story.title || "",
            views: story.views || 0,
            video_thumbnail_url: story.video_thumbnail_url || "",
          }))
        );
      }
    }
  }, [departmentData]);

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const requestData = new FormData();
      requestData.append("title", title);
      requestData.append("subtitle", subtitle);
      requestData.append("description", description);
      if (uploadedImage) {
        requestData.append("thumbnail", uploadedImage);
      }

      const formattedSuccessStories = successStories?.map((story) => ({
        video_thumbnail_url: story.video_thumbnail_url,
        title: story.title,
        views: parseInt(story.views),
      }));

      requestData.append(
        "success_stories",
        JSON.stringify(formattedSuccessStories)
      );
      const response = await Instance.put(
        `/department/${departmentData._id}`,
        requestData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      dispatch(editDepartment(response.data));
      message.success("Department Updtaed successfully!");
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
    setSuccessStories([]);
    setUploadedImage(null);
  };

  return (
    <>
      {isLoading && <Loader />}
      <Modal
        visible={open}
        title={
          <span className="create-campaign-modal-title">Edit Department</span>
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

          <Form.Item label="Description">
            <ReactQuill
              theme="snow"
              modules={modules}

              value={description}
              onChange={setDescription}
              placeholder="Your text goes here"
              required
            />
             <span className="create-campaign-input-span">
              <span style={{ color: "red" }}>*</span> Description
            </span>
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
            >
              <p className="create-campaign-ant-upload-text">
                Drop files here or click to upload
              </p>
              <span className="create-campaign-ant-upload-drag-icon">
                <IoCloudUploadOutline />
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

          <Button
            onClick={handleAddSuccessStory}
            className="create-campaign-cancel-button"
            style={{ marginBottom: "20px" }}
          >
            Add Success Stories
          </Button>
          {successStories?.map((story, index) => (
            <div key={index}>
              <h5 className="specialist-heading-name">
                Success Story {index + 1}
              </h5>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Title">
                    <Input
                      value={story.title}
                      onChange={(e) =>
                        handleSuccessStoryChange(index, "title", e.target.value)
                      }
                      placeholder="Add Title"
                      required
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Views">
                    <Input
                      type="number"
                      value={story.views}
                      onChange={(e) =>
                        handleSuccessStoryChange(index, "views", e.target.value)
                      }
                      placeholder="Add Views"
                      required
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Thumbnail URL">
                <Input
                  value={story.video_thumbnail_url}
                  onChange={(e) =>
                    handleSuccessStoryChange(
                      index,
                      "video_thumbnail_url",
                      e.target.value
                    )
                  }
                  placeholder="Add Thumbnail URL"
                  required
                />
              </Form.Item>
              <Button
                icon={<RiDeleteBin5Line />}
                className="settings-delete-account"
                onClick={() => handleDeleteSuccessStory(index)}
                style={{ marginBottom: "20px" }}
              >
                Delete Success Story
              </Button>
            </div>
          ))}
        </Form>
      </Modal>
    </>
  );
};

export default EditDepartmentDetails;
