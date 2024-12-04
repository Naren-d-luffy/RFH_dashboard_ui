import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../Layout/Sidebar/Index";
import HeaderAdmin from "../Layout/Header/Index";

const Layout = () => {
  return (
    <>
      <SidebarAdmin />
      <HeaderAdmin />
      <div className="main-wrapper">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
