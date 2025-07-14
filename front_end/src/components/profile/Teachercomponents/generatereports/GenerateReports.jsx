import React, { useState, useEffect } from "react";
import axios from "axios";
import AttendanceSheet from "./AttendanceSheet";
import "./GenerateReports.css";

const GenerateReports = ({ loginData }) => {
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch courses from the backend
    axios
      .get("http://localhost:8080/getallcourses", {
        headers: {
          Authorization: `Bearer ${loginData?.token}`,
        },
      })
      .then((response) => {
        console.log("Fetched Courses:", response.data);
        if (Array.isArray(response.data)) {
          setCourses(response.data); // Set the course names array directly
        } else {
          console.error("Unexpected response format:", response.data);
          setError("Unexpected response format. Check API response.");
        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setError("Failed to fetch courses. Please try again later.");
      });
  }, [loginData]);

  useEffect(() => {
    if (selectedCourse) {
      setSubjects([]);
      setSelectedSubject("");
      axios
        .get(
          `http://localhost:8080/teacher/getsubjects?course=${selectedCourse}&id=${loginData.id}`
        )
        .then((response) => {
          setSubjects(response.data);
        })
        .catch((error) => {
          console.error("Error fetching subjects:", error);
          setError("Failed to fetch subjects. Please try again later.");
        });
    }
  }, [selectedCourse, loginData]);

  const handleGenerateReport = () => {
    setLoading(true);
    setError(null);
    axios
      .get("http://localhost:8080/teacher/generateReport", {
        params: {
          course: selectedCourse,
          subject: selectedSubject,
          teacherid: loginData.id,
          startDate: startDate,
          endDate: endDate,
        },
        headers: {
          Authorization: `Bearer ${loginData?.token}`,
        },
      })
      .then((response) => {
        setReportData(response.data);
        // console.log(reportData);
      })
      .catch((error) => {
        console.error("Error generating report:", error);
        setError("Failed to generate report. Please try again.");
      })
      .finally(() => setLoading(false));
  };
  // console.log(reportData);

  return (
    <div className="generate-reports-container">
      <h2>Generate Attendance Reports</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="report-filters">
        <div className="filter-group">
          <label htmlFor="course-select">Course:</label>
          <select
            id="course-select"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select a course</option>
            {courses.map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="subject-select">Subject:</label>
          <select
            id="subject-select"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            disabled={!selectedCourse}
          >
            <option value="">Select a subject</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="start-date">Start Date:</label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="end-date">End Date:</label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <button
        className="generate-button"
        onClick={handleGenerateReport}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Report"}
      </button>
      {reportData && <AttendanceSheet data={reportData} />}
    </div>
  );
};

export default GenerateReports;
