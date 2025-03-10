import React, { useState, useRef, useEffect } from "react";
import { Form, Input, Row, Col, Button, Select, Checkbox, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Instance } from "../../AxiosConfig";
import { showSuccessMessage } from "../../globalConstant";
import user from "../../Assets/Images/singleuser.png";
import { editRoleAccess } from "../../Features/RoleAccessSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../Loader";

const EditRoleBased = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    categories: [],
  });
  const { id } = useParams();
  const [previewImage, setPreviewImage] = useState("");
  const [profileFile, setProfileFile] = useState(null);
  const [, setSelectedRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value) => {
    setFormData({ ...formData, role: value });
    setSelectedRole(value);
  };
  const handleCategoryChange = (checkedValues) => {
    setFormData({ ...formData, categories: checkedValues });
  };
  useEffect(() => {
    const fetchRoleAccessList = async () => {
      setIsLoading(true);
      try {
        const response = await Instance.get(`admin/getProfile/${id}`);
        const userData = response.data;
        console.log("roleaccessData", userData);

        setFormData({
          name: userData.name,
          email: userData.email,
          phone: userData.phoneNumber,
          password: "",
          role: userData.role,
          categories: userData.categories,
        });
        setPreviewImage(userData.profile || "");
      } catch (error) {
        console.error("Error fetching user roles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoleAccessList();
  }, [id]);

  const handleSubmit = async () => {
    if (!formData.name) {
      message.error("Full name is required");
      return;
    }
    if (!formData.phone) {
      message.error("Phone number is required");
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phoneNumber", formData.phone);
    formDataToSend.append("role", formData.role);
    formData.categories.forEach((category) => {
      formDataToSend.append("categories[]", category);
    });
    if (profileFile) formDataToSend.append("profile", profileFile);
    console.log(
      "Submitting Data:",
      Object.fromEntries(formDataToSend.entries())
    );
    setIsLoading(true);

    try {
      const response = await Instance.put(
        `/admin/profile/${id}`,
        formDataToSend
      );
      console.log(response);
      dispatch(editRoleAccess(response));
      showSuccessMessage("Edited Successfully");
      navigate("/role-based");
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
        categories: [],
      });
      setPreviewImage("");
      setProfileFile(null);
      setSelectedRole("");
    } catch (error) {
      console.error("Sign up failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      {isLoading && <Loader />}
      <div className="mt-4 campaign-performance-head">
        <h3>Edit Employee</h3>
      </div>
      <div className="mt-3 doctor-detail-page-head">
        <Form layout="vertical" onFinish={handleSubmit}>
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
              <Form.Item label="Full Name" required>
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
                  className="create-campaign-input disabled-email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  readOnly
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Phone Number" required>
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
          </Row>

          {formData?.role === "Editor" && (
            <>
              <h6>Access</h6>
              <div>
                <Checkbox.Group
                  onChange={handleCategoryChange}
                  className="checkbox-grid"
                  value={formData.categories}
                >
                  {" "}
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
              </div>
            </>
          )}
          {/* Buttons */}
          <div className="mt-5 d-flex justify-content-end gap-3">
            <Button
              className="create-campaign-cancel-button"
              onClick={() => navigate("/role-based")}
            >
              Cancel
            </Button>
            <Button
              className="create-campaign-save-button"
              type="submit"
              onClick={handleSubmit}
            >
              Update
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditRoleBased;
