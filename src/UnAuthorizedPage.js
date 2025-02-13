import React from 'react';
import page from "../src/Assets/Images/403.png";

export const UnAuthorizedPage = () => {
  return (
    <div className="unauthorized-container">
      <img src={page} alt="403 Unauthorized" className="unauthorized-image" />
      <h1 className="unauthorized-text">You dont have access to this page or resource</h1>
    </div>
  );
};
