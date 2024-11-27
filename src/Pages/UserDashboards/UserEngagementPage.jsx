
import React from 'react';
import SidebarAdmin from '../../Layout/Sidebar/Index';
import HeaderAdmin from '../../Layout/Header/Index';
import './UserDashboard.css'
import { UserEngagementCards } from '../../Components/UserDashboards/UserEngagement/UserEngagementCards';
import { UserEngagementChart } from '../../Components/UserDashboards/UserEngagement/UserEngagementChart';
import { UserEngagementList } from '../../Components/UserDashboards/UserEngagement/UserEngagementList';


const UserEngagementPage = () => {
    
    return (
        <>
            <SidebarAdmin />
            <HeaderAdmin />
            <div className="main-wrapper">
               <div  className='container'>
               <UserEngagementCards/>
               <UserEngagementChart/>
               <UserEngagementList/>
               </div>
            </div>
        </>
    )
}

export default UserEngagementPage;