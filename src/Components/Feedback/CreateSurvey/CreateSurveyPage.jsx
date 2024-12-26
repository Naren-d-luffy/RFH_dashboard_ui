import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Modal,
  Popover,
  Rate,
  Upload,
} from "antd";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaPlus, FaRegCircleCheck, FaRegStar } from "react-icons/fa6";
import { IoIosArrowDropdown, IoIosKeypad } from "react-icons/io";
import { LuWrapText } from "react-icons/lu";
import { MdFormatListBulleted, MdOutlineShortText } from "react-icons/md";
import { VscCloudUpload } from "react-icons/vsc";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import success_icon from "../../../Assets/Icons/success.png";
import { useNavigate } from "react-router-dom";

const CreateSurveyPage = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const handlePopoverVisibleChange = (visible) => {
    setIsPopoverOpen(visible);
  };
  const handleSend = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  const [questions, setQuestions] = useState([]);
  const content = (
    <div>
      <div className="createSurvey-form-icon-div">
        <MdFormatListBulleted onClick={() => addQuestion("paragraph")} />{" "}
      </div>
      <div className="createSurvey-form-icon-div">
        <FaRegCircleCheck onClick={() => addQuestion("checkbox")} />{" "}
      </div>
      <div className="createSurvey-form-icon-div">
        <VscCloudUpload onClick={() => addQuestion("upload")} />{" "}
      </div>
      <div className="createSurvey-form-icon-div">
        <FaRegStar onClick={() => addQuestion("rating")} />{" "}
      </div>
      <div className="createSurvey-form-icon-div">
        <MdOutlineShortText onClick={() => addQuestion("shortAnswer")} />{" "}
      </div>
      <div className="createSurvey-form-icon-div">
        <IoIosArrowDropdown onClick={() => addQuestion("dropdown")} />{" "}
      </div>
      <div className="createSurvey-form-icon-div">
        <LuWrapText />{" "}
      </div>
      <div className="createSurvey-form-icon-div">
        <IoIosKeypad onClick={() => addQuestion("multipleChoice")} />
      </div>
    </div>
  );

  const addQuestion = (type) => {
    const newQuestion = {
      id: Date.now(),
      type,
      label: "",
      options: type === "dropdown" || type === "multipleChoice" ? [""] : [],
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionChange = (id, value) => {
    const updatedQuestions = questions?.map((q) =>
      q.id === id ? { ...q, label: value } : q
    );
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionId, optionIndex, value) => {
    const updatedQuestions = questions?.map((q) => {
      if (q.id === questionId) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const addOption = (questionId) => {
    const updatedQuestions = questions?.map((q) => {
      if (q.id === questionId) {
        return { ...q, options: [...q.options, ""] };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const renderQuestionInput = (question) => {
    switch (question.type) {
      case "dropdown":
      case "multipleChoice":
        return (
          <div>
            {question.options?.map((option, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <Checkbox disabled style={{ marginRight: "8px" }} />
                <Input
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(question.id, index, e.target.value)
                  }
                  className="create-survey-inputs"
                />
              </div>
            ))}
            <Button type="link" onClick={() => addOption(question.id)}>
              + Add Option
            </Button>
          </div>
        );
      case "shortAnswer":
        return (
          <Input
            placeholder="User's short answer..."
            className="create-survey-inputs"
          />
        );
      case "paragraph":
        return (
          <Input.TextArea
            placeholder="User's long answer..."
            className="create-survey-inputs"
          />
        );
      case "checkbox":
        return (
          <div className="d-flex align-items-center">
            <Checkbox style={{ marginRight: "8px" }} />
            <Input
              placeholder="Checkbox option..."
              className="create-survey-inputs"
            />
          </div>
        );
      case "upload":
        return (
          <Upload>
            <Button icon={<PlusOutlined />}>Upload</Button>
          </Upload>
        );
      case "rating":
        return <Rate allowHalf />;
      default:
        return (
          <Input placeholder="Type here..." className="create-survey-inputs" />
        );
    }
  };
  return (
    <div className="container">
      <div className="user-engagement-header">
        <h3>Create Survey </h3>
      </div>
      <div className="createSurvey-page-div">
        <div className="row  ">
          <div className="col-lg-12 createSurvey-banner-div">
            <h2>Welcome</h2>
            <p>We'd like to ask you for some additional information</p>
          </div>
        </div>
        <Form layout="vertical">
          <div className="row createSurvey-page-name-div mt-3">
            <div className="col-lg-6">
              <Form.Item label="Name" name="address" className="mb-0">
                <Input
                  placeholder="Type here"
                  className="createSurvey-page-div-input"
                />
              </Form.Item>
              <Divider className="mt-0" />
            </div>
            <div className="col-lg-6">
              <Form.Item label="Date of birth" name="address" className="mb-0">
                <Input
                  placeholder="Type here"
                  className="createSurvey-page-div-input"
                />
              </Form.Item>
              <Divider className="mt-0" />
            </div>
          </div>

          {questions?.map((question, index) => (
            <div key={question.id} className="row mb-3 align-items-center">
              <div className="col-lg-12">
                <Form.Item label={`Question ${index + 1}`}>
                  <Input
                    placeholder="Type your question here..."
                    value={question.label}
                    onChange={(e) =>
                      handleQuestionChange(question.id, e.target.value)
                    }
                    className="create-survey-inputs"
                  />
                </Form.Item>
              </div>
              <div className="col-lg-11">{renderQuestionInput(question)}</div>
              <div className="col-lg-1 text-right">
                <button
                  className="CreateSurvey-form-close"
                  onClick={() => removeQuestion(question.id)}
                >
                  <CloseOutlined className="CreateSurvey-form-close-button"/>
                </button>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-end mt-3">
            <Popover
              content={content}
              title=""
              trigger="click"
              overlayClassName="create-survey-popover"
              visible={isPopoverOpen}
              onVisibleChange={handlePopoverVisibleChange}
            >
              <button className="createSurvey-addForms-button">
                {isPopoverOpen ? (
                  <FaTimes style={{ fontSize: "25px" }} />
                ) : (
                  <FaPlus style={{ fontSize: "25px" }} />
                )}
              </button>
            </Popover>
          </div>
          <div className="d-flex justify-content-end mt-4">
            <button className="rfh-basic-button" onClick={handleSend}>
              Send
            </button>
          </div>
        </Form>
      </div>
      <Modal
        title=""
        visible={isModalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={null}
      >
        <div className="">
          <div className="d-flex justify-content-center mb-0">
            <img
              src={success_icon}
              style={{ width: "100px", height: "100px" }}
            />
          </div>
          <div className="delete-message" style={{ fontWeight: 600 }}>
            Link Generated
          </div>
          <p
            className="mb-0 mt-1 crateSurvey-copy-link-p"
            style={{ textAlign: "center" }}
          >
            https://docs.google.com/forms/d/e/1FAIpQLSc0_VGjRaAC98COVusuiMBGfOZno9HqYesOsEC_J0hEtLr-hA/viewform?usp=sf_link
          </p>
          <div className="d-flex gap-3 align-items-center justify-content-center mt-3">
            <button
              className="create-survey-cancel-button"
              onClick={handleModalClose}
            >
              Cancel
            </button>
            <button
              className="create-survey-save-button"
              onClick={() => navigate("/feedback/create-survey")}
            >
              CopyLink
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateSurveyPage;
