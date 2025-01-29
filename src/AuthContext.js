import React, { createContext, useState, useEffect, useContext } from 'react';
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userCategories, setUserCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  const parseCategories = (categoriesArray) => {
    try {
      // Directly return the categories array as it's already in the correct format
      return Array.isArray(categoriesArray) ? categoriesArray : [];
    } catch (error) {
      console.error('Error parsing categories:', error);
      return [];
    }
  };
  

 
  const syncAuthState = () => {
    const token = localStorage.getItem("accessToken");
    console.log("Token from localStorage:", token);
  
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);
  
        setIsAuthenticated(true);
        setUserCategories(parseCategories(decoded.categories)); 
        setUserRole(decoded.role);
  
        console.log("User Categories:", userCategories);
        console.log("User Role:", userRole);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.log("No token found, logging out user.");
      setIsAuthenticated(false);
      setUserCategories([]);
      setUserRole(null);
    }
  };
  
  


  useEffect(() => {
    syncAuthState();
    setLoading(false);
  }, []);

  const hasAccess = (requiredCategory) => {
    return userCategories.includes(requiredCategory);
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