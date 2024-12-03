import React from 'react'
import { AiOutlineMessage } from 'react-icons/ai'
import { FaAngleRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

const PatientSurveysGraph = () => {
    const navigate=useNavigate();
    const handleClick=()=>{
        navigate("/feedback/negative-feedback")
    }
    const appointmentStatusData = [
        { month: "1/12", completed: 0 },
        { month: "2/12", completed: 80 },
        { month: "3/12", completed: 70 },
        { month: "4/12", completed: 100 },
        { month: "5/12", completed: 180 },
        { month: "6/12", completed: 110 },
        { month: "7/12", completed: 360 },
        { month: "8/12", completed: 320 },
        { month: "9/12", completed: 260 },
        { month: "10/12", completed: 520 },
        { month: "11/12", completed: 480 },
        { month: "12/12", completed: 600 },
    ];
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div
                    style={{
                        backgroundColor: "#000",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        color: "#fff",
                    }}
                >
                    <p>{label}</p>
                    {payload.map((data, index) => (
                        <p key={index}>
                            {data.name}: {data.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };
    return (
        <div className='mt-4'>
            <div className="row">
                <div className='col-lg-4'>
                    <div className="campaign-performance-table-head">
                        <p className="patient-feedbackGraph-hedaer">Negative Feedbacks</p>
                        <div className='d-flex align-items-center gap-2 negative-feedback-p'>
                            <AiOutlineMessage className='fs-4' />
                            <p className='mb-0'>Not Working Properly</p>
                        </div>
                        <div className='d-flex align-items-center gap-2 negative-feedback-p'>
                            <AiOutlineMessage className='fs-4' />
                            <p className='mb-0'>Can't Connect to website</p>
                        </div>
                        <div className='d-flex align-items-center gap-2 negative-feedback-p'>
                            <AiOutlineMessage className='fs-4' />
                            <p className='mb-0'>App Issues</p>
                        </div>
                        <div className="d-flex gap-2 justify-content-start">
                            <button
                                className="d-flex gap-2 align-items-center export-button"
                            onClick={handleClick}
                            >
                                View
                                <FaAngleRight />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="row campaign-performance-table-head">
                        <div className="col-lg-4 ">
                            <div className=' patient-surveyGraph'>
                                <p className="patient-feedbackGraph-hedaer">Monthly Feedbacks</p>
                                <h2 className='mt-4'>5,224</h2>
                                <h3>Last 60 days</h3>
                                <div className='d-flex align-items-center gap-3 monthly-feedback-div'>
                                    <div></div>
                                    <p>You gave a <span style={{color:"var(--primary-green)"}}>15% growth</span> in comparison with previous month.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className='mt-1'>
                                <ResponsiveContainer width="100%" height={220}>
                                    <LineChart data={appointmentStatusData}>
                                        <defs>
                                            <filter id="bottomGreenShadow" x="-20%" y="-20%" width="140%" height="140%">
                                                <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
                                                <feOffset dx="0" dy="8" result="offsetBlur" />
                                                <feFlood floodColor="#28a745" floodOpacity="0.9" />
                                                <feComposite in2="offsetBlur" operator="in" result="colorShadow" />
                                                <feMerge>
                                                    <feMergeNode in="colorShadow" />
                                                    <feMergeNode in="SourceGraphic" />
                                                </feMerge>
                                            </filter>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" tick={{ fontSize: 8 }} />
                                        <YAxis tick={{ fontSize: 10 }} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Line
                                            type="monotone"
                                            dataKey="completed"
                                            stroke="#28a745"
                                            strokeWidth={1.5}
                                            dot={false}
                                            style={{ filter: "url(#bottomGreenShadow)" }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PatientSurveysGraph
