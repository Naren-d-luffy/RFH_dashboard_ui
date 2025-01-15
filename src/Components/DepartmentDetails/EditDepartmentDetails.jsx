import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, message, Row, Col, Upload } from "antd";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { showSuccessMessage } from "../../globalConstant";
import { Instance } from "../../AxiosConfig";
import { editDepartment } from "../../Features/DepartmentSlice";
import { IoCloudUploadOutline } from "react-icons/io5";
import Loader from "../../Loader";

const { TextArea } = Input;

const EditDepartmentDetails = ({ open, handleCancel, departmentData }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [specialistDesignation, setSpecialistDesignation] = useState("");
  const [specialistLocation, setSpecialistLocation] = useState("");
  const [photo_url, setPhoto_url] = useState("");
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
      setSpecialist(departmentData.specialistName || "");
      setSpecialistDesignation(departmentData.specialistDesignation || "");
      setSpecialistLocation(departmentData.specialistLocation || "");
      setPhoto_url(departmentData.photo_url || "");

      if (Array.isArray(departmentData.success_stories)) {
        setSuccessStories(
          departmentData.success_stories.map((story) => ({
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
    if (!title || !subtitle || !description) {
      message.error("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    const updatedDepartmentData = {
      _id: departmentData?._id,
      title,
      subtitle,
      description,
      specialist,
      specialistDesignation,
      specialistLocation,
      photo_url,

      success_stories: successStories.map((story) => ({
        ...story,
        views: Number(story.views) || 0,
      })),
    };

    try {
      const response = await Instance.put(
        `/department/${updatedDepartmentData._id}`,
        updatedDepartmentData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if ([200, 201, 204].includes(response.status)) {
        showSuccessMessage("Department updated successfully!");
        dispatch(editDepartment(updatedDepartmentData));
        resetForm();
        handleCancel();
      } else {
        message.error("Failed to update department.");
      }
    } catch (error) {
      console.error("Error during department update:", error);
      message.error("Failed to update department.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setDescription("");
    setSpecialist("");
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

          <h5 className="specialist-heading-name">Specialist Details</h5>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Name">
                <Input
                  value={specialist}
                  onChange={(e) => setSpecialist(e.target.value)}
                  placeholder="Add Name"
                  required
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Designation">
                <Input
                  value={specialistDesignation}
                  onChange={(e) => setSpecialistDesignation(e.target.value)}
                  placeholder="Add Designation"
                  required
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Location">
                <Input
                  value={specialistLocation}
                  onChange={(e) => setSpecialistLocation(e.target.value)}
                  placeholder="Add Location"
                  required
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Photo URL">
            <Upload
              listType="picture"
              showUploadList={false}
              beforeUpload={(file) => {
                setUploadedImage(file);
                setPhoto_url(URL.createObjectURL(file));
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
            {photo_url && (
              <div className="uploaded-image-preview d-flex gap-2">
                <img
                  src={photo_url}
                  alt="Uploaded"
                  style={{
                    width: "200px",
                    height: "auto",
                    marginTop: "10px",
                    borderRadius: "5px",
                  }}
                />
                <Button
                  onClick={() => {
                    setPhoto_url("");
                    setUploadedImage(null);
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
