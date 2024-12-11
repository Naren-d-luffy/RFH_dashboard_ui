import React,{useState} from "react";
import { Button, Modal, Form, Input, Row, Col, DatePicker } from "antd";
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

const handleClick=()=>{
  showSuccessMessage("Successfully Created", "");
}

const AddEventsGastroIllness = ({ open, handleCancel }) => {
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
    title={<span className="create-campaign-modal-title">Gastro Illness</span>}
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
                <RiDeleteBin5Line className="model-image-upload-delete-icon"/>
              </Button>
            </div>
          )}
      </Form.Item>

      <Form.Item>
        <Input className="create-camapign-input" defaultValue="Gastritis" />
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
                placeholder="21/11/2024"
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
              />
              <span className="create-campaign-input-span">Event Date</span>
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>

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
}
export default AddEventsGastroIllness;
