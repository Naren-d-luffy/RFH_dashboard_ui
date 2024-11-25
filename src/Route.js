import React, { Component } from 'react'
import {BrowserRouter, Route,Routes,useNavigate} from "react-router-dom"
import UserAquisitionPage from './Pages/UserDashboards/UserAquisitionPage'
export const AppRouter = () => {
  return (
    <BrowserRouter>
   <Routes>
    <Route path="/" element={Component=<UserAquisitionPage/>}/>
   </Routes>
   </BrowserRouter>
  )
}
