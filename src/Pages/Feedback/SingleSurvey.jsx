import React from "react";
import "./Feedback.css";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import SingleSurveyCards from "../../Components/Feedback/CreateSurvey/SingleSurveyCards";
import SingleSurveyTable from "../../Components/Feedback/CreateSurvey/SingleSurveyTable";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const SingleSurvey = () => {
    const navigate=useNavigate()
    const handleClick=()=>{
        navigate("/feedback/create-survey")
    }
    return (
        <>
            <HeaderAdmin />
            <SidebarAdmin />
            <div className="main-wrapper">
                <SingleSurveyCards />
                <SingleSurveyTable />
                <div className='d-flex justify-content-start mt-5'>
                    <button className="d-flex gap-2 align-items-center export-button" onClick={handleClick}>
                        <FaAngleLeft />
                        Back
                    </button>
                </div>
            </div>
        </>
    );
};

export default SingleSurvey;

