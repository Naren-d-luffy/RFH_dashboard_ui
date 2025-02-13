import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import Loader from "../../../Loader";
import { Instance } from "../../../AxiosConfig";
import { showErrorMessage, showSuccessMessage } from "../../../globalConstant";
import { useDispatch } from "react-redux";
import { addTerm } from "../../../Features/TermsSlice";
const AddTermsModal = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
    const dispatch=useDispatch();
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        title: values.title,
        content: values.content,
      };

      setIsLoading(true);
      const response = await Instance.post("/terms", payload);
      showSuccessMessage("Terms and conditions added successfully!");
      dispatch(addTerm(response.data))
      onClose();
      form.resetFields();
    } catch (error) {
      console.error("Failed to add terms and conditions:", error);
      showErrorMessage(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  const handleClose = () => {
    form.resetFields(); 
    onClose();
  };
  return (
    <>
      {isLoading && <Loader />}
      <Modal
        visible={visible}
        title={<span className="create-campaign-modal-title">Add Terms and Conditions</span>}
        onCancel={handleClose}
        footer={[
          <Button key="back" onClick={handleClose} className="create-campaign-cancel-button">
            Cancel
          </Button>,
          <Button
            key="save"
            onClick={handleSubmit}
            className="create-campaign-save-button"
            loading={isLoading}
          >
            Save
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Clause Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input placeholder="Clause Title" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Clause Content"
            rules={[{ required: true, message: "Please enter content" }]}
          >
            <Input.TextArea placeholder="Clause Content" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddTermsModal;
