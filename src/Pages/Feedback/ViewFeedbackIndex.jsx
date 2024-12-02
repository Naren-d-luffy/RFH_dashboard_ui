import React from "react";
import "./Feedback.css";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import { ViewFeedBack } from "../../Components/Feedback/PatientSurveys/ViewFeedback";

const ViewFeedbackIndex = () => {
    
    return (
        <>
            <HeaderAdmin />
            <SidebarAdmin />
            <div className="main-wrapper">
                <ViewFeedBack/>
            </div>
        </>
    );
};

export default ViewFeedbackIndex;


