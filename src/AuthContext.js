import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { jwtDecode } from "jwt-decode";
import useTokenCheck from './TokenCheck';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userCategories, setUserCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  const syncAuthState = useCallback(() => {
    const token = localStorage.getItem("accessToken");

    // console.log("Token from localStorage:", token);

    if (token) {
      try {
        const decoded = jwtDecode(token);

        // console.log("Decoded Token:", decoded);
        setIsAuthenticated(true);
        setUserCategories((decoded.categories));
        setUserRole(decoded.role);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.log("No token found, logging out user.");
      setIsAuthenticated(false);
      setUserCategories([]);
      setUserRole(null);
    }
  }, []);

  useEffect(() => {
    syncAuthState();
    setLoading(false);
  }, [syncAuthState]);

  useTokenCheck(isAuthenticated);

  const hasAccess = (requiredCategory) => {
    // return userCategories.includes(requiredCategory);
    return userRole === "Admin" || userCategories.includes(requiredCategory);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      userCategories,
      userRole,
      hasAccess,
      syncAuthState
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;