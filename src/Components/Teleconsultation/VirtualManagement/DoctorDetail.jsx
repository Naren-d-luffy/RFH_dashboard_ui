import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Select,
  Button,
  Upload,
} from "antd";
import { IoCloudUploadOutline } from "react-icons/io5";
import moment from "moment"
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import { showSuccessMessage } from "../../../globalConstant";
import {Instance} from "../../../AxiosConfig"; // Replace with the correct import path for your axios instance

const { Option } = Select;

const DoctorDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const doctorData = location.state || null; // Get the doctor data from navigation state

  const [uploadedFile, setUploadedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    DOB: null,
    gender: "",
    email: "",
    phoneNumber: "",
    content: "",
    availableTime: "",
    patients: "",
    experienceYears: "",
    rating: "",
    status: "Active",
    aboutMe: "",
    location: "",
  });

  // Populate form data in edit mode
  useEffect(() => {
    if (doctorData) {
      setFormData({ ...doctorData });
      setUploadedFile(doctorData.image || null);
    }
  }, [doctorData]);

  const handleUpload = (info) => {
    const file = info.file.originFileObj;
    setUploadedFile(file);
  };

  const handleDeleteImage = () => {
    setUploadedFile(null);
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSave = async () => {
    const data = new FormData();
    data.append("image", uploadedFile);
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      if (doctorData) {
        // Edit Mode (PUT Request)
        const response = await Instance.put(`/doctor/${doctorData._id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Response:",response);
        
        showSuccessMessage("Doctor Details Updated Successfully", "");
      } else {
        // Create Mode (POST Request)
        const response = await Instance.post("/doctor", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Response:",response);
        showSuccessMessage("Doctor Details Added Successfully", "");
      }
      navigate("/teleconsultation/virtual-management");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="mt-4 campaign-performance-head">
        <h3>{doctorData ? "Edit Doctor Details" : "Add Doctor Details"}</h3>
      </div>
      <div className="mt-3 doctor-detail-page-head">
        <Form layout="vertical">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-campaign-input"
                  placeholder="Enter First Name"
                  value={formData.firstName || ""}
                  onChange={(e) => {
                    const firstName = e.target.value;
                    handleInputChange("firstName", firstName);
                    handleInputChange(
                      "name",
                      `Dr. ${firstName} ${formData.lastName || ""}`
                    );
                  }}
                />
                <span className="create-campaign-input-span">First Name</span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-campaign-input"
                  placeholder="Enter Last Name"
                  value={formData.lastName || ""}
                  onChange={(e) => {
                    const lastName = e.target.value;
                    handleInputChange("lastName", lastName);
                    handleInputChange(
                      "name",
                      `Dr. ${formData.firstName || ""} ${lastName}`
                    );
                  }}
                />
                <span className="create-campaign-input-span">Last Name</span>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-camapign-input"
                  placeholder="Enter Specialty"
                  value={formData.specialty || ""} 
                  onChange={(e) =>
                    handleInputChange("specialty", e.target.value)
                  }
                />
                <span className="create-campaign-input-span">Specialty</span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <DatePicker
                  className="add-events-datepicker"
                  placeholder="Select Date of Birth"
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY"
                  value={formData.DOB ? moment(formData.DOB, "DD/MM/YYYY") : null}
                  onChange={(date, dateString) =>
                    handleInputChange("DOB", dateString)
                  }
                />
                <span className="create-campaign-input-span">
                  Date of Birth
                </span>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <Select
                  className="create-camapign-input-select"
                  placeholder="Select Gender"
                  style={{ width: "100%" }}
                  value={formData.gender || undefined}
                  onChange={(value) => handleInputChange("gender", value)}
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
                <span className="create-campaign-input-span">Gender</span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-camapign-input"
                  placeholder="Enter Email ID"
                  value={formData.email || ""} 
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                <span className="create-campaign-input-span">Email</span>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-camapign-input"
                  placeholder="Enter Phone Number"
                  value={formData.phoneNumber || ""} 
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                />
                <span className="create-campaign-input-span">Phone Number</span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Input.TextArea
                  className="create-camapign-input"
                  placeholder="Write Description"
                  value={formData.content || ""} 
                  onChange={(e) => handleInputChange("content", e.target.value)}
                />
                <span className="create-campaign-input-span">Description</span>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-camapign-input"
                  placeholder="Enter Availability Time"
                  value={formData.availableTime || ""} 
                  onChange={(e) =>
                    handleInputChange("availableTime", e.target.value)
                  }
                />
                <span className="create-campaign-input-span">
                  Available Time
                </span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-camapign-input"
                  placeholder="Enter Number of Patients Treated"
                  value={formData.patients || ""} 
                  onChange={(e) =>
                    handleInputChange("patients", e.target.value)
                  }
                />
                <span className="create-campaign-input-span">
                  Patients Treated
                </span>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-camapign-input"
                  placeholder="Enter Years of Experience"
                  value={formData.experienceYears || ""} 
                  onChange={(e) =>
                    handleInputChange("experienceYears", e.target.value)
                  }
                />
                <span className="create-campaign-input-span">
                  Years of Experience
                </span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-camapign-input"
                  placeholder="Enter Doctor Rating"
                  value={formData.rating || ""} 
                  onChange={(e) => handleInputChange("rating", e.target.value)}
                />
                <span className="create-campaign-input-span">Rating</span>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <Input.TextArea
                  className="create-camapign-input"
                  placeholder="Enter About Me"
                  value={formData.aboutMe || ""} 
                  onChange={(e) => handleInputChange("aboutMe", e.target.value)}
                />
                <span className="create-campaign-input-span">About Me</span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-camapign-input"
                  placeholder="Enter Location"
                  value={formData.location || ""} 
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                />
                <span className="create-campaign-input-span">Location</span>
              </Form.Item>
            </Col>
          </Row>
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
                <IoCloudUploadOutline /> Upload Image
              </span>
            </Upload>
            {uploadedFile && (
              <div className="uploaded-image-preview d-flex gap-2">
                <img
                  src={
                    typeof uploadedFile === "string"
                      ? uploadedFile
                      : URL.createObjectURL(uploadedFile)
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
                  <RiDeleteBin5Line />
                </Button>
              </div>
            )}
          </Form.Item>
        </Form>
        <div className="mt-5 d-flex justify-content-end gap-3">
          <Button
            key="back"
            className="create-campaign-cancel-button"
            onClick={() => navigate("/teleconsultation/virtual-management")}
          >
            Cancel
          </Button>
          <Button
            key="save"
            className="create-campaign-save-button"
            onClick={handleSave}
          >
            {doctorData ? "Update" : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
