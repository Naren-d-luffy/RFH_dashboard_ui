import React from "react";
import "./Feedback.css";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import PatientSurveysCards from "../../Components/Feedback/PatientSurveys/PatientSurveysCards";
import PatientSurveysGraph from "../../Components/Feedback/PatientSurveys/PatientSurveysGraph";
import PatientSurveysTable from "../../Components/Feedback/PatientSurveys/PatientSurveysTable";

const PatientSurveys = () => {
    
    return (
        <>
            <HeaderAdmin />
            <SidebarAdmin />
            <div className="main-wrapper">
                <PatientSurveysCards/>
                <PatientSurveysGraph/>
                <PatientSurveysTable/>
            </div>
        </>
    );
};

export default PatientSurveys;


