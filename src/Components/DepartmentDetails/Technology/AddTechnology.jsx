import React, { useState } from "react";
import { Button, Modal, Form, Input, message, Col, Row, Upload } from "antd";
import { Instance } from "../../../AxiosConfig";
import { useDispatch } from "react-redux";
import { showSuccessMessage } from "../../../globalConstant";
import Loader from "../../../Loader";
// import { addOutstationClinic } from "../../../../Features/OutstationClinicSlice";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";

const { TextArea } = Input;

const AddTechnology = ({ open, handleCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [clinicName, setClinicName] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState("");
  const [patients, setPatients] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [timing, setTiming] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();

  const handleUpload = (info) => {
    const file = info.file.originFileObj;
    setUploadedImage(file);
  };
  const handleDeleteImage = () => {
    setUploadedImage(null);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", clinicName);
      formData.append("location", address);
      formData.append("rating", parseFloat(rating));
      formData.append("reviews", parseInt(reviews, 10));
      formData.append("patients", parseInt(patients, 10));
      formData.append("experience", experience);
      formData.append("about", description);
      formData.append("timing", timing);

      if (uploadedImage) {
        formData.append("image", uploadedImage);
      }

      setIsLoading(true);
      const response = await Instance.post("/discover/clinic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.status === 200 || response?.status === 201) {
        handleCancel();
        showSuccessMessage("Outstation Clinic added successfully!");
        // dispatch(addOutstationClinic(response.data));
        setClinicName("");
        setRating("");
        setReviews("");
        setPatients("");
        setExperience("");
        setDescription("");
        setTiming("");
        setAddress("");
        setUploadedImage(null);
      }
    } catch (error) {
      console.error("Error while submitting: ", error?.response?.data || error);
      message.error("Failed to add outstation clinic. Please try again.");
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
            Add Outstation Clinic
          </span>
        }
        onCancel={handleCancel}
        width={680}
        footer={[
          <Button
            key="back"
            className="create-campaign-cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </Button>,
          <Button
            key="save"
            className="create-campaign-save-button"
            onClick={handleSave}
            loading={isLoading}
          >
            Save
          </Button>,
        ]}
      >
        <Form layout="vertical" className="mt-4">
          <Form.Item>
            <Input
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
              placeholder="Add Clinic Name"
              required
            />
            <span className="create-campaign-input-span">Clinic Name</span>
          </Form.Item>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <Input
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  placeholder="Enter Rating (e.g., 4.5)"
                  required
                />
                <span className="create-campaign-input-span">Rating</span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Input
                  value={reviews}
                  onChange={(e) => setReviews(e.target.value)}
                  placeholder="Enter Number of Reviews"
                  required
                />
                <span className="create-campaign-input-span">Reviews</span>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <Input
                  value={patients}
                  onChange={(e) => setPatients(e.target.value)}
                  placeholder="Enter Number of Patients"
                  required
                />
                <span className="create-campaign-input-span">Patients</span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Input
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Enter Experience (in years)"
                  required
                />
                <span className="create-campaign-input-span">Experience</span>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
            <span className="create-campaign-input-span">About</span>
          </Form.Item>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <Input
                  value={timing}
                  onChange={(e) => setTiming(e.target.value)}
                  placeholder="Enter Timing (e.g., Mon-Fri 9AM-5PM)"
                  required
                />
                <span className="create-campaign-input-span">Timing</span>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Address"
              required
            />
            <span className="create-campaign-input-span">Address</span>
          </Form.Item>
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
        </Form>
      </Modal>
    </>
  );
};

export default AddTechnology;
