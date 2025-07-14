import React, { useState } from "react";
import TeacherRegisterForm from "../forms/TeacherRegisterForm";
import StudentRegisterForm from "../forms/StudentRegisterForm";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userType, setUserType] = useState("Student");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  // State for teacher and student forms
  const [teacher, setTeacher] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [student, setStudent] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNo: "",
    address: "",
    courseName: "",
    semester: "",
  });

  // Handlers for teacher and student input changes
  const valueHandler = (e) => {
    const { name, value } = e.target;
    setTeacher({
      ...teacher,
      [name]: value,
    });
  };

  const valueHandler2 = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value,
    });
  };

  // Toggle between Teacher and Student registration forms
  const handleToggle = (type) => {
    setUserType(type);
    setResponseMessage(""); // Clear the response message when toggling
  };

  // Handle teacher registration
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:8080/register";
    axios
      .post(url, teacher)
      .then((response) => {
        setResponseMessage("Registration successful! Please log in.");
        console.log(response.data);
        navigate("/login");
      })
      .catch((error) => {
        setResponseMessage(
          "Teacher is already exists. Please try with different details."
        );
      });
  };

  // Handle student registration
  const handleSubmit2 = (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/register-student?courseName=${encodeURIComponent(
      student.courseName
    )}`;
    axios
      .post(url, student)
      .then((response) => {
        setResponseMessage("Registration successful! Please log in.");
        console.log(response.data);
        navigate("/login");
      })
      .catch((error) => {
        setResponseMessage(
          "Student already exists. Please try with different details."
        );
        console.error("Error sending data:", error);
      });
  };

  return (
    <div className="register-container">
      <header className="register-header">
        <h1>Register for Attendance App</h1>
        <p>Create your account to manage and track attendance.</p>
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
        {/* Show response message */}
        {responseMessage && (
          <div
            className={`response-message ${
              responseMessage.includes("successful") ? "success" : "error"
            }`}
          >
            {responseMessage}
          </div>
        )}

        {userType === "Teacher" ? (
          <TeacherRegisterForm
            teacher={teacher}
            valueHandler={valueHandler}
            handleSubmit={handleSubmit}
          />
        ) : (
          <StudentRegisterForm
            student={student}
            valueHandler2={valueHandler2}
            handleSubmit2={handleSubmit2}
          />
        )}
      </div>
    </div>
  );
};

export default Register;
