import React, { useState } from 'react';
import { FaArrowDown, FaUsers } from 'react-icons/fa6';
import { PiExport, PiSmileySadFill } from 'react-icons/pi';
import { FaChartLine, FaShoppingCart, FaDollarSign } from 'react-icons/fa6';
import total_survey_icon from '../../../Assets/Icons/total_survey_icon.png'
import { Button, Modal } from 'antd';
import { GoPlus } from 'react-icons/go';
import { BsFillEmojiSmileFill } from 'react-icons/bs';
import CreateSurveyPage from './CreateSurveyPage';
import { useNavigate } from 'react-router-dom';

export const FeedbackCreateSurveyCard = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/feedback/create-survey-page")
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const cardData = [
        {
            heading: 'Total Surveys',
            value: '67',
            percentage: '+2',
            description: 'This Week',
            icon: <img src={total_survey_icon} alt="Profile Tick" style={{ width: '22px', height: '22px' }} />,
            changeType: 'up',
            iconBg: '#e6fff5',
            iconColor: '#59B29F',
            boxShadowColor: '#59B29F',
        },
        {
            heading: 'Positive Feedback',
            value: '6,800',
            percentage: '+165',
            description: 'This Week',
            icon: <BsFillEmojiSmileFill />,
            changeType: 'up',
            iconBg: '#fffbe6',
            iconColor: '#ffc107',
            boxShadowColor: '#ffc107',
        },
        {
            heading: 'Negative Feedback',
            value: '200',
            percentage: '+40',
            description: 'This Week',
            icon: <PiSmileySadFill />,
            changeType: 'up',
            iconBg: '#e6f7ff',
            iconColor: '#7EC2FF',
            boxShadowColor: '#7EC2FF',
        },
    ];

    return (
        <div className="">
            <div className="d-flex justify-content-between align-items-center">
                <div className='user-engagement-header'>
                    <h3>Survey List</h3>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <button className="d-flex gap-2 align-items-center rfh-basic-button" onClick={handleClick}>
                        <GoPlus />
                        Create Surveys
                    </button>
                </div>
            </div>
            <div className="row">
                {cardData.map((card, index) => (
                    <div
                        key={index}
                        className="col-lg-4 mt-2"

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
            {/* <CreateSurveyPage
                visible={isModalVisible}
                onClose={handleCancel}
            /> */}
        </div>
    );
};
