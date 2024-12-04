import React, { useState, useRef } from "react";
import { Form, Input, Select } from "antd";
import DefaultUser from "../../Assets/Images/DefaultUser.png";
import "react-international-phone/style.css";
import { Option } from "antd/es/mentions";

export const General = () => {
  const [form] = Form.useForm();
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState("");
  const [profileImage, setProfileImage] = useState(null);

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

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="settings-personal-information">
      <div className="container">
        <h4 className="mt-4 mt-lg-0">General</h4>
        <p>Update your hospital persona</p>
        <hr />
        <Form layout="vertical" form={form}>
          <h5>Hospital Details</h5>
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
                <Input className="settings-input" placeholder="RFH Hospital" defaultValue="RFH Hospital" />
                <span className="settings-input-span">
                  Hospital/ Medical name
                </span>
              </Form.Item>
            </div>
            <div className="col-md-6 mt-4">
              <Form.Item>
                <Input className="settings-input" placeholder="Email ID" defaultValue="rumahsehat@gmail.go.id" />
                <span className="settings-input-span">Email Address</span>
              </Form.Item>
            </div>
          </div>
          <hr className="line-tag" />
          <h3 className="address-title">Address</h3>
          <div className="row">
            <div className="col-md-6 mt-4">
              <Form.Item>
                <Select
                  className="settings-input"
                  placeholder="Select a country"
                  dropdownClassName="settings-dropdown"
                  defaultValue="india"
                >
                  <Option value="usa">United States</Option>
                  <Option value="uk">United Kingdom</Option>
                  <Option value="india">India</Option>
                  <Option value="canada">Canada</Option>
                </Select>
                <span className="settings-input-span">Country</span>
              </Form.Item>
            </div>
            <div className="col-md-6 mt-4">
              <Form.Item>
                <Select
                  className="settings-input"
                  placeholder="Select a city"
                  dropdownClassName="settings-dropdown"
                  defaultValue="india"
                >
                  <Option value="usa">United States</Option>
                  <Option value="uk">United Kingdom</Option>
                  <Option value="india">India</Option>
                  <Option value="canada">Canada</Option>
                </Select>
                <span className="settings-input-span">City</span>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mt-2">
              <Form.Item>
                <Input className="settings-input" placeholder="Flat" defaultValue="MI 48329"/>
                <span className="settings-input-span">
                Flat/Unit
                </span>
              </Form.Item>
            </div>
            <div className="col-md-6 mt-2">
              <Form.Item>
                <Input className="settings-input" placeholder="Enter Street" defaultValue="Wall Court Waterford"/>
                <span className="settings-input-span">Street</span>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mt-2">
              <Form.Item>
                <Input className="settings-input" placeholder="Enter Number" defaultValue="123456789"/>
                <span className="settings-input-span">
                Number
                </span>
              </Form.Item>
            </div>
            <div className="col-md-6 mt-2">
              <Form.Item>
                <Input className="settings-input" placeholder="Postcode" defaultValue="545676"/>
                <span className="settings-input-span">Postcode</span>
              </Form.Item>
            </div>
          </div>
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
