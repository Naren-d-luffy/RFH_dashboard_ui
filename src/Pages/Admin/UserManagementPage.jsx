import React from 'react';
import SidebarAdmin from '../../Layout/Sidebar/Index';
import HeaderAdmin from '../../Layout/Header/Index';
import UserManagementCards from '../../Components/Admin/UserManagement/UserManagementCards';
import UserManagementGraph from '../../Components/Admin/UserManagement/UserManagementGraph';
import UserManagementTable from '../../Components/Admin/UserManagement/UserManagementTable';
import "./admin.css"
const UserManagementPage = () => {
    
    return (
        <>
            <SidebarAdmin />
            <HeaderAdmin />
            <div className="main-wrapper">
                <UserManagementCards />
                <UserManagementGraph/>
                <UserManagementTable/>
            </div>
        </>
    )
}

export default UserManagementPage;