import React,{useState} from "react";
import { Button, Modal, Form, Input, Row, Col } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Upload } from "antd";
import { IoCloudUploadOutline } from "react-icons/io5";

import {showSuccessMessage} from "../../../globalConstant" 
import { RiDeleteBin5Line } from "react-icons/ri";


const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic"],
    ["link", "image"],
    ["clean"],
  ],
};
const handleSuccessDelete = () => {
  showSuccessMessage("Successfully Created Campaign", "");
};


const CreateCampaign = ({ open, handleCancel }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const handleUpload = (info) => {
    const file = info.file.originFileObj;
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = () => {
    setUploadedImage(null);
  };
  return(

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
      <Upload
            listType="picture"
            showUploadList={false}
            onChange={handleUpload}
            className="create-campaign-upload"
          >
            <p className="create-campaign-ant-upload-text">
              Drop files here or click to upload
            </p>
            <span className="create-campaign-ant-upload-drag-icon">
              <IoCloudUploadOutline />{" "}
              <span style={{ color: "#727880" }}>Upload Image</span>
            </span>
          </Upload>
          {uploadedImage && (
            <div className="uploaded-image-preview d-flex gap-2">
              <img
                src={uploadedImage}
                alt="Uploaded"
                style={{
                  width: "200px",
                  height: "auto",
                  marginTop: "10px",
                  borderRadius: "5px",
                }}
              />
              <Button
                onClick={handleDeleteImage}
                style={{
                  marginTop: "10px",
                  backgroundColor: "#e6f2ed",
                  borderRadius:"50%",
                  fontSize:"16px",
                  padding:"4px 12px"
                }}
              >
                <RiDeleteBin5Line />
              </Button>
            </div>
          )}
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
)
}

export default CreateCampaign;
