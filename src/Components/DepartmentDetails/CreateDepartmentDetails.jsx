import React, { useState } from "react";
import { Button, Modal, Form, Input, message, Row, Col, Upload } from "antd";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { showSuccessMessage } from "../../globalConstant";
// import { IoCloudUploadOutline } from "react-icons/io5";
import { Instance } from "../../AxiosConfig";
import { addDepartment } from "../../Features/DepartmentSlice";

const { TextArea } = Input;

const CreateDepartmentDetails = ({ open, handleCancel }) => {
  const [, setUploadedImage] = useState(null);
  const [, setUploadedThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState({
    name: "",
    designation: "",
    location: "",
    photo_url: "",
  });
  const [success_stories, setSuccessStories] = useState([]);
  const dispatch = useDispatch();

  const handleAddSuccessStory = () => {
    setSuccessStories([
      ...success_stories,
      { title: "", views: 0, video_thumbnail_url: "" },
    ]);
  };

  const handleSuccessStoryChange = (index, field, value) => {
    const updatedStories = [...success_stories];
    updatedStories[index][field] = value;
    setSuccessStories(updatedStories);
  };

  const handleDeleteSuccessStory = (index) => {
    setSuccessStories(success_stories.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!title || !subtitle || !description) {
      message.error("Please fill in all required fields.");
      return;
    }

    const departmentData = {
      title,
      subtitle,
      description,
      specialist,
      success_stories: success_stories.map((story) => ({
        ...story,
        views: Number(story.views), 
      })),
    };
    try {
      const response = await Instance.post("/department", departmentData);

      if (response.status === 200 || response.status === 201 || response.status === 204) {
        showSuccessMessage("Department created successfully!");
        dispatch(addDepartment(departmentData));
        setTitle("");
        setSubtitle("");
        setDescription("");
        setSpecialist({
          name: "",
          designation: "",
          location: "",
          photo_url: "",
        });
        setSuccessStories([]);
        setUploadedImage(null);
        setUploadedThumbnail(null);
        handleCancel();
      } else {
        message.error("Failed to create department.");
      }
    } catch (error) {
      console.error("Error during department creation:", error);
      if (error.response) {
        console.error("Backend error:", error.response.data);
      }
      message.error("Failed to create department.");
    }
  };

  return (
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

        <h5 className="specialist-heading-name">Specialist Details</h5>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Name">
              <Input
                value={specialist.name}
                onChange={(e) =>
                  setSpecialist({ ...specialist, name: e.target.value })
                }
                placeholder="Add Name"
                required
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Designation">
              <Input
                value={specialist.designation}
                onChange={(e) =>
                  setSpecialist({ ...specialist, designation: e.target.value })
                }
                placeholder="Add Designation"
                required
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Location">
              <Input
                value={specialist.location}
                onChange={(e) =>
                  setSpecialist({ ...specialist, location: e.target.value })
                }
                placeholder="Add Location"
                required
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Photo URL">
          <Input
            value={specialist.photo_url}
            onChange={(e) =>
              setSpecialist({ ...specialist, photo_url: e.target.value })
            }
            placeholder="Add image URL"
            required
          />
        </Form.Item>
        <Button
          onClick={handleAddSuccessStory}
          className="create-campaign-cancel-button"
          style={{ marginBottom: "20px" }}
        >
          Add Success Stories
        </Button>
        {success_stories.map((story, index) => (
          <div key={index}>
            <h5 className="specialist-heading-name">Success Story {index + 1}</h5>
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
  );
};

export default CreateDepartmentDetails;
