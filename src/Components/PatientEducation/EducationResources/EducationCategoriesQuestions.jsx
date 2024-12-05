import React, { useState } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { HiOutlinePlus, HiMinus } from "react-icons/hi";
import { GoPlus } from "react-icons/go";
import AddAskedQuestions from "./AddAskedQuestions";

const EducationCategoriesQuestions = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [showMenu, setShowMenu] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

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
  ];

  const toggleAnswer = (id) => {
    if (activeQuestion === id) {
      setActiveQuestion(null);
    } else {
      setActiveQuestion(id);
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
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
      <AddAskedQuestions open={isModalOpen} handleCancel={handleCancel}/>
    </div>
  );
};

export default EducationCategoriesQuestions;
