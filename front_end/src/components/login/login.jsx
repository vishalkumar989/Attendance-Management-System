import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [userType, setUserType] = useState("Student");
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const valueHandler = (e) => {
    const { name, value } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  const handleToggle = (type) => {
    setUserType(type);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginDetails);
    if (userType === "Student") {
      axios
        .post("http://localhost:8080/student/login", loginDetails)
        .then((Response) => {
          setResponseMessage(Response.data);
          console.log(Response.data);
          if (Response.data) {
            navigate("/StudentProfile", { state: Response.data });
          } else {
            alert("Wrong email and password");
          }
        })
        .catch((error) => {
          console.error("Error sending data:", error);
          setResponseMessage("Error sending data");
        });
    } else {
      axios
        .post("http://localhost:8080/login", loginDetails)
        .then((Response) => {
          setResponseMessage(Response.data);
          if (Response.data) {
            navigate("/TeacherProfile", { state: Response.data });
          } else {
            alert("Wrong email and password");
          }
        })
        .catch((error) => {
          console.error("Error sending data:", error);
          setResponseMessage("Error sending data");
        });
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <h1>Login for Attendance App</h1>
        <p>Effortlessly manage and track attendance in one place.</p>
      </header>

      <div className="toggle-container">
        <button
          className={`toggle-btn ${userType === "Teacher" ? "active" : ""}`}
          onClick={() => handleToggle("Teacher")}
        >
          Teacher
        </button>
        <button
          className={`toggle-btn ${userType === "Student" ? "active" : ""}`}
          onClick={() => handleToggle("Student")}
        >
          Student
        </button>
      </div>

      <div className="form-container">
        {userType === "Teacher" ? (
          <TeacherLoginForm
            loginDetails={loginDetails}
            valueHandler={valueHandler}
            handleSubmit={handleSubmit}
          />
        ) : (
          <StudentLoginForm
            loginDetails={loginDetails}
            valueHandler={valueHandler}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

// Teacher Login Form Component
const TeacherLoginForm = ({ loginDetails, valueHandler, handleSubmit }) => (
  <form className="login-form" onSubmit={handleSubmit}>
    <h2>Teacher Login</h2>
    <input
      type="email"
      placeholder="Email"
      name="email"
      value={loginDetails.email}
      onChange={valueHandler}
      required
    />
    <input
      type="password"
      placeholder="Password"
      name="password"
      value={loginDetails.password}
      onChange={valueHandler}
      required
    />
    <button type="submit">Login</button>
    <p className="account-message">
      Don't have an account? <a href="/register">Register here</a>
    </p>
  </form>
);

// Student Login Form Component
const StudentLoginForm = ({ loginDetails, valueHandler, handleSubmit }) => (
  <form className="login-form" onSubmit={handleSubmit}>
    <h2>Student Login</h2>
    <input
      type="email"
      placeholder="Email"
      name="email"
      value={loginDetails.email}
      onChange={valueHandler}
      required
    />
    <input
      type="password"
      placeholder="Password"
      name="password"
      value={loginDetails.password}
      onChange={valueHandler}
      required
    />
    <button type="submit">Login</button>
    <p className="account-message">
      Don't have an account? <a href="/register">Register here</a>
    </p>
  </form>
);

export default Login;
