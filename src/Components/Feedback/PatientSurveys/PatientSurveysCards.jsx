import React from 'react';
import { PiSmileySadFill } from 'react-icons/pi';
import total_survey_icon from '../../../Assets/Icons/total_survey_icon.png'
import total_feedback_icon from '../../../Assets/Icons/total_feedback_icon.png'
import { BsFillEmojiSmileFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const PatientSurveysCards = () => {
    const navigate = useNavigate()

    const cardData = [
        {
            heading: 'Total Feedback',
            value: '8,000',
            percentage: '+8%',
            description: 'Since last Week',
            icon: <img src={total_feedback_icon} alt="Profile Tick" style={{ width: '22px', height: '22px' }} />,
            changeType: 'up',
            iconBg: '#e6fff5',
            iconColor: '#59B29F',
            boxShadowColor: '#59B29F',
        },
        {
            heading: 'Feedback collected',
            value: '1,000',
            percentage: '+340',
            description: 'This Week',
            icon: <img src={total_survey_icon} alt="Profile Tick" style={{ width: '22px', height: '22px', color: "#7EC2FF" }} />,
            changeType: 'up',
            iconBg: '#e6f7ff',
            iconColor: '#7EC2FF',
            boxShadowColor: '#7EC2FF',
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
                    <h3>Patient Feddback</h3>
                    <p >
                        Number of users installed the app by source
                    </p>
                </div>
            </div>
            <div className="row mt-1">
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
                                    {<> {card.percentage} </>}
                                </span>{' '}
                                {card.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default PatientSurveysCards
