import { Button, DatePicker, Form, Input, Modal } from 'antd'
import React from 'react'
import { showSuccessMessage } from '../../../globalConstant';

const UserManagementAddPatientsModal = ({ visible, onClose }) => {
    const HandleClick = () => {
        showSuccessMessage("Patient Added Successfully");
      };
    return (
        <div>
            <Modal
                title={<span className="addPatient-modal-heder">Add Patients</span>}
                visible={visible}
                onCancel={onClose}
                width={680}
                footer={[
                    <Button
                        key="back"
                        onClick={onClose}
                        className="create-campaign-cancel-button"
                    >
                        Cancel
                    </Button>,
                    <Button
                        key="save"
                        onClick={HandleClick}
                        className="create-campaign-save-button"
                    >
                        Save
                    </Button>,
                ]}
            >
                <div className='row mt-4'>
                    <div className='col-lg-12 mt-3'>
                        <Form.Item>
                            <Input className="create-camapign-input" placeholder="Enter patient name" />
                            <span className="create-campaign-input-span">Patient Name</span>
                        </Form.Item>
                    </div>
                    <div className='col-lg-12'>
                        <Form.Item>
                            <Input className="create-camapign-input" placeholder="Enter Dr name" />
                            <span className="create-campaign-input-span">Consult Dr</span>
                        </Form.Item>
                    </div>
                    <div className='col-lg-6'>
                        <Form.Item>
                            <select className="form-select create-camapign-input" aria-label="Select patient name" defaultValue="">
                                <option value="" disabled>
                                    Select
                                </option>
                                <option value="patient1">OPD</option>
                                <option value="patient2">IPD</option>
                            </select>
                            <span className="create-campaign-input-span">Type</span>
                        </Form.Item>
                    </div>
                    <div className='col-lg-6'>
                        <Form.Item>
                            <select className="form-select create-camapign-input" aria-label="Select patient name" defaultValue="">
                                <option value="" disabled>
                                    Select Specialty
                                </option>
                                <option value="patient1">Cardiology</option>
                                <option value="patient2">General Care</option>
                                <option value="patient3">Gastroenterology</option>
                                <option value="patient3">Pediatrics</option>
                                <option value="patient3">Orthopedic</option>
                            </select>
                            <span className="create-campaign-input-span">Dr Specialty</span>
                        </Form.Item>
                    </div>
                    <div className='col-lg-6'>
                        <Form.Item>
                            <DatePicker style={{ width: "100%", padding: "8px" }} />
                            <span className="create-campaign-input-span">Last visit</span>
                        </Form.Item>
                    </div>
                    <div className='col-lg-6'>
                        <Form.Item>
                            <Input className="create-camapign-input" placeholder="Enter diseases" />
                            <span className="create-campaign-input-span">Diagnosis</span>
                        </Form.Item>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default UserManagementAddPatientsModal
