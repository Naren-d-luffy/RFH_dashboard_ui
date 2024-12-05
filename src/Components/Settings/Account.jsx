import React, { useState, useRef } from "react";
import { Form, Input, DatePicker } from "antd";
import DefaultUser from "../../Assets/Images/DefaultUser.png";
import "react-international-phone/style.css";
import { FiEyeOff } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa6";
import {showLogoutMessage} from "../../globalConstant"


export const Account = () => {
  const [form] = Form.useForm();
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState("");
  const [, setProfileImage] = useState(null);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    showLogoutMessage({ message: "" });
  };
  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="settings-personal-information">
      <div className="container">
        <h4 className="mt-4 mt-lg-0">Account</h4>
        <p>Settings you details account here</p>
        <hr />
        <Form layout="vertical" form={form}>
          <h5>My Profile</h5>
          <div className="row mt-4">
            <div className="settings-profile-icon-section">
              <img
                src={previewImage ? previewImage : DefaultUser}
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
                Upload new
              </button>
              <button type="button" className="settings-delete-button ms-3">
                Delete
              </button>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6 mt-4">
              <Form.Item>
                <Input
                  className="settings-input"
                  placeholder="Enter Fisrt Name"
                  defaultValue="Alexandro"
                />
                <span className="settings-input-span">First Name</span>
              </Form.Item>
            </div>
            <div className="col-md-6 mt-4">
              <Form.Item>
                <Input
                  className="settings-input"
                  placeholder="Enter Last Name"
                  defaultValue="Bernard"
                />
                <span className="settings-input-span">Last Name</span>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mt-2">
              <Form.Item>
                <Input
                  className="settings-input"
                  placeholder="Enter Phone Number"
                  defaultValue="123456789"
                />
                <span className="settings-input-span">Phone Number</span>
              </Form.Item>
            </div>
            <div className="col-md-6 mt-2">
              <Form.Item>
                <Input
                  className="settings-input"
                  placeholder="Email ID"
                  defaultValue="Alexandrobern@mail.com"
                />
                <span className="settings-input-span">Email Address</span>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mt-2">
              <Form.Item>
                <DatePicker
                  className="settings-input w-100"
                  placeholder="Enter DOB"
                  format="DD-MM-YYYY"
                />
                <span className="settings-input-span">Birth Date</span>
              </Form.Item>
            </div>
            <div className="col-md-6 mt-2">
              <Form.Item>
                <Input
                  type={passwordVisible ? "text" : "password"}
                  className="settings-input"
                  placeholder="*******"
                  defaultValue="458767"
                  suffix={
                    passwordVisible ? (
                      <FaRegEye
                        onClick={() => setPasswordVisible(false)}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <FiEyeOff
                        onClick={() => setPasswordVisible(true)}
                        style={{ cursor: "pointer" }}
                      />
                    )
                  }
                />
                <span className="settings-input-span">Password</span>
              </Form.Item>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-6 mt-4 theme-select-option">
              <p>Delete account</p>
              <h6>
                When you delete your account, you lose access to Front account
                services, and we permanently delete your personal data. You can
                cancel the deletion for 14 days.
              </h6>
            </div>
            <div className="col-lg-6 mt-4">
              <div className="d-flex gap-2">
                <button className="settings-delete-account" type="button" onClick={handleDelete}>
                  Delete Account
                </button>
                <button className="settings-learn-button" type="submit">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="row mt-4">
            <div className="d-flex justify-content-end gap-2">
              <button className="settings-delete-button" type="button">
                Cancel
              </button>
              <button className="settings-edit-icon-button" type="submit">
                Save
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
