import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import "react-quill/dist/quill.snow.css";
import { showSuccessMessage } from "../../globalConstant";

const handleClick = () => {
  showSuccessMessage("", "");
};

const EditVideo = ({ open, handleCancel }) => {
  return (
    <Modal
      open={open}
      title={
        <span className="create-campaign-modal-title">Edit Video</span>
      }
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
        <Form.Item>
          <Input
            className="settings-input"
            placeholder="Enter Title"
            defaultValue=""
          />
          <span className="settings-input-span">Video Title</span>
        </Form.Item>
        <Form.Item>
          <Input
            className="settings-input"
            placeholder="Enter URL"
            defaultValue=""
          />
          <span className="settings-input-span">Video URL</span>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditVideo;

