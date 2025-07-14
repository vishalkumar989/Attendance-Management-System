import React, { useEffect, useState } from "react";
import axios from "axios";
import AddClass from "./AddClass"; // Import the AddClass component
import "./ManageClasses.css";

const ManageClasses = ({ loginData }) => {
  const [courses, setCourses] = useState([]); // Array of course names
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);

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
            const [courseName, subjectName, semester] = item.split(",");
            return {
              name: courseName,
              subjects: [
                { name: subjectName, semester: semester, totalStudents: 0 },
              ], // Include semester
            };
          });
          setCourses(transformedCourses);
          console.log(courses);
        })
        .catch((error) => console.error("Error fetching courses:", error));
    }
  }, [loginData, refresh]);

  const handleAddClassClick = () => {
    setShowForm(true);
  };

  const handleAddClassSubmit = (newClass) => {
    console.log("New Class Object:", newClass);
    console.log("Courses Array:", courses);

    const classExists = courses.some((course) => {
      if (course.name === newClass.course) {
        return course.subjects.some((subject) => {
          console.log(
            "Checking Subject:",
            subject.name,
            "with New Class Subject:",
            newClass.subject
          );
          return subject.name === newClass.subject;
        });
      }
      return false;
    });
    if (classExists) {
      alert("Class already exists");
    } else {
      // alert("Class does not exist");
      if (loginData && loginData.id) {
        const url = `http://localhost:8080/teacher/addclass?id=${encodeURIComponent(
          loginData.id
        )}`;
        axios
          .post(url, newClass)
          .then((response) => {
            setShowForm(false);
            setRefresh((prev) => !prev); // Trigger re-fetch to update the courses list
            alert("Class added successfully!");
          })
          .catch((error) => {
            console.error("Error adding class:", error);
            alert("Failed to add class. Please try again.");
          });
      }
    }
  };

  return (
    <div className="manage-classes-container">
      <header className="manage-classes-header">
        <h2>Your Courses</h2>
        <button className="btn add-class-btn" onClick={handleAddClassClick}>
          + Add Course
        </button>
      </header>

      <div className="course-cards">
        {courses.map((course, index) => (
          <div key={index} className="course-card">
            <h3 className="course-name">{course.name}</h3>
            <div className="subjects-list">
              {course.subjects && course.subjects.length > 0 ? (
                course.subjects.map((subject, idx) => (
                  <div className="subject-card" key={idx}>
                    <h4>{subject.name}</h4>
                    {/* <p>Total Students: {subject.totalStudents}</p> */}
                    {/* <p>Semester: {courses.semester}</p> */}
                  </div>
                ))
              ) : (
                <p>No subjects available</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <AddClass onSubmit={handleAddClassSubmit} /> // Pass the submit handler
      )}
    </div>
  );
};

export default ManageClasses;
