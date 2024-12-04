import React, { useState } from "react";
import { Button, Modal } from "antd";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { HiOutlinePlus, HiMinus } from "react-icons/hi";
import { GoPlus } from "react-icons/go";
import {showSuccessMessage} from "../../../globalConstant"


const faqData = [
  {
    id: 1,
    question: "Where can I watch?",
    answer:
      "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis. Fermentum sulla craspor titlore ismod nulla.",
  },
  {
    id: 2,
    question: "How do I access this feature?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur turpis id dui pharetra tincidunt.",
  },
  {
    id: 3,
    question: "What are the system requirements?",
    answer:
      "Fusce vitae ligula sit amet libero tempus venenatis in ac libero. Morbi nec eros nisl.",
  },
  {
    id: 4,
    question: "How do I access this feature?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur turpis id dui pharetra tincidunt.",
  },
  {
    id: 5,
    question: "What are the system requirements?",
    answer:
      "Fusce vitae ligula sit amet libero tempus venenatis in ac libero. Morbi nec eros nisl.",
  },
];
const handleClick=()=>{
  showSuccessMessage("Successfully Created", "");
}
const AddAskedQuestions = ({ open, handleCancel }) => {
  const [activeQuestion, setActiveQuestion] = useState(null); // Tracks which FAQ is active
  const [showMenu, setShowMenu] = useState(false); // Toggles the menu
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls the "Add" modal

  const toggleAnswer = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
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
          onClick={handleClick}
          className="create-campaign-save-button"
        >
          Save
        </Button>,
      ]}
    >
      <div className="container mt-3">
        <div className="education-categories-faq-container">
          <div className="d-flex justify-content-between align-items-center">
            <h3>Frequently Asked Questions</h3>
            <div
              className="education-categories-faq-menu"
              onClick={toggleMenu}
              style={{ cursor: "pointer" }}
            >
              <IoEllipsisVerticalSharp size={20} />
              {showMenu && (
                <div className="education-categories-menu-options">
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              )}
            </div>
          </div>

          {faqData.map((faq) => (
            <div key={faq.id} className="education-categories-faq-item">
              <div className="education-categories-faq-question d-flex justify-content-between mt-4 align-items-center">
                <span>{faq.question}</span>
                <div
                  className="education-categories-faq-toggle"
                  onClick={() => toggleAnswer(faq.id)}
                  style={{ cursor: "pointer" }}
                >
                  {activeQuestion === faq.id ? (
                    <HiMinus size={20} />
                  ) : (
                    <HiOutlinePlus size={20} />
                  )}
                </div>
              </div>

              {activeQuestion === faq.id && (
                <div className="education-categories-faq-answer mt-3">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}

          <div className="mt-3">
            <button className="rfh-basic-button" onClick={showModal}>
              <GoPlus size={20} /> Add
            </button>
          </div>

    
        </div>
      </div>
    </Modal>
  );
};

export default AddAskedQuestions;
