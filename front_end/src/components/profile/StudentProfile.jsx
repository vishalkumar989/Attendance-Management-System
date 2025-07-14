import React, { useState, useEffect } from "react";
import ViewStudentProfile from "../profile/StudnentComponents/ViewStudentProfile/ViewStudentProfile";
import ViewAttendance from "../profile/StudnentComponents/ViewAttendance/ViewAttendance";
import ViewReports from "../profile/StudnentComponents/viewReports/ViewReports";
import Logout from "./StudnentComponents/LogOut/LogOut";
import "./StudentProfile.css";
import { useLocation } from "react-router-dom";

const StudentProfile = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);
  const location = useLocation();
  const loginData = location.state;
  console.log(loginData);

  // Set sidebar visibility based on screen size on initial load
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsSidebarVisible(true); // Open sidebar for large screens
    } else {
      setIsSidebarVisible(false); // Close sidebar for small screens
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarVisible(true);
      } else {
        setIsSidebarVisible(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleMenuItemClick = (component) => {
    setActiveComponent(component);

    // Close sidebar only on mobile screens
    if (window.innerWidth < 768) {
      setIsSidebarVisible(false);
    }
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "ViewStudentProfile":
        return <ViewStudentProfile loginData={loginData} />;
      case "ViewAttendance":
        return <ViewAttendance loginData={loginData} />;
      case "ViewReports":
        return <ViewReports loginData={loginData} />;
      case "Logout":
        return <Logout />;
      default:
        return <ViewStudentProfile loginData={loginData} />;
    }
  };

  return (
    <div className="student-profile-wrapper">
      {/* Sidebar */}
      <aside className={`student-sidebar ${isSidebarVisible ? "visible" : ""}`}>
        <button className="sidebar-close-btn" onClick={handleSidebarToggle}>
          ✖ {/* Close Button in the top right */}
        </button>
        <h2 className="sidebar-title">Student Dashboard</h2>
        <ul className="sidebar-menu">
          <li
            className="sidebar-menu-item"
            onClick={() => handleMenuItemClick("ViewStudentProfile")}
          >
            View Profile
          </li>
          <li
            className="sidebar-menu-item"
            onClick={() => handleMenuItemClick("ViewAttendance")}
          >
            View Attendance
          </li>
          <li
            className="sidebar-menu-item"
            onClick={() => handleMenuItemClick("ViewReports")}
          >
            View Reports
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
      <main className="student-profile-content">
        {/* Sidebar Toggle Button (conditionally rendered) */}
        {!isSidebarVisible && (
          <div className="student-sidebar-toggle" onClick={handleSidebarToggle}>
            ☰ {/* Hamburger Icon to open sidebar */}
          </div>
        )}

        {renderActiveComponent()}
      </main>
    </div>
  );
};

export default StudentProfile;
