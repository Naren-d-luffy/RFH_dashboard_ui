import {
  Divider,
  Form,
  Input,
  Checkbox,
  Button,
  Upload,
  Rate,
  Radio,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PopulatedSurveyData = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    {
      id: 1,
      label:
        "1.Did you find the hospital signage and directions easy to follow?",
      type: "shortAnswer",
      value:
        "Ans :  Add a one-click option to download the contact information directly to my phone or email contacts",
    },
    {
      id: 2,
      label:
        "2. Did the staff explain your diagnosis and treatment plan clearly?",
      type: "shortAnswer",
      value:
        "Ans :  Add a one-click option to download the contact information directly to my phone or email contacts",
    },
    {
      id: 3,
      label: "3.How would you rate your wait time to consult with the doctor?",
      type: "shortAnswer",
      value:
        "Ans :  Add a one-click option to download the contact information directly to my phone or email contacts",
    },
    {
      id: 4,
      label: "4.How would you rate your wait time to consult with the doctor?",
      type: "shortAnswer",
      value:
        "Ans :  Add a one-click option to download the contact information directly to my phone or email contacts",
    },
    {
      id: 5,
      label: "5.How would you rate your wait time to consult with the doctor?",
      type: "shortAnswer",
      value:
        "I am a software developer with a passion for learning new technologies.",
    },
    {
      id: 6,
      label: "6.How would you rate your wait time to consult with the doctor?",
      type: "shortAnswer",
      value:
        "Ans :  Add a one-click option to download the contact information directly to my phone or email contacts",
    },

    {
      id: 7,
      label: "7.How would you rate the cleanliness of the hospital?",
      type: "checkbox",
      options: [{ label: "Excellent", value: "Excellent" }],
      selectedValue: "Excellent",
    },
    {
      id: 8,
      label:
        "8.Was the information provided by the doctor clear and easy to understand?",
      type: "checkbox",
      options: [
        { label: "Yes, completely clear", value: "Yes, completely clear" },
      ],
      selectedValue: "Yes, completely clear",
    },
    {
      id: 9,
      label:
        "9.Was the information provided by the doctor clear and easy to understand?",
      type: "checkbox",
      options: [
        { label: "Yes, completely clear", value: "Yes, completely clear" },
      ],
      selectedValue: "Yes, completely clear",
    },
    {
      id: 10,
      label:
        "8.Was the information provided by the doctor clear and easy to understand?",
      type: "checkbox",
      options: [
        { label: "Yes, completely clear", value: "Yes, completely clear" },
      ],
      selectedValue: "Yes, completely clear",
    },
    {
      id: 11,
      label: "Rate our services",
      type: "rating",
      value: 4.5,
    },
  ]);

  const handleInputChange = (id, value) => {
    const updatedQuestions = questions.map((question) =>
      question.id === id ? { ...question, value } : question
    );
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (id, index, value) => {
    const updatedQuestions = questions.map((question) =>
      question.id === id
        ? {
            ...question,
            options: question.options.map((option, i) =>
              i === index ? value : option
            ),
          }
        : question
    );
    setQuestions(updatedQuestions);
  };

  const addOption = (id) => {
    const updatedQuestions = questions.map((question) =>
      question.id === id
        ? { ...question, options: [...(question.options || []), ""] }
        : question
    );
    setQuestions(updatedQuestions);
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case "dropdown":
      case "multipleChoice":
        return (
          <div>
            {question.options?.map((option, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <Checkbox
                  style={{ marginRight: "8px" }}
                  checked={option.selected}
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
            value={question.value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            className="create-survey-inputs"
          />
        );
      case "paragraph":
        return (
          <Input.TextArea
            placeholder="User's long answer..."
            value={question.value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            className="create-survey-inputs"
          />
        );
      case "checkbox":
      case "radio":
        return (
          <div>
            <Radio.Group
              value={question.selectedValue}
              onChange={(e) => handleOptionChange(question.id, e.target.value)}
            >
              {question.options.map((option, index) => (
                <Radio key={index} value={option.value}>
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        );
      case "upload":
        return (
          <Upload>
            <Button icon={<PlusOutlined />}>Upload</Button>
          </Upload>
        );
      case "rating":
        return (
          <Rate
            allowHalf
            value={question.value}
            onChange={(value) => handleInputChange(question.id, value)}
          />
        );
      default:
        return (
          <Input
            placeholder="Type here..."
            value={question.value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            className="create-survey-inputs"
          />
        );
    }
  };

  const handleClick = () => {
    navigate("/feedback/create-survey/single-survey-details");
  };

  return (
    <div className="container">
      <div className="user-engagement-header">
        <h3>Create Survey</h3>
      </div>
      <div className="createSurvey-page-div">
        <div className="row  ">
          <div className="col-lg-12 createSurvey-banner-div">
            <h2>Welcome</h2>
            <p>We'd like to ask you for some additional information</p>
          </div>
        </div>

        <Form layout="vertical">
          <div className="row createSurvey-page-name-div mt-4 mb-3">
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
          <div className="row pupulated-data-div">
            <div className="col-lg-12">
              {questions.map((question) => (
                <Form.Item
                  key={question.id}
                  label={
                    <span className="populated-survey-label">
                      {question.label}
                    </span>
                  }
                >
                  <div className="populated-survey-values">
                    {renderQuestion(question)}
                  </div>
                </Form.Item>
              ))}
            </div>
          </div>
          <div className="d-flex justify-content-start mt-5">
            <button
              className="d-flex gap-2 align-items-center rfh-basic-button"
              onClick={handleClick}
            >
              <FaAngleLeft />
              Back
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PopulatedSurveyData;
