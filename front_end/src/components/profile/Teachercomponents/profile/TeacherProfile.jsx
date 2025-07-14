import React, { useState, useEffect } from "react";
// import ViewProfile from "./ViewProfile";
import ViewProfile from "../viewprofile/ViewProfile";
import ManageClasses from "../manageclasses/ManageClasses";
import ViewAttendance from "../viewattendance/ViewAttendance";
import GenerateReports from "../generatereports/GenerateReports";
import Logout from "../LogOut/LogOut";
import "./TeacherProfile.css";
import { useLocation } from "react-router-dom";

const TeacherProfile = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);
  const location = useLocation();
  const loginData = location.state;
  // console.log(loginData);

  // Set sidebar visibility based on screen size on initial load
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsSidebarVisible(true); // Open sidebar for large screens
    } else {
      setIsSidebarVisible(false); // Close sidebar for small screens
    }

    // Optional: Add event listener to handle window resize dynamically
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarVisible(true);
      } else {
        setIsSidebarVisible(false);
      }
    };
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleMenuItemClick = (component) => {
    setActiveComponent(component);

    // Close sidebar only on mobile screens (less than 768px)
    if (window.innerWidth < 768) {
      setIsSidebarVisible(false);
    }
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "ViewProfile":
        return <ViewProfile loginData={loginData} />;
      case "ManageClasses":
        return <ManageClasses loginData={loginData} />;
      case "ViewAttendance":
        return <ViewAttendance loginData={loginData} />;
      case "GenerateReports":
        return <GenerateReports loginData={loginData} />;
      case "Logout":
        return <Logout />;
      default:
        return <ViewProfile loginData={loginData} />;
    }
  };

  return (
    <div className="teacher-profile-wrapper">
      {/* Sidebar */}
      <aside className={`teacher-sidebar ${isSidebarVisible ? "visible" : ""}`}>
        <button className="sidebar-close-btn" onClick={handleSidebarToggle}>
          ✖ {/* Close Button in the top right */}
        </button>
        <h2 className="sidebar-title">Teacher Dashboard</h2>
        <ul className="sidebar-menu">
          <li
            className="sidebar-menu-item"
            onClick={() => handleMenuItemClick("ViewProfile")}
          >
            View Profile
          </li>
          <li
            className="sidebar-menu-item"
            onClick={() => handleMenuItemClick("ManageClasses")}
          >
            Manage Classes
          </li>
          <li
            className="sidebar-menu-item"
            onClick={() => handleMenuItemClick("ViewAttendance")}
          >
            Attendance Section
          </li>
          <li
            className="sidebar-menu-item"
            onClick={() => handleMenuItemClick("GenerateReports")}
          >
            Generate Reports
          </li>
          <li
            className="sidebar-menu-item"
            onClick={() => handleMenuItemClick("Logout")}
          >
            Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="teacher-profile-content">
        {/* Sidebar Toggle Button (conditionally rendered) */}
        {!isSidebarVisible && (
          <div className="teacher-sidebar-toggle" onClick={handleSidebarToggle}>
            ☰ {/* Hamburger Icon to open sidebar */}
          </div>
        )}

        {renderActiveComponent()}
      </main>
    </div>
  );
};

export default TeacherProfile;
