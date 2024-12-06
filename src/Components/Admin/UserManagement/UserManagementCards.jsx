import React, { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa6';
import { PiExport } from 'react-icons/pi';
import patient from '../../../Assets/Icons/patient.png'
import doctor from '../../../Assets/Icons/doctor.png'
import opd_patient from '../../../Assets/Icons/opd_patient.png'
import ipd_patient from '../../../Assets/Icons/ipd_patient.png'
import { Button, Dropdown, Modal, Space } from 'antd';
import { CgDanger } from 'react-icons/cg';
import { showSuccessMessage } from "../../../globalConstant"
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';

const UserManagementCards = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        // Handle export functionality here
        console.log("Export initiated!");
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleSuccessDelete = () => {
        showSuccessMessage("Export Successfully", "Please check your document, and open your document file");
        setIsModalVisible(false);
    }
    const cardData = [
        {
            heading: 'Total Patients',
            value: '12,640',
            percentage: (
                <span style={{ color: 'var(--primary-green)' }}>
                    <FaArrowUp style={{ marginRight: '4px' }} />
                    2%
                </span>
            ),
            description: 'Since last week',
            icon: <img src={patient} alt="Profile Tick" style={{ width: '22px', height: '22px' }} />,
            changeType: 'down',
            iconBg: '#e6fff5',
            iconColor: '#59B29F',
            boxShadowColor: '#59B29F',
        },
        {
            heading: 'Total Doctors',
            value: '4,800',
            percentage: (
                <span style={{ color: 'var(--primary-green)' }}>
                    +4
                </span>
            ),
            description: 'Doctores',
            icon: <img src={doctor} alt="Profile Tick" style={{ width: '22px', height: '22px' }} />,
            changeType: 'up',
            iconBg: '#e6f7ff',
            iconColor: '#7EC2FF',
            boxShadowColor: '#7EC2FF',
        },
        {
            heading: (
                <span className='d-flex align-items-center gap-2'>
                    OPD Patients
                    <CgDanger />
                </span>
            ),
            value: '15%',
            percentage: (
                <span style={{ color: 'var(--primary-green)' }}>
                    +165
                </span>
            ),
            description: 'New',
            icon: <img src={opd_patient} alt="Profile Tick" style={{ width: '22px', height: '22px' }} />,
            changeType: 'up',
            iconBg: '#fffbe6',
            iconColor: '#ffc107',
            boxShadowColor: '#ffc107',
        },
        {
            heading: (
                <span className='d-flex align-items-center gap-2'>
                    IPD Patients
                    <CgDanger />
                </span>
            ),
            value: '5%',
            percentage: (
                <span style={{ color: 'var(--primary-green)' }}>
                    +340
                </span>
            ),
            description: 'New',
            icon: <img src={ipd_patient} alt="Profile Tick" style={{ width: '22px', height: '22px' }} />,
            changeType: 'up',
            iconBg: '#e6f7ff',
            iconColor: '#7EC2FF',
            boxShadowColor: '#7EC2FF',
        },
    ];
    const items = [
        {
            label: "Week",
            key: "1",
        },
        {
            label: "Month",
            key: "2",
        },
        {
            label: "Year",
            key: "3",
        },
    ];
    const handleMenuClick = ({ key }) => { };
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center">
                <div className='user-engagement-header'>
                    <h3>User Management</h3>
                    <p >
                        New user aquisition by source
                    </p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <Dropdown menu={menuProps} overlayClassName="dropdown-hover-color">
                        <Button>
                            <Space>
                                Select
                                <IoIosArrowDown />
                            </Space>
                        </Button>
                    </Dropdown>
                    <button className="d-flex gap-2 align-items-center rfh-basic-button" onClick={showModal}>
                        <PiExport />
                        Export
                    </button>
                </div>
            </div>
            <div className="row">
                {cardData.map((card, index) => (
                    <div
                        key={index}
                        className="col-lg-3 mt-2"

                    >
                        <div className='userAquisition-card' style={{
                            borderRight: `3px solid ${card.boxShadowColor}`,
                        }}>
                            <div className="d-flex align-items-center justify-content-between">
                                <p className="mb-0">
                                    {card.heading}
                                </p>
                                <div
                                    className="userAquisition-icon-div"
                                    style={{
                                        backgroundColor: card.iconBg,
                                        color: card.iconColor,
                                    }}
                                >
                                    {card.icon}
                                </div>
                            </div>
                            <h2 className="fw-bold">{card.value}</h2>
                            <p className="userAquisition-card-body-p mb-0">
                                <span
                                    className={`userAquisition-card-body-span ${card.changeType === 'up' ? 'text-success' : 'text-danger'
                                        }`}
                                >
                                    {/* <FaArrowDown
                    className={card.changeType === 'up' ? 'rotate-180' : ''}
                  /> */}
                                    {<> {card.percentage} </>}
                                </span>{' '}
                                {card.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <Modal
                title=""
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <div className='userAquisition-model'>
                    <h3>Export data</h3>
                    <p>"Are you sure you want to export data?"</p>
                    <span>Choose a type of document</span>
                    <div className='row'>
                        <div className='col-lg-12 mt-3'>
                            <select
                                className="form-select userAquisition-dropdown"
                                aria-label="Default select example"
                            >
                                <option selected>PDF</option>
                                <option value="1">Excel</option>
                                <option value="2">PNG</option>
                                <option value="3">Text document</option>
                            </select>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center gap-3 mt-3'>
                        <Button className='py-4' onClick={handleCancel}>Cancel</Button>
                        <button className='export-button' onClick={handleSuccessDelete}>Confirm</button>
                    </div>
                </div>

            </Modal>
        </div>
    )
}

export default UserManagementCards
