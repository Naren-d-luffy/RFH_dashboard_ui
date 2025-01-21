import React, { useState } from "react";
import { Button, Form, Input, message, Modal } from "antd";
import { showSuccessMessage } from "../../../../globalConstant";
import TextArea from "antd/es/input/TextArea";
import { Instance } from "../../../../AxiosConfig";
import { addFaqs } from "../../../../Features/FaqsSlice";
import { useDispatch } from "react-redux";

const AddAskedQuestions = ({ open, handleCancel }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const dispatch = useDispatch();

  const handleSave = async () => {
    if (!question.trim() || !answer.trim()) {
      message.error("Please fill in all required fields.");
      return;
    }

    const faqsData = { question: question.trim(), answer: answer.trim() };

    try {
      const response = await Instance.post("/faq", faqsData);

      if ([200, 201, 204].includes(response.status)) {
        showSuccessMessage("FAQ created successfully!");
        dispatch(addFaqs(response.data.data));
        setQuestion("");
        setAnswer("");
        handleCancel();
      } else {
        message.error("Failed to create FAQ.");
      }
    } catch (error) {
      console.error("Error during FAQ creation:", error);
      if (error.response) {
        console.error("Backend error:", error.response.data);
      }
      message.error("Failed to create FAQ.");
    }
  };
  const handleCancelClick = () => {
    setQuestion("");
    setAnswer("");
    handleCancel();
  };
  return (
    <Modal
      open={open}
      title={<span className="create-campaign-modal-title">Frequently Asked Questions</span>}
      onCancel={handleCancelClick}
      width={680}
      footer={[
        <Button key="back" onClick={handleCancelClick} className="create-campaign-cancel-button">
          Cancel
        </Button>,
        <Button key="save" onClick={handleSave} className="create-campaign-save-button">
          Save
        </Button>,
      ]}
    >
      <Form layout="vertical" className="mt-2">
        <Form.Item label="Question" required>
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Add Question"
          />
        </Form.Item>
        <Form.Item label="Answer" required>
          <TextArea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Add Answer"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddAskedQuestions;
