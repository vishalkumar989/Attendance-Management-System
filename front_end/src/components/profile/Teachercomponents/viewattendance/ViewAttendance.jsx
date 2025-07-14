import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentsAttendance from "./StudentsAttendance"; // Import the StudentsAttendance component
import "./ViewAttendance.css"; // Import the updated CSS

const ViewAttendance = ({ loginData }) => {
  const [courses, setCourses] = useState([]); // Store courses and subjects
  const [selectedSubject, setSelectedSubject] = useState(null); // Track selected subject for fetching students
  const [showStudentsAttendance, setShowStudentsAttendance] = useState(false); // Manage visibility of StudentsAttendance

  useEffect(() => {
    if (loginData && loginData.id) {
      const url = `http://localhost:8080/teacher/courses?id=${encodeURIComponent(
        loginData.id
      )}`;
      axios
        .get(url)
        .then((response) => {
          console.log("API Response:", response.data);
          // Transform response into an object with name and subjects
          const transformedCourses = response.data.map((item) => {
            const [courseName, subjectName] = item.split(",");
            return {
              name: courseName,
              subject: subjectName, // Store subject directly
            };
          });
          setCourses(transformedCourses);
        })
        .catch((error) => console.error("Error fetching courses:", error));
    }
  }, [loginData]);

  const handleSubjectClick = (courseName, subjectName) => {
    setSelectedSubject({ course: courseName, subject: subjectName });
    setShowStudentsAttendance(true); // Show StudentsAttendance component
  };

  const handleBackClick = () => {
    setShowStudentsAttendance(false); // Hide StudentsAttendance component
    setSelectedSubject(null); // Reset selected subject
  };

  return (
    <div className="view-attendance-container">
      <header className="view-attendance-header">
        <h2>View Attendance</h2>
      </header>

      {/* Conditional rendering based on showStudentsAttendance state */}
      {!showStudentsAttendance ? (
        <div className="course-cards">
          {courses.map((course, index) => (
            <div key={index} className="course-card">
              <h3 className="course-name">{course.name}</h3>
              <div
                className="subject-card"
                onClick={() => handleSubjectClick(course.name, course.subject)}
              >
                <h4>{course.subject}</h4>
                <p>Click to view students</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <StudentsAttendance
          course={selectedSubject.course}
          subject={selectedSubject.subject}
          loginData={loginData} // Pass loginData to the StudentsAttendance component
          onBackClick={handleBackClick} // Pass the back click handler
        />
      )}
    </div>
  );
};

export default ViewAttendance;
