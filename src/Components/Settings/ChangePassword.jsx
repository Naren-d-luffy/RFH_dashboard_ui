import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { showErrorMessage, showSuccessMessage } from "../../globalConstant";
import { Instance } from "../../AxiosConfig"; // Ensure Instance is imported for API calls

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      };

      await Instance.post("/admin/change-password", payload);
      showSuccessMessage("Password updated successfully!");

      form.resetFields();
    } catch (error) {
      console.error("Failed to update password:", error);
      showErrorMessage(error.response?.data?.error || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="settings-personal-information">
      <div className="container">
        <h4 className="mt-4 mt-lg-0">Update Password</h4>
        <hr style={{ color: "var(--black-color)" }} />
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <div className="row mt-4">
            <div className="col-md-6 mt-4">
              <Form.Item
                name="currentPassword"
                label="Current Password"
                rules={[{ required: true, message: "Current password is required" }]}
              >
                <Input.Password className="settings-input" placeholder="Enter Current Password" />
              </Form.Item>
            </div>
            <div className="col-md-6 mt-4">
              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[{ required: true, message: "New password is required" }]}
              >
                <Input.Password className="settings-input" placeholder="Enter New Password" />
              </Form.Item>
            </div>
          </div>

          <div className="row mt-4">
            <div className="d-flex justify-content-end gap-2">
              <Button className="status-role-button" htmlType="submit" loading={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
