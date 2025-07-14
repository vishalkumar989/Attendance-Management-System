import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

const Logout = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    localStorage.clear();
    sessionStorage.clear(); // If you use sessionStorage
    window.location.replace("/login"); // Replace ensures no history to go back
  };

  const handleCancel = () => {
    // Navigate back to the previous page
    navigate(-1);
  };

  return (
    <div className="logout-container">
      <div className="logout-box">
        <h2>Confirm Logout</h2>
        <p>Are you sure you want to log out of your account?</p>
        <div className="logout-buttons">
          <button className="confirm-btn" onClick={handleConfirm}>
            Yes
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
