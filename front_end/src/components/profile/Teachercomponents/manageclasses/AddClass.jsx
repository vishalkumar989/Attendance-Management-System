import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddClass.css";

const AddClass = ({ onSubmit }) => {
  const [newClass, setNewClass] = useState({
    course: "",
    subject: "",
    semester: "",
  });
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    // Fetch courses on component mount
    axios
      .get("http://localhost:8080/getallcourses")
      .then((response) => {
        console.log("Fetched Courses:", response.data);
        setCourses(response.data); // Directly set the courses array
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        alert("Failed to fetch courses. Please try again later.");
      });
  }, []);

  useEffect(() => {
    if (newClass.course && newClass.semester) {
      console.log("Fetching subjects for:", newClass.course, newClass.semester);
      axios
        .get(
          `http://localhost:8080/getsubjects?course=${newClass.course}&semester=${newClass.semester}`
        )
        .then((response) => {
          console.log("Fetched Subjects Response:", response.data);

          // Check if response.data is an array
          if (Array.isArray(response.data)) {
            setSubjects(response.data);
          } else if (response.data.subjects) {
            // If subjects are nested in an object, update accordingly
            setSubjects(response.data.subjects);
          } else {
            console.error("Unexpected data format:", response.data);
            alert("Received unexpected data format for subjects.");
          }
        })
        .catch((error) => {
          console.error("Error fetching subjects:", error);
          alert("Failed to fetch subjects. Please try again later.");
        });
    } else {
      setSubjects([]); // Clear subjects if course or semester is not selected
    }
  }, [newClass.course, newClass.semester]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClass((prevClass) => ({ ...prevClass, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(newClass);
    setNewClass({ course: "", subject: "", semester: "" });
    setSubjects([]);
  };

  return (
    <form className="add-class-form" onSubmit={handleFormSubmit}>
      <select
        name="course"
        value={newClass.course}
        onChange={handleInputChange}
        required
      >
        <option value="" disabled>
          Select Course
        </option>
        {courses.map((course, index) => (
          <option key={index} value={course}>
            {course}
          </option>
        ))}
      </select>

      <select
        name="semester"
        value={newClass.semester}
        onChange={handleInputChange}
        required
      >
        <option value="" disabled>
          Select Semester
        </option>
        {[1, 2, 3, 4, 5, 6].map((sem) => (
          <option key={sem} value={sem}>
            {sem}
          </option>
        ))}
      </select>

      <select
        name="subject"
        value={newClass.subject}
        onChange={handleInputChange}
        required
      >
        <option value="" disabled>
          Select Subject
        </option>
        {subjects.map((subject, index) => (
          <option key={index} value={subject}>
            {subject}
          </option>
        ))}
      </select>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddClass;
