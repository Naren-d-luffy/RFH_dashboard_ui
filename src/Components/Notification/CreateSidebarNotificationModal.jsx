import { Button, Col, DatePicker, Form, Input, Modal, Row, Select, TimePicker, Radio } from 'antd'
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import { showSuccessMessage } from "../../globalConstant"


const modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic"],
        ["link", "image"],
        ["clean"],
    ],
};
const handleClick = () => {
    showSuccessMessage("Successfully Sent", "");
}
const CreateSidebarNotificationModal = ({ open, handleCancel }) => {
    const [selectedValue, setSelectedValue] = useState("none");

    const handleRadioChange = (e) => {
        setSelectedValue(e.target.value);
        console.log("Selected Alert:", e.target.value);
    };
    return (
        <Modal
            title="Create Alerts"
            visible={open}
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
            <div className='row'>
                <div className='col-lg-12 mt-3'>
                    <Form.Item>
                        <Input className="create-camapign-input" placeholder="RFH Hospital" />
                        <span className="create-campaign-input-span">Notification Title</span>
                    </Form.Item>
                </div>
                <div className='col-lg-12'>
                    <Form.Item>
                        <ReactQuill
                            theme="snow"
                            modules={modules}
                            placeholder="Your text goes here"
                        />
                        <span className="settings-input-span">Notification Description </span>
                    </Form.Item>
                </div>
                <div className="col-lg-6 mb-4">
                    <Row gutter={24}>
                        <Col span={24}>
                            <Select
                                className="create-camapign-input-select"
                                placeholder="All"
                                style={{ width: "100%" }}
                                dropdownClassName="create-campaign-dropdown"
                            >
                                <Select.Option value="All">All Users</Select.Option>
                                <Select.Option value="">New Users</Select.Option>
                                <Select.Option value="">Old Users</Select.Option>
                            </Select>
                            <span className="create-campaign-input-span">Trigger by</span>
                        </Col>
                    </Row>
                </div>
                <div className="col-lg-6">
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item>
                                <DatePicker />
                                <span className="create-campaign-input-span">Schedule</span>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item>
                                <TimePicker />
                                <span className="create-campaign-input-span">Time</span>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                {/* <div className="col-lg-3">
                    <Form.Item>
                        <DatePicker />
                        <span className="create-campaign-input-span">Schedule</span>
                    </Form.Item>
                </div>
                <div className="col-lg-3">
                    <Form.Item>
                        <TimePicker />
                        <span className="create-campaign-input-span">Time</span>
                    </Form.Item>
                </div> */}
                <div className="col-lg-10">
                    <div>
                        <label style={{ fontWeight: 600, marginBottom: "8px", display: "block" }}>
                            Alert
                        </label>
                        <Radio.Group value={selectedValue} onChange={handleRadioChange}>
                            <Radio value="none" style={{ fontWeight: 400 }}>None</Radio>
                            <Radio value="6hours" style={{ fontWeight: 400 }}>6 Hours</Radio>
                            <Radio value="8hours" style={{ fontWeight: 400 }}>8 Hours</Radio>
                            <Radio value="24hours" style={{ fontWeight: 400 }}>24 Hours</Radio>
                        </Radio.Group>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CreateSidebarNotificationModal
