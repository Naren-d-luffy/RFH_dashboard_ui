import React from "react";
import { Button, Modal, Form, Input, Row, Col } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Upload } from "antd";
import { IoCloudUploadOutline } from "react-icons/io5";
import {showSuccessMessage} from "../../../globalConstant" 


const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic"],
    ["link", "image"],
    ["clean"],
  ],
};
const handleSuccessDelete=()=>{
  showSuccessMessage("Successfully Created Campaign", "");
}

const CreateCampaign = ({ open, handleCancel }) => (
  
  <Modal
    open={open}
    title={<span className="create-campaign-modal-title">Create Campaign</span>}
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
        onClick={handleSuccessDelete}
        className="create-campaign-save-button"
      >
        Save
      </Button>,
    ]}
  >
    <Form layout="vertical" className="mt-4">
      <Form.Item label="Brand logo">
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
        <Input className="create-camapign-input" placeholder="RFH Welcome" />
        <span className="create-campaign-input-span">Campaign Title</span>
      </Form.Item>

      <Form.Item label="Campaign Description">
        <ReactQuill
          theme="snow"
          modules={modules}
          placeholder="Your text goes here"
        />
      </Form.Item>
      <Row gutter={24}>
        <Col span={7}>
          <Form.Item>
            <Button block className="create-camapign-add-button">
              + Add Button
            </Button>
          </Form.Item>
        </Col>

        <Col span={7}>
          <Form.Item>
            <Input className="create-camapign-input" placeholder="Click Here" />
            <span className="create-campaign-input-span">Button Name</span>
          </Form.Item>
        </Col>

        <Col span={10}>
          <Form.Item>
            <Form.Item>
              <Input
                className="create-camapign-input"
                placeholder="https://www.rfhhospitalcampaign.com/"
              />
              <span className="create-campaign-input-span">Link</span>
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </Modal>
);

export default CreateCampaign;
