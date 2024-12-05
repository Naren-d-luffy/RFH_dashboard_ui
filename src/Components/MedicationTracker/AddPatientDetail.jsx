import React from "react";
import { Form, Input, Row, Col, DatePicker, Select, Button, TimePicker } from "antd";
import { Option } from "antd/es/mentions";
import { IoCloudUploadOutline } from "react-icons/io5";
import "react-quill/dist/quill.snow.css";
import { Upload } from "antd";
import { useNavigate } from "react-router-dom";
import {showSuccessMessage} from "../../globalConstant"


const AddPatientDetail = () => {
  const navigate = useNavigate();
  const handleClick=()=>{
    showSuccessMessage("Successfully Added Medication", "");
  }

  return (
    <div className="">
      <div className="mt-4 campaign-performance-head">
        <h3>Add Patient Detail</h3>
        <p>Add Recent Patient Details </p>
      </div>
      <div className="mt-3 doctor-detail-page-head">
        <div>
        <div className="mb-4">
            <h6>Patient Detail</h6>
        </div>
        <div>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-camapign-input"
                  placeholder="Enter Patient Name"
                />
                <span className="create-campaign-input-span">First Name</span>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-camapign-input"
                  placeholder="Enter Patient Name"
                />
                <span className="create-campaign-input-span">Last Name</span>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-camapign-input"
                  placeholder="Enter Mobile No"
                />
                <span className="create-campaign-input-span">Mobile No</span>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-camapign-input"
                  placeholder="Enter Your Email ID"
                />
                <span className="create-campaign-input-span">Email ID</span>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <DatePicker
                  className="add-events-datepicker"
                  placeholder="Select Date"
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY"
                />
                <span className="create-campaign-input-span">
                  Date Of Birth
                </span>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item>
                <Select
                  className="create-camapign-input-select"
                  placeholder="Select Gender"
                  style={{ width: "100%" }}
                  dropdownClassName="create-campaign-dropdown"
                >
                  <Option value="Low">Male</Option>
                  <Option value="Medium">Female</Option>
                </Select>
                <span className="create-campaign-input-span">Gender</span>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div>
        </div>
        <div>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item>
                <Input
                  className="create-camapign-input"
                  placeholder="Enter Your Address"
                />
                <span className="create-campaign-input-span">Address</span>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item>
                <Select
                  className="create-camapign-input-select"
                  placeholder="Select Country"
                  style={{ width: "100%" }}
                  dropdownClassName="create-campaign-dropdown"
                >
                  <Option value="Low">India</Option>
                  <Option value="Medium">USA</Option>
                </Select>
                <span className="create-campaign-input-span">Country</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                <Select
                  className="create-camapign-input-select"
                  placeholder="Select State"
                  style={{ width: "100%" }}
                  dropdownClassName="create-campaign-dropdown"
                >
                  <Option value="Low">Mumbai</Option>
                  <Option value="Medium">Bangalore</Option>
                </Select>
                <span className="create-campaign-input-span">State</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                <Input
                  className="create-camapign-input"
                  placeholder="Enter Your code"
                />
                <span className="create-campaign-input-span">ZIP Code</span>
              </Form.Item>
            </Col>
          </Row>
        </div>
        </div>

     <div>
     <div className="mb-4">
            <h6>Medicine Detail</h6>
        </div>
        <div>
          <Row gutter={24}>
            <Col span={12}>
            <Form.Item>
                <Input
                  className="create-camapign-input"
                  placeholder="Enter medicine Name"
                />
                <span className="create-campaign-input-span">Medication</span>
              </Form.Item>
            </Col>
            <Col span={6}>
            <Form.Item>
                <DatePicker
                  className="add-events-datepicker"
                  placeholder="12/12/2024"
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY"
                />
                <span className="create-campaign-input-span">
                  Date
                </span>
              </Form.Item>
            </Col>
            <Col span={6}>
            <Form.Item>
                <TimePicker
                  className="add-events-datepicker"
                  placeholder="12:00 PM"
                  style={{ width: "100%" }}
                />
                <span className="create-campaign-input-span">
                  Time
                </span>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-camapign-input"
                  placeholder="Enter Dose"
                />
                <span className="create-campaign-input-span">Dose</span>
              </Form.Item>
            </Col>

            <Col span={12}>
            <Form.Item>
                <Select
                  className="create-camapign-input-select"
                  placeholder="Select"
                  style={{ width: "100%" }}
                  dropdownClassName="create-campaign-dropdown"
                >
                  <Option value="Low">High</Option>
                  <Option value="Medium">Low</Option>
                </Select>
                <span className="create-campaign-input-span">Frequency</span>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={6}>
            <Form.Item>
                <DatePicker
                  className="add-events-datepicker"
                  placeholder="12/12/2024"
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY"
                />
                <span className="create-campaign-input-span">
                   Next Dose Schedule
                </span>
              </Form.Item>
            </Col>
            <Col span={6}>
            <Form.Item>
                <TimePicker
                  className="add-events-datepicker"
                  placeholder="12:00 PM"
                  style={{ width: "100%" }}
                />
                <span className="create-campaign-input-span">
                  Time
                </span>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
            <Form.Item>
              <Upload listType="picture" className="create-campaign-upload">
                <p className="create-campaign-ant-upload-text">
                  Drop image here
                </p>
                <span className="create-campaign-ant-upload-drag-icon">
                  <IoCloudUploadOutline color="var(--red-color)" size={20} />{" "}
                  <span className="create-campaign-input-span">
                     Upload Medicine  Photo (Optional)
                  </span>
                </span>
              </Upload>
            </Form.Item>
            </Col>
          </Row>
        </div>
     </div>
    </div>



      <div className="mt-5 d-flex justify-content-end gap-3">
        <Button
          key="back"
          className="create-campaign-cancel-button"
          onClick={() => navigate("/medication-tracker")}
        >
          Cancel
        </Button>
        <Button key="save" className="create-campaign-save-button" onClick={handleClick}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default AddPatientDetail;
