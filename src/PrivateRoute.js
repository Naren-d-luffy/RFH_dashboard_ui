import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ element:Element, requiredCategory }) => {
  const auth = useAuth();

  if (!auth || !auth.isAuthenticated) {
    // return <Navigate to="/" />;
    console.log("wrong")
  }

  if (!auth.hasAccess(requiredCategory)) {
    return <Navigate to="/admin/Unauthorized" />;
  }

  return <Element/>;
};

export default ProtectedRoute;
