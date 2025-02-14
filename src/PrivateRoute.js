import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ element, requiredCategory }) => {
  const auth = useAuth();

  if (!auth || !auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (!auth.hasAccess(requiredCategory)) {
    return <Navigate to="/admin/Unauthorized" />;
  }

  return element;
};

export default ProtectedRoute;
