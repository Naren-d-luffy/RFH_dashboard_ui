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
import { RiDeleteBin7Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";

const EducationCategoriesQuestions = () => {
  const dispatch = useDispatch();

  const [activeQuestion, setActiveQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [faqsList, setFaqsList] = useState([]);
  const [selectedFaq, setSelectedFaq] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const showEditModal = (faq) => {
    setSelectedFaq(faq);
    setIsEditModalOpen(true);
  };

  const handleCancelEditModal = () => {
    setSelectedFaq(null);
    setIsEditModalOpen(false);
  };

  const faqData = useSelector((state) => state.faq.faqs);
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
      <Menu.Item
        key="edit"
        className="filter-menu-item"
        onClick={() => {
          showEditModal(faq);
        }}
      >
        <BiEdit style={{ color: "var(--primary-green)", marginRight: "4px" }} />
        Edit
      </Menu.Item>
      <Menu.Item
        key="delete"
        className="filter-menu-item"
        onClick={() => handleDelete(faq._id)}
      >
        <RiDeleteBin7Line
          style={{ color: "var(--red-color)", marginRight: "4px" }}
        />
        Delete
      </Menu.Item>
    </Menu>
  );

  const fetchFaqsList = async () => {
    setIsLoading(true);
    try {
      const response = await Instance.get(`/faq`);
      console.log("ccccccc", response);

      setFaqsList(response.data.data || []);
      dispatch(setFaqs(response.data.data));
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
        <div className="events-header-container">
          <h3>Frequently Asked Questions</h3>
          <div className="events-buttons">
          <button
            className="rfh-basic-button"
            onClick={showModal}
            aria-label="Add Question"
          > 
            <GoPlus size={20} /> Add
          </button>
          </div>
        </div>

        {Object.values(faqData).map((faq, index) => (
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
