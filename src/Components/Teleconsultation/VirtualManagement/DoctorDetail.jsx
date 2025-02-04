import React, { useState, useEffect } from "react";
import { Form, Input, Row, Col, Button, Upload } from "antd";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import { showSuccessMessage } from "../../../globalConstant";
import { Instance } from "../../../AxiosConfig";
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
const DoctorDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const doctorData = location.state || null;

  const [uploadedFile, setUploadedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    qualifications: [],
    fellowships: [],
    awards: [],
    experience: "",
    contactDetails: "",
    about: "",
    AreasOfExpertise: [],
  });

  useEffect(() => {
    if (doctorData) {
      setFormData({ ...doctorData });
      setUploadedFile(doctorData.profile || null);
    }
  }, [doctorData]);

  const handleUpload = (info) => {
    const file = info.file.originFileObj;
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleDeleteImage = () => {
    setUploadedFile(null);
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleArrayInputChange = (field, value) => {
    const arrayValue = value.split(",").map((item) => item.trim());
    handleInputChange(field, arrayValue);
  };

  const handleSave = async () => {
    const data = new FormData();
    if (uploadedFile) {
      data.append("profile", uploadedFile);
    } else if (formData.profile && typeof formData.profile === "string") {
      data.append("profile", formData.profile);
    }
    
    Object.keys(formData).forEach((key) => {
      if (key !== "profile") { 
        if (Array.isArray(formData[key])) {
          data.append(key, JSON.stringify(formData[key])); // Convert arrays to JSON strings
        } else {
          data.append(key, formData[key]);
        }
      }
    });

    console.log("FormData being sent:");
    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }
    try {
      if (doctorData) {
        const response = await Instance.put(`/doctor/${doctorData._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Response:", response);
        showSuccessMessage("Doctor Details Updated Successfully", "");
      } else {
        const response = await Instance.post("/doctor", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Response:", response);
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
                  placeholder="Enter Full Name"
                  value={formData.name.replace(/^Dr\.\s*/, "") || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
                <span className="create-campaign-input-span">Full Name</span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-campaign-input"
                  placeholder="Enter Position"
                  value={formData.position || ""}
                  onChange={(e) =>
                    handleInputChange("position", e.target.value)
                  }
                />
                <span className="create-campaign-input-span">Position</span>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-campaign-input"
                  placeholder="Enter Department"
                  value={formData.department || ""}
                  onChange={(e) =>
                    handleInputChange("department", e.target.value)
                  }
                />
                <span className="create-campaign-input-span">Department</span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-campaign-input"
                  placeholder="Enter Qualifications (comma-separated)"
                  value={formData.qualifications?.join(", ") || ""}
                  onChange={(e) =>
                    handleArrayInputChange("qualifications", e.target.value)
                  }
                />
                <span className="create-campaign-input-span">
                  Qualifications
                </span>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-campaign-input"
                  placeholder="Enter Fellowships (comma-separated)"
                  value={formData.fellowships?.join(", ") || ""}
                  onChange={(e) =>
                    handleArrayInputChange("fellowships", e.target.value)
                  }
                />
                <span className="create-campaign-input-span">Fellowships</span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-campaign-input"
                  placeholder="Enter Awards (comma-separated)"
                  value={formData.awards?.join(", ") || ""}
                  onChange={(e) =>
                    handleArrayInputChange("awards", e.target.value)
                  }
                />
                <span className="create-campaign-input-span">Awards</span>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-campaign-input"
                  placeholder="Enter Experience"
                  value={formData.experience || ""}
                  onChange={(e) =>
                    handleInputChange("experience", e.target.value)
                  }
                />
                <span className="create-campaign-input-span">Experience</span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-campaign-input"
                  placeholder="Enter Contact Details"
                  value={formData.contactDetails || ""}
                  onChange={(e) =>
                    handleInputChange("contactDetails", e.target.value)
                  }
                />
                <span className="create-campaign-input-span">
                  Contact Details
                </span>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <div className="quill-editor">
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    placeholder="Enter About"
                    value={formData.about || ""}
                    onChange={(value) => handleInputChange("about", value)}
                    required
                  />
                </div>

                <span className="create-campaign-input-span">About</span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-campaign-input"
                  placeholder="Enter Areas of Expertise (comma-separated)"
                  value={formData.AreasOfExpertise?.join(", ") || ""}
                  onChange={(e) =>
                    handleArrayInputChange("AreasOfExpertise", e.target.value)
                  }
                />
                <span className="create-campaign-input-span">
                  Areas of Expertise
                </span>
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
                <IoCloudUploadOutline className="image-upload-icon" /> Upload
                Image
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
