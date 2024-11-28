import React from "react";
import { Button, Modal, Form, Input, DatePicker, Col } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Upload } from "antd";
import { IoCloudUploadOutline } from "react-icons/io5";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic"],
    ["link", "image"],
    ["clean"],
  ],
};

const UpcomingEvents = ({ open, handleCancel }) => (
  <Modal
    open={open}
    title={<span className="create-campaign-modal-title">Upcoming Events</span>}
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
        onClick={handleCancel}
        className="create-campaign-save-button"
      >
        Save
      </Button>,
    ]}
  >
    <Form layout="vertical" className="mt-4">
      <Form.Item label="Upload image">
        <Upload listType="picture" className="create-campaign-upload">
          <p className="create-campaign-ant-upload-text">
            Drop files here or click to upload
          </p>
          <span className="create-campaign-ant-upload-drag-icon">
            <IoCloudUploadOutline />{" "}
            <span style={{ color: "#727880" }}>Upload Image</span>
          </span>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Input
          className="settings-input"
          placeholder="Medicines"
          defaultValue="Medicines"
        />
        <span className="settings-input-span">Event Title</span>
      </Form.Item>
      <div className="row">
        <div className="col-md-6 mt-2">
          <Form.Item>
            <Input
              className="settings-input"
              placeholder="Department"
              defaultValue="Gastroscience Department"
            />
            <span className="settings-input-span">Department</span>
          </Form.Item>
        </div>
        <div className="col-md-6 mt-2">
          <Form.Item>
            <DatePicker
              className="settings-input w-100"
              placeholder="Select Date"
              format="DD-MM-YYYY"
            />
            <span className="settings-input-span">Event Date</span>
          </Form.Item>
        </div>
      </div>
      <Form.Item>
        <ReactQuill
          theme="snow"
          modules={modules}
          placeholder="Your text goes here"
        />
        <span className="settings-input-span">Event Description </span>
      </Form.Item>
    </Form>
  </Modal>
);

export default UpcomingEvents;
