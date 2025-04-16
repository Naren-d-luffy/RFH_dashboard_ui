import React, { useState } from "react";
import { Button, Form, Input, message, Modal } from "antd";
import { showSuccessMessage } from "../../../../globalConstant";
import TextArea from "antd/es/input/TextArea";
import { Instance } from "../../../../AxiosConfig";
import { addFaqs } from "../../../../Features/FaqsSlice";
import { useDispatch } from "react-redux";
import { FiMaximize2, FiMinimize2, FiX } from "react-icons/fi";

const AddAskedQuestions = ({ open, handleCancel }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const dispatch = useDispatch();
  const [isMaximized, setIsMaximized] = useState(false);
  const toggleMaximize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMaximized(!isMaximized);
  };
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
  const closeButtons = (
    <div className="d-flex items-center gap-2 pe-5">
      <Button
        type="button"
        onClick={toggleMaximize}
        icon={
          isMaximized ? <FiMinimize2 size={16} /> : <FiMaximize2 size={16} />
        }
      />
      <Button
        type="button"
        className="p-0 w-10 h-10 flex items-center justify-center hover:bg-gray-100"
        onClick={handleCancelClick}
      >
        <span>
          <FiX size={18} />
        </span>
      </Button>
    </div>
  );
  return (
    <Modal
      open={open}
      title={<span className="create-campaign-modal-title">Frequently Asked Questions</span>}
      onCancel={handleCancelClick}
      closeIcon={closeButtons}
      width={isMaximized ? "98%" : 680}
      style={isMaximized ? { top: 10, padding: 0, maxWidth: "98%" } : {}}
      styles={
        isMaximized ? { height: "calc(100vh - 110px)", overflow: "auto" } : {}
      }
      footer={[
        <Button key="back" onClick={handleCancelClick} className="create-campaign-cancel-button">
          Cancel
        </Button>,
        <Button key="save" onClick={handleSave} className="create-campaign-save-button">
          Save
        </Button>,
      ]}
    >
      <Form layout="vertical" className="mt-4">
        <Form.Item  required>
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Add Question"
          />
          <span className="create-campaign-input-span"><span style={{ color: "red" }}>*</span> Question</span>
        </Form.Item>
        <Form.Item  required>
          <TextArea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Add Answer"
          />
          <span className="create-campaign-input-span"><span style={{ color: "red" }}>*</span> Answer</span>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddAskedQuestions;
