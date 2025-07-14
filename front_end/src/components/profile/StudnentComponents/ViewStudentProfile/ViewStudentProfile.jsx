import React from "react";
import "./ViewStudentProfile.css";

const ViewStudentProfile = ({ loginData }) => {
  // Assuming loginData contains the student details
  const student = {
    profilePic: "https://via.placeholder.com/150", // Replace with actual image URL
    name: loginData.fullName, // Full name from loginData
    rollNumber: loginData.student_id, // Student ID from loginData
    email: loginData.email, // Email from loginData
    phone: loginData.phoneNo, // Phone number from loginData
    address: loginData.address || "Not provided", // Address from loginData, or fallback
    course: loginData.course_id === 1 ? "Mca" : "Unknown Course", // Assuming course_id 1 is BCA
    semester: loginData.semester, // Semester from loginData
    attendance: "80%", // Sample attendance data, replace with actual data if available
  };

  return (
    <div className="profile-section">
      {/* Profile Header */}
      <header className="profile-header">
        <img src={student.profilePic} alt="Profile" className="profile-pic" />
        <div className="header-details">
          <h2>{student.name}</h2>
          <p className="profile-subtext">
            {student.course} - {student.semester} Semester
          </p>
          <div className="badge">Active Student</div>
        </div>
      </header>

      {/* Profile Information */}
      <div className="profile-info">
        <div className="info-section">
          <h3>Student Details</h3>
          <p>
            <strong>Roll Number:</strong> {student.rollNumber}
          </p>
          <p>
            <strong>Email:</strong> {student.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {student.phone}
          </p>
          <p>
            <strong>Address:</strong> {student.address}
          </p>
          <p>
            <strong>Overall Attendance:</strong>{" "}
            <span
              className={`attendance ${
                parseFloat(student.attendance) >= 75 ? "good" : "poor"
              }`}
            >
              {student.attendance}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewStudentProfile;
