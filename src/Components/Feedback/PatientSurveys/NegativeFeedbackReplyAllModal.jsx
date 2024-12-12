import { Button, Form, Input, Modal } from "antd";
import React from "react";
import ReactQuill from "react-quill";
import { showSuccessMessage } from "../../../globalConstant";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic"],
    ["link", "image"],
    ["clean"],
  ],
};
const handleClick = () => {
  showSuccessMessage("Sent Successfully", "Successfully sent to all");
};
const NegativeFeedbackReplyAllModal = ({ open, handleCancel }) => {
  return (
    <Modal
    title={<span className="create-campaign-modal-title">Reply All</span>}
      visible={open}
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
          Send
        </Button>,
      ]}
    >
      <div className="row">
        <div className="col-lg-12 mt-3">
          <Form.Item>
            <Input
              className="create-camapign-input"
              placeholder="Enter designation"
            />
            <span className="create-campaign-input-span">Designation</span>
          </Form.Item>
        </div>
        <div className="col-lg-12">
          <Form.Item>
            <ReactQuill
              theme="snow"
              modules={modules}
              placeholder="Your text goes here"
            />
            <span className="settings-input-span">Start Biography </span>
          </Form.Item>
        </div>
      </div>
    </Modal>
  );
};

export default NegativeFeedbackReplyAllModal;
