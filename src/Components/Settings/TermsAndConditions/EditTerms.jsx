import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import Loader from "../../../Loader";
import { Instance } from "../../../AxiosConfig";
import { showErrorMessage, showSuccessMessage } from "../../../globalConstant";

const EditTermsModal = ({ visible, onClose,clause }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (clause) {
      form.setFieldsValue({
        title: clause.title,
        content: clause.content,
      });
    }
  }, [clause, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        title: values.title,
        content: values.content, 
      };

      setIsLoading(true);
      const response = await Instance.put(`/terms/${clause._id}`, payload);
      console.log("responseeee", response);
      showSuccessMessage("Terms and conditions edited successfully!");
      onClose();
      form.resetFields();
    } catch (error) {
      showErrorMessage(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Modal
        visible={visible}
        title={<span className="create-campaign-modal-title">Edit Terms and Conditions</span>}
        onCancel={onClose}
        footer={[
          <Button key="back" onClick={onClose} className="create-campaign-cancel-button">
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

export default EditTermsModal;
