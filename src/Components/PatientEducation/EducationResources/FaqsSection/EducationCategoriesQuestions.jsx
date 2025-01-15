import React, { useEffect, useState } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { HiOutlinePlus, HiMinus } from "react-icons/hi";
import { GoPlus } from "react-icons/go";
import { Dropdown, Menu } from "antd";
import AddAskedQuestions from "./AddAskedQuestions";
import { deleteFaqs, setFaqs } from "../../../../Features/FaqsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Instance } from "../../../../AxiosConfig";
import {
  showDeleteMessage,
  showSuccessMessage,
} from "../../../../globalConstant";
import EditAskedQuestions from "./EditAskedQuestions";

const EducationCategoriesQuestions = () => {
  const dispatch = useDispatch();

  const [activeQuestion, setActiveQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [faqsList, setFaqsList] = useState([]);
  const [selectedFaq, setSelectedFaq] = useState(null); // Set initial value to null

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const showEditModal = (faq) => {
    setSelectedFaq(faq); // Pass the entire FAQ object
    setIsEditModalOpen(true); // Set modal to open
  };

  const handleCancelEditModal = () => {
    setSelectedFaq(null); // Clear selected FAQ
    setIsEditModalOpen(false); // Close the modal
  };

  const faqData = useSelector((state) => state.faq.faqs);
  console.log("FAQs Data:", faqData);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const toggleAnswer = (id) => {
    setActiveQuestion((prev) => (prev === id ? null : id));
  };

  const handleDelete = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/faq/${_id}`);
          if (response.status === 200) {
            showSuccessMessage("Deleted successfully", "Details deleted");
            dispatch(deleteFaqs(_id));
            setFaqsList((prev) => prev.filter((faq) => faq._id !== _id));
          }
        } catch (error) {
          console.error("Error deleting faqs list:", error);
        }
      },
    });
  };

  const menu = (faq) => (
    <Menu>
      <Menu.Item key="edit" onClick={() => showEditModal(faq)}>
        Edit
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="delete" onClick={() => handleDelete(faq._id)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const fetchFaqsList = async () => {
    setIsLoading(true);
    try {
      const response = await Instance.get(`/faq`);
      setFaqsList(response.data || []);
      dispatch(setFaqs(response.data));
    } catch (error) {
      console.error("Error fetching FAQs list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqsList();
  }, []);

  return (
    <div className="container mt-3">
      <div className="education-categories-faq-container">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Frequently Asked Questions</h3>
          <button
            className="rfh-basic-button"
            onClick={showModal}
            aria-label="Add Question"
          >
            <GoPlus size={20} /> Add
          </button>
        </div>

        {faqData.map((faq) => (
          <div key={faq.id} className="education-categories-faq-item">
            <div className="education-categories-faq-question d-flex justify-content-between mt-4 align-items-center">
              <span>{faq.question}</span>
              <div className="d-flex gap-2 align-items-center">
                <div
                  className="education-categories-faq-toggle"
                  onClick={() => toggleAnswer(faq._id)}
                  role="button"
                  aria-label={`Toggle answer for question ${faq._id}`}
                >
                  {activeQuestion === faq._id ? (
                    <HiMinus size={20} color="var(--primary-green)" />
                  ) : (
                    <HiOutlinePlus size={20} color="var(--primary-green)" />
                  )}
                </div>

                <Dropdown overlay={menu(faq)} trigger={["click"]}>
                  <IoEllipsisVerticalSharp
                    size={20}
                    style={{ cursor: "pointer", color: "var(--primary-green)" }}
                  />
                </Dropdown>
              </div>
            </div>

            {activeQuestion === faq._id && (
              <div className="education-categories-faq-answer mt-3">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <AddAskedQuestions open={isModalOpen} handleCancel={handleCancel} />
      <EditAskedQuestions
        open={isEditModalOpen}
        handleCancel={handleCancelEditModal}
        faqsData={selectedFaq}
      />
    </div>
  );
};

export default EducationCategoriesQuestions;
