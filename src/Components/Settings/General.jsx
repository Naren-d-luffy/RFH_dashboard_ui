import React, { useState } from "react";
import { Form, Input, Select, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import DefaultUser from "../../Assets/Images/DefaultUser.png";
import "react-international-phone/style.css";

const { Option } = Select;

export const General = () => {
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState(DefaultUser); 
  const [profileImage, setProfileImage] = useState(null); 


  const handleUploadChange = ({ file, fileList }) => {
    if (file.status === "done" && file.originFileObj) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); 
      };
      reader.readAsDataURL(file.originFileObj); 
    } else if (file.status === "removed") {
      setPreviewImage(DefaultUser); 
    }
    setProfileImage(file.originFileObj); 
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
                src={previewImage} 
                alt="Profile"
                className="settings-profile-image"
              />
              <ImgCrop rotationSlider>
                <Upload
                  showUploadList={false} 
                  customRequest={({ file, onSuccess }) => {
                    setTimeout(() => onSuccess("ok"), 0); 
                  }}
                  onChange={handleUploadChange}
                  accept="image/*"
                >
                  <button className="settings-edit-icon-button ms-3">Upload New</button>
                </Upload>
              </ImgCrop>

              <button type="button" className="settings-delete-button ms-3">
                Delete
              </button>
            </div>
          </div>

          {/* Form for hospital details */}
          <div className="row mt-4">
            <div className="col-md-6 mt-4">
              <Form.Item>
                <Input
                  className="settings-input"
                  placeholder="RFH Hospital"
                  defaultValue="RFH Hospital"
                />
                <span className="settings-input-span">Hospital/ Medical name</span>
              </Form.Item>
            </div>
            <div className="col-md-6 mt-4">
              <Form.Item>
                <Input
                  className="settings-input"
                  placeholder="Email ID"
                  defaultValue="rumahsehat@gmail.go.id"
                />
                <span className="settings-input-span">Email Address</span>
              </Form.Item>
            </div>
          </div>

          {/* Form for address details */}
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

          {/* Submit and cancel buttons */}
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
