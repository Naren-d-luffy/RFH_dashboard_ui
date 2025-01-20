import React, { useState } from "react";
import { Button, Modal, Form, Input, message, Row, Col, Upload } from "antd";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Instance } from "../../AxiosConfig";
import { IoCloudUploadOutline } from "react-icons/io5";
import Loader from "../../Loader";
import { addDepartment } from "../../Features/DepartmentSlice";
import { showSuccessMessage } from "../../globalConstant";

const { TextArea } = Input;
const CreateDepartmentDetails = ({ open, handleCancel }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successStories, setSuccessStories] = useState([]);
  const dispatch = useDispatch();

  const handleAddSuccessStory = () => {
    setSuccessStories([
      ...successStories,
      {
        title: "",
        views: 0,
        video_thumbnail_url: ""
      }
    ]);
  };
  const resetForm = () => {
    setUploadedImage(null);
    setTitle("");
    setSubtitle("");
    setDescription("");
   
    setSuccessStories([]);
  };

  const handleSuccessStoryChange = (index, field, value) => {
    const updatedStories = [...successStories];
    updatedStories[index][field] = value;
    setSuccessStories(updatedStories);
  };

  const handleDeleteSuccessStory = (index) => {
    setSuccessStories(successStories.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const requestData = new FormData();
      requestData.append("title", title);
      requestData.append("subtitle", subtitle);
      requestData.append("description", description);
      if (uploadedImage) {
        requestData.append("thumbnail", uploadedImage);
      }

      const formattedSuccessStories = successStories.map(story => ({
        video_thumbnail_url: story.video_thumbnail_url,
        title: story.title,
        views: parseInt(story.views)
      }));
  
      requestData.append("success_stories", JSON.stringify(formattedSuccessStories));
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
        status: error.response?.status
      });
      message.error("Failed to create department.");
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
          <span className="create-campaign-modal-title">Create Department</span>
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
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add Title"
              required
            />
          </Form.Item>
          <Form.Item label="Subtitle">
            <Input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Add Subtitle"
              required
            />
          </Form.Item>
          <Form.Item label="Description">
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add Description"
              required
            />
          </Form.Item>
          <Form.Item label="Thumbnail">
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
                <IoCloudUploadOutline />
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
          </Form.Item>
         
          <Button
            onClick={handleAddSuccessStory}
            className="create-campaign-cancel-button"
            style={{ marginBottom: "20px" }}
          >
            Add Success Stories
          </Button>
          {successStories.map((story, index) => (
            <div key={index}>
              <h5>Success Story {index + 1}</h5>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Title">
                    <Input
                      value={story.title}
                      onChange={(e) =>
                        handleSuccessStoryChange(index, "title", e.target.value)
                      }
                      placeholder="Add Title"
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

export default CreateDepartmentDetails;
