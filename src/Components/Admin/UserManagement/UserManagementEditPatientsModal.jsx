import { DatePicker, Form, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { FaAngleLeft } from 'react-icons/fa6';

const UserManagementEditPatientsModal = ({ visible, onClose }) => {
    const dummyData = {
        name: "Kiran B K",
        id: "U121212",
        consultDr: "Dr. Sunil",
        type: "OPD",
        drSpecialty: "Cardiology",
        lastVisit: null, 
        diagnosis: "Diabetes",
        status: "Active",
    };

    const [formData, setFormData] = useState(dummyData);
    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };
    return (
        <div>
            <Modal
                title={<span className="addPatient-modal-heder">Patients Info</span>}
                visible={visible}
                onCancel={onClose}
                width={680}
                footer={null}
            >
                <div className="row mt-4">
                    <div className="col-lg-12 mt-3">
                        <Form.Item>
                            <Input
                                className="create-camapign-input"
                                value={formData.name || ""}
                                onChange={(e) => handleChange("name", e.target.value)}
                                placeholder="Enter patient name"
                            />
                            <span className="create-campaign-input-span">Patient Name</span>
                        </Form.Item>
                    </div>
                    <div className="col-lg-12">
                        <Form.Item>
                            <Input
                                className="create-camapign-input"
                                value={formData.id || ""}
                                onChange={(e) => handleChange("id", e.target.value)}
                                placeholder="Enter patient ID"
                            />
                            <span className="create-campaign-input-span">Patient ID</span>
                        </Form.Item>
                    </div>
                    <div className="col-lg-12">
                        <Form.Item>
                            <Input
                                className="create-camapign-input"
                                value={formData.consultDr || ""}
                                onChange={(e) => handleChange("consultDr", e.target.value)}
                                placeholder="Enter doctor's name"
                            />
                            <span className="create-campaign-input-span">Consult Dr</span>
                        </Form.Item>
                    </div>
                    <div className="col-lg-6">
                        <Form.Item>
                            <select
                                className="form-select create-camapign-input"
                                value={formData.type || ""}
                                onChange={(e) => handleChange("type", e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="OPD">OPD</option>
                                <option value="IPD">IPD</option>
                            </select>
                            <span className="create-campaign-input-span">Type</span>
                        </Form.Item>
                    </div>
                    <div className="col-lg-6">
                        <Form.Item>
                            <select
                                className="form-select create-camapign-input"
                                value={formData.drSpecialty || ""}
                                onChange={(e) => handleChange("drSpecialty", e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="Cardiology">Cardiology</option>
                                <option value="General Care">General Care</option>
                                <option value="Gastroenterology">Gastroenterology</option>
                                <option value="Pediatrics">Pediatrics</option>
                                <option value="Orthopedic">Orthopedic</option>
                            </select>
                            <span className="create-campaign-input-span">Dr Specialty</span>
                        </Form.Item>
                    </div>
                    <div className="col-lg-6">
                        <Form.Item>
                            <DatePicker
                                style={{ width: "100%", padding: "8px" }}
                            />
                            <span className="create-campaign-input-span">Last Visit</span>
                        </Form.Item>
                    </div>
                    <div className="col-lg-6">
                        <Form.Item>
                            <Input
                                className="create-camapign-input"
                                value={formData.diagnosis || ""}
                                onChange={(e) => handleChange("diagnosis", e.target.value)}
                                placeholder="Enter diagnosis"
                            />
                            <span className="create-campaign-input-span">Diagnosis</span>
                        </Form.Item>
                    </div>
                    <div className="col-lg-12">
                        <Form.Item>
                            <Input
                                className="create-camapign-input"
                                value={formData.status || ""}
                                onChange={(e) => handleChange("status", e.target.value)}
                                placeholder="Enter status"
                                style={{
                                    color: formData.status === "Active" ? "green !important" :
                                        formData.status === "Inactive" ? "red !important" :
                                            "black !important",
                                }}
                            />
                            <span className="create-campaign-input-span">Status</span>
                        </Form.Item>
                    </div>
                    <div  className='d-flex justify-content-start'>
                        <button className="d-flex gap-2 align-items-center export-button" onClick={onClose}>
                            <FaAngleLeft />
                            Back
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default UserManagementEditPatientsModal


