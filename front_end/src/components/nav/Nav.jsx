import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const location = useLocation(); // Get the current location (route)

  // Determine if hamburger should be shown based on the route
  const shouldShowHamburgerAndLinks = ["/", "/login", "/register"].includes(
    location.pathname
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSignupSignin = () => {
    setIsSignedUp(!isSignedUp);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Attendance App</h1>

        {/* Conditionally render hamburger icon */}
        {shouldShowHamburgerAndLinks && (
          <button className="navbar-toggle" onClick={toggleMenu}>
            <span
              className={isOpen ? "navbar-icon open" : "navbar-icon"}
            ></span>
          </button>
        )}

        {/* Conditionally render navbar links */}
        {shouldShowHamburgerAndLinks && (
          <div className={`navbar-links ${isOpen ? "active" : ""}`}>
            <a href="/" className="navbar-link">
              Home
            </a>
            <a href="#about" className="navbar-link">
              About
            </a>
            <a
              href="/login"
              className="navbar-link"
              onClick={toggleSignupSignin}
            >
              {isSignedUp ? "Signin" : "Signup"}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
