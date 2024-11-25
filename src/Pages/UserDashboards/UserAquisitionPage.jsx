
import React from 'react';
import SidebarAdmin from '../../Layout/Sidebar/Index';
import HeaderAdmin from '../../Layout/Header/Index';
import './UserDashboard.css'
import { UserAquisitionCards } from '../../Components/UserDashboards/UserAquisitionAndRetention/UserAquisitionCards';
import UserAquisitionGraphs from '../../Components/UserDashboards/UserAquisitionAndRetention/UserAquisitionGraphs';
import UserAquisitionSecondGraphs from '../../Components/UserDashboards/UserAquisitionAndRetention/UserAquisitionSecondGraph';

const UserAquisitionPage = () => {
    
    return (
        <>
            <SidebarAdmin />
            <HeaderAdmin />
            <div className="main-wrapper">
                <UserAquisitionCards />
                <UserAquisitionGraphs/>
                <UserAquisitionSecondGraphs/>
            </div>
        </>
    )
}

export default UserAquisitionPage;