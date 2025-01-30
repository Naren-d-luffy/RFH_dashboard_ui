import React, { useState, useRef } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Select,
  Checkbox,
} from "antd";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Instance } from "../../AxiosConfig";
import { showSuccessMessage } from "../../globalConstant";

const RoleBasedList = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    categories: [],
  });

  const [previewImage, setPreviewImage] = useState("");
  const [profileFile, setProfileFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value) => {
    setFormData({ ...formData, role: value }); // Update formData with the role
    setSelectedRole(value); // Update selectedRole state (important for conditional rendering)
  };
  const handleCategoryChange = (checkedValues) => {
    setFormData({ ...formData, categories: checkedValues });
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phoneNumber", formData.phone);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("role", formData.role);
    formDataToSend.append("categories", JSON.stringify(formData.categories));
    if (profileFile) formDataToSend.append("profile", profileFile);
    console.log(
      "Submitting Data:",
      Object.fromEntries(formDataToSend.entries())
    );
    try {
      const response = await Instance.post("/admin/signup", formDataToSend );
      console.log(response);
      showSuccessMessage("Account created Successfully");
      
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  };

  return (
    <div className="container">
      <div className="mt-4 campaign-performance-head">
        <h3>Add Employee</h3>
      </div>
      <div className="mt-3 doctor-detail-page-head">
        <Form layout="vertical" onFinish={handleSubmit}>
          {/* Profile Upload */}
          <div className="row mt-4">
            <div className="settings-profile-icon-section">
              <img
                src={previewImage || "default-avatar.png"}
                alt="Profile"
                className="settings-profile-image"
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
              />
              <button
                type="button"
                className="settings-edit-icon-button ms-3"
                onClick={handleEditClick}
              >
                Upload
              </button>
            </div>
          </div>

          {/* Employee Details */}
          <Row gutter={24} className="mt-4">
            <Col span={12}>
              <Form.Item label="Full Name">
                <Input
                  name="name"
                  className="create-campaign-input"
                  placeholder="Enter Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email">
                <Input
                  name="email"
                  className="create-campaign-input"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Phone Number">
                <Input
                  name="phone"
                  className="create-campaign-input"
                  placeholder="Enter Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Password">
                <div className="password-input">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="signin-input"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    className="password-toggle"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FiEye /> : <FiEyeOff />}
                  </button>
                </div>
              </Form.Item>
            </Col>
          </Row>

          {/* Role & Status */}
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Role">
                <Select
                  placeholder="Select Role"
                  value={formData.role || undefined}
                  onChange={handleRoleChange}
                >
                  <Select.Option value="Admin">Admin</Select.Option>
                  <Select.Option value="Editor">Editor</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            {/* <Col span={12}>
              <Form.Item label="Status">
                <Select
                  placeholder="Select Status"
                  value={formData.status || undefined}
                  onChange={handleStatusChange}
                >
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="inactive">Inactive</Select.Option>
                </Select>
              </Form.Item>
            </Col> */}
          </Row>
          {selectedRole === "Editor" && (
            <>
              <h6>Access</h6>
              <div >
                <Checkbox.Group onChange={handleCategoryChange} className="checkbox-grid">
                  {" "}
                  {/* Use Checkbox.Group */}
                  <Checkbox value="Marketing">Marketing</Checkbox>
                  <Checkbox value="Recommended">Recommended</Checkbox>
                  <Checkbox value="Department">Department</Checkbox>
                  <Checkbox value="Education">Education</Checkbox>
                  <Checkbox value="Teleconsultation">Teleconsultation</Checkbox>
                  <Checkbox value="News">News</Checkbox>
                  <Checkbox value="Terms">Terms</Checkbox>
                  <Checkbox value="About Hospital">About Hospital</Checkbox>
                </Checkbox.Group>
              </div>
            </>
          )}
          {/* Buttons */}
          <div className="mt-5 d-flex justify-content-end gap-3">
            <Button
              className="create-campaign-cancel-button"
              onClick={() => navigate("/teleconsultation/virtual-management")}
            >
              Cancel
            </Button>
            <Button
              className="create-campaign-save-button"
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RoleBasedList;
