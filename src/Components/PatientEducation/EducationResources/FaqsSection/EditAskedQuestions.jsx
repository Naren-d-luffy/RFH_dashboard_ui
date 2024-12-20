import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Modal } from "antd";
import { showSuccessMessage } from "../../../../globalConstant";
import TextArea from "antd/es/input/TextArea";
import { Instance } from "../../../../AxiosConfig";
import { editFaqs } from "../../../../Features/FaqsSlice";
import { useDispatch } from "react-redux";

const EditAskedQuestions = ({ open, handleCancel, faqsData }) => {
  const dispatch = useDispatch();

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

  return (
    <Modal
      open={open}
      title={
        <span className="create-campaign-modal-title">
          Update Frequently Asked Questions
        </span>
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
          onClick={handleUpdate}
          className="create-campaign-save-button"
        >
          Update
        </Button>,
      ]}
    >
      <Form layout="vertical" className="mt-2">
        <Form.Item label="Question" required>
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Add Question"
            required
          />
        </Form.Item>
        <Form.Item label="Answer" required>
          <TextArea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Add Answer"
            required
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditAskedQuestions;
