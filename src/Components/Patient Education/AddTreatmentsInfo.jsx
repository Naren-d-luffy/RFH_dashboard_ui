import React from "react";
import { Button, Modal, Form, Input, Row, Col, DatePicker } from "antd";
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

const AddTreatmentsInfo = ({ open, handleCancel }) => (
  <Modal
    open={open}
    title={<span className="create-campaign-modal-title">Treatments Info</span>}
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
    <Form.Item label="Upload Video">
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
        <Input className="create-camapign-input" defaultValue="Gastro" />
        <span className="create-campaign-input-span">Video Title</span>
      </Form.Item>
    </Form>
  </Modal>
);

export default AddTreatmentsInfo;

