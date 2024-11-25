
import React from 'react';
import SidebarAdmin from '../../Layout/Sidebar/Index';
import HeaderAdmin from '../../Layout/Header/Index';
import { UserAquisitionCards } from '../../Components/UserDashboards/UserAquisitionAndRetention/UserAquisitionCards';

const UserAquisitionPage = () => {
    
    return (
        <>
            <SidebarAdmin />
            <HeaderAdmin />
            <div className="main-wrapper">
                <UserAquisitionCards />
            </div>
        </>
    )
}

export default UserAquisitionPage;