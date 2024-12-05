import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { HiOutlinePlus, HiMinus } from "react-icons/hi";
import { GoPlus } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { showSuccessMessage } from "../../../globalConstant";

const AddAskedQuestions = ({ open, handleCancel }) => {
  const [faqData, setFaqData] = useState([
    {
      id: 1,
      question: "1.Where can I watch?",
      answer:
        "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis. Fermentum sulla craspor titlore ismod nulla.",
    },
    {
      id: 2,
      question: "2.How do I access this feature?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur turpis id dui pharetra tincidunt.",
    },
    {
      id: 3,
      question: "3.What are the system requirements?",
      answer:
        "Fusce vitae ligula sit amet libero tempus venenatis in ac libero. Morbi nec eros nisl.",
    },
    {
      id: 4,
      question: "4.How do I access this feature?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur turpis id dui pharetra tincidunt.",
    },
  ]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const toggleAnswer = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  const deleteFaq = (id) => {
    const updatedFaqData = faqData.filter((faq) => faq.id !== id);
    setFaqData(updatedFaqData);
  };

  const addFaq = () => {
    if (newQuestion && newAnswer) {
      const newFaq = {
        id: faqData.length + 1,
        question: newQuestion,
        answer: newAnswer,
      };
      setFaqData([...faqData, newFaq]);
      setNewQuestion("");
      setNewAnswer("");
    }
  };

  return (
    <Modal
      open={open}
      title={
        <span className="create-campaign-modal-title">
          Frequently Asked Questions
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
          onClick={() => showSuccessMessage("Successfully Created", "")}
          className="create-campaign-save-button"
        >
          Save
        </Button>,
      ]}
    >
      <div className="container mt-3">
        <div className="education-categories-faq-container">
          <h3>Frequently Asked Questions</h3>

          {faqData.map((faq) => (
            <div key={faq.id} className="education-categories-faq-item">
              <div className="education-categories-faq-question d-flex justify-content-between mt-4 align-items-center">
                <span>{faq.question}</span>
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="education-categories-faq-toggle"
                    onClick={() => toggleAnswer(faq.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {activeQuestion === faq.id ? (
                      <HiMinus size={20} color="var(--primary-green)" />
                    ) : (
                      <HiOutlinePlus size={20} color="var(--primary-green)" />
                    )}
                  </div>
                  <RiDeleteBin6Line
                    size={20}
                    style={{ cursor: "pointer", color: "var(--red-color)" }}
                    onClick={() => deleteFaq(faq.id)}
                    color="var(--primary-green)"
                  />
                </div>
              </div>

              {activeQuestion === faq.id && (
                <div className="education-categories-faq-answer mt-3">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}

          <div className="mt-4">
            <Form.Item>
              <Input
                className="create-camapign-input"
                placeholder="Enter your question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              <span className="create-campaign-input-span">Question</span>
            </Form.Item>

            <Form.Item>
              <Input
                className="create-camapign-input"
                placeholder="Enter the answer"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
              <span className="create-campaign-input-span">Answer</span>
            </Form.Item>
          </div>

          <div className="mt-3">
            <button className="rfh-basic-button" onClick={addFaq}>
              <GoPlus size={20} /> Add
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddAskedQuestions;
