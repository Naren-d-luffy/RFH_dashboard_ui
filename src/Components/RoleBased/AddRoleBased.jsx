import React, { useState, useRef } from "react";
import { Form, Input, Row, Col, Button, Select, Checkbox, message } from "antd";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Instance } from "../../AxiosConfig";
import { showSuccessMessage } from "../../globalConstant";
import user from "../../Assets/Images/singleuser.png";
import { addRoleAccess } from "../../Features/RoleAccessSlice";
import { useDispatch } from "react-redux";
import Loader from "../../Loader";

const AddRoleBased = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [profileFile, setProfileFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        message.error("Only JPG, JPEG, and PNG files are allowed!");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        message.error("File size must be less than 2MB!");
        return;
      }
      setProfileFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleEditClick = () => fileInputRef.current.click();
  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("name", values.name);
    formDataToSend.append("email", values.email);
    formDataToSend.append("phoneNumber", values.phone);
    formDataToSend.append("password", values.password);
    formDataToSend.append("role", values.role);
    formDataToSend.append("categories", JSON.stringify(values.categories || []));
    if (profileFile) formDataToSend.append("profile", profileFile);

    try {
      const response = await Instance.post("/admin/signup", formDataToSend);
      dispatch(addRoleAccess(response));
      showSuccessMessage("Account created successfully");
      navigate("/role-based");
      form.resetFields();
      setPreviewImage("");
      setProfileFile(null);
      setSelectedRole("");
    } catch (error) {
      console.error("Sign up failed:", error);
      message.error("Sign-up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      {isLoading && <Loader />}
      <div className="mt-4 campaign-performance-head">
        <h3>Add Employee</h3>
      </div>
      <div className="mt-3 doctor-detail-page-head">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="row mt-4">
            <div className="settings-profile-icon-section">
              <img
                src={previewImage || user}
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

          <Row gutter={24} className="mt-4">
            <Col span={12}>
              <Form.Item
                label="Full Name"
                name="name"
                rules={[
                  { required: true, message: "Full Name is required" },
                  { min: 3, message: "Full Name must be at least 3 characters" },
                ]}
              >
                <Input placeholder="Enter Full Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Invalid email format" },
                ]}
              >
                <Input placeholder="Enter Email" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[
                  { required: true, message: "Phone Number is required" },
                  { pattern: /^\d{10}$/, message: "Must be a 10-digit number" },
                ]}
              >
                <Input placeholder="Enter Phone Number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Password is required" },
                  { min: 3, message: "Password must be at least 3 characters" },
                ]}
              >
                <div className="password-input">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
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

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Role"
                name="role"
              >
                <Select placeholder="Select Role" onChange={handleRoleChange}>
                  <Select.Option value="Admin">Admin</Select.Option>
                  <Select.Option value="Editor">Editor</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {selectedRole === "Editor" && (
            <>
              <h6>Access</h6>
              <Form.Item name="categories">
                <Checkbox.Group className="checkbox-grid">
                <Checkbox value="Marketing">Marketing</Checkbox>
                  <Checkbox value="Recommended">Recommended</Checkbox>
                  <Checkbox value="Department">Department</Checkbox>
                  <Checkbox value="Education">Education</Checkbox>
                  <Checkbox value="Teleconsultation">Teleconsultation</Checkbox>
                  <Checkbox value="News">News</Checkbox>
                  <Checkbox value="Terms">Terms</Checkbox>
                  <Checkbox value="AboutHospital">About Hospital</Checkbox>
                  <Checkbox value="Configuration">Configuration</Checkbox>
                  <Checkbox value="RoleBasedAccess">Role Based Access</Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </>
          )}

          <div className="mt-5 d-flex justify-content-end gap-3">
            <Button   className="create-campaign-cancel-button" onClick={() => navigate("/role-based")}>Cancel</Button>
            <Button  className="create-campaign-save-button" type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddRoleBased;
