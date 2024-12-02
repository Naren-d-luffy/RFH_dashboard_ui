
import React from "react";
import "./Feedback.css";
import HeaderAdmin from "../../Layout/Header/Index";
import SidebarAdmin from "../../Layout/Sidebar/Index";
import { UserNegativeFeedback } from "../../Components/Feedback/PatientSurveys/UserNegativeFeedback";

const UserNegativeFeedbackPage = () => {

    return (
        <>
            <HeaderAdmin />
            <SidebarAdmin />
            <div className="main-wrapper">
                <UserNegativeFeedback />
            </div>
        </>
    );
};

export default UserNegativeFeedbackPage;



