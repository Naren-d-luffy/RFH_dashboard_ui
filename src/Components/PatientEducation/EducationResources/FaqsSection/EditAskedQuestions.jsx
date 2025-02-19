import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Modal } from "antd";
import { showSuccessMessage } from "../../../../globalConstant";
import TextArea from "antd/es/input/TextArea";
import { Instance } from "../../../../AxiosConfig";
import { editFaqs } from "../../../../Features/FaqsSlice";
import { useDispatch } from "react-redux";
import { FiMaximize2, FiMinimize2, FiX } from "react-icons/fi";

const EditAskedQuestions = ({ open, handleCancel, faqsData }) => {
  const dispatch = useDispatch();
  const [isMaximized, setIsMaximized] = useState(false);
  const toggleMaximize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMaximized(!isMaximized);
  };
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (faqsData) {
      setQuestion(faqsData.question || "");
      setAnswer(faqsData.answer || "");
    }
  }, [faqsData]);

  const handleUpdate = async () => {
    if (!question || !answer) {
      message.error("Please fill in all required fields.");
      return;
    }

    const updateFaqsData = {
      _id: faqsData._id, 
      question,
      answer,
    };

    try {
      const response = await Instance.put(
        `/faq/${updateFaqsData._id}`,
        updateFaqsData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if ([200, 201, 204].includes(response.status)) {
        showSuccessMessage("Faq updated successfully!");
        dispatch(editFaqs(updateFaqsData));
        resetForm();
        handleCancel();
      } else {
        message.error("Failed to update faq.");
      }
    } catch (error) {
      console.error("Error during faq update:", error);
      message.error("Failed to update faq.");
    }
  };

  const resetForm = () => {
    setAnswer("");
    setQuestion("");
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
        onClick={handleCancel}
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
      title={
        <span className="create-campaign-modal-title">
          Update Frequently Asked Questions
        </span>
      }
      onCancel={handleCancel}
      closeIcon={closeButtons}
      width={isMaximized ? "98%" : 680}
      style={isMaximized ? { top: 10, padding: 0, maxWidth: "98%" } : {}}
      bodyStyle={
        isMaximized ? { height: "calc(100vh - 110px)", overflow: "auto" } : {}
      }
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
          onClick={handleUpdate}
          className="create-campaign-save-button"
        >
          Update
        </Button>,
      ]}
    >
      <Form layout="vertical" className="mt-4">
        <Form.Item required>
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Add Question"
            required
          />
          <span className="create-campaign-input-span"><span style={{ color: "red" }}>*</span> Question</span>
        </Form.Item>
        <Form.Item  required>
          <TextArea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Add Answer"
            required
          />
          <span className="create-campaign-input-span"><span style={{ color: "red" }}>*</span> Answer</span>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditAskedQuestions;
