import React from "react";
import "./Feedback.css";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import PopulatedSurveyData from "../../Components/Feedback/CreateSurvey/PopulatedSurveyData";

const SurveyPopulatedData = () => {
    
    return (
        <>
            <HeaderAdmin />
            <SidebarAdmin />
            <div className="main-wrapper">
                <PopulatedSurveyData/>
            </div>
        </>
    );
};

export default SurveyPopulatedData;


