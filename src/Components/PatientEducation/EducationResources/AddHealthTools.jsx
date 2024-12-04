import React from "react";
import { Button, Modal, Form, Input, Row, Col, DatePicker, Select } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Upload } from "antd";
import { IoCloudUploadOutline } from "react-icons/io5";
import {showSuccessMessage} from "../../../globalConstant"


const { Option } = Select;

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic"],
    ["link", "image"],
    ["clean"],
  ],
};
const handleClick=()=>{
  showSuccessMessage("Successfully Created", "");
}

const AddHealthTools = ({ open, handleCancel }) => (
  <Modal
    open={open}
    title={<span className="create-campaign-modal-title">Health Tools</span>}
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
        onClick={handleClick}
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
          className="create-camapign-input"
          defaultValue="Symptoms Checker"
        />
        <span className="create-campaign-input-span">Event Title</span>
      </Form.Item>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              className="create-camapign-input"
              defaultValue="Gastroscience Department"
            />
            <span className="create-campaign-input-span">Department</span>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item>
            <Form.Item>
              <DatePicker
                className="add-events-datepicker"
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
                placeholder="25/11/2024"
              />
              <span className="create-campaign-input-span">Event Date</span>
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              className="create-camapign-input"
              defaultValue="Enter full name"
            />
            <span className="create-campaign-input-span">Your name</span>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item>
            <Input
              className="create-camapign-input"
              defaultValue="+91 8989898987"
            />
            <span className="create-campaign-input-span">Phone number</span>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              className="create-camapign-input"
              defaultValue="Enter Email Address"
            />
            <span className="create-campaign-input-span">Email</span>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item>
            <Form.Item>
              <DatePicker
                className="add-events-datepicker"
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
                placeholder="Enter your Age"
              />
              <span className="create-campaign-input-span">Age Group</span>
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Select
          className="create-camapign-input-select"
          defaultValue="Select"
          style={{ width: "100%" }}
          dropdownClassName="create-campaign-dropdown"
        >
          <Option value="Low">Low</Option>
          <Option value="Medium">Medium</Option>
          <Option value="High">High</Option>
        </Select>
        <span className="create-campaign-input-span">Acidity Level</span>
      </Form.Item>

      <Form.Item>
        <ReactQuill
          theme="snow"
          modules={modules}
          placeholder="Write text here"
        />
        <span className="create-campaign-input-span">Campaign Description</span>
      </Form.Item>
    </Form>
  </Modal>
);

export default AddHealthTools;
