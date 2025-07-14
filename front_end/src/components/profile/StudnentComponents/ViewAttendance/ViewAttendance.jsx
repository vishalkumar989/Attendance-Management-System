import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewAttendance.css";

const ViewAttendance = ({ loginData }) => {
  const [attendance, setAttendance] = useState([]);
  const [subjectMapping, setSubjectMapping] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attendanceRes, subjectMappingRes] = await Promise.all([
          axios.get(
            `http://localhost:8080/student/attendance?studentId=${loginData.student_id}`
          ),
          axios.get(
            `http://localhost:8080/student/subjectMapping?courseId=${loginData.course_id}&semester=${loginData.semester}`
          ),
        ]);

        setAttendance(attendanceRes.data);

        // Parsing logic from your original code
        const parsedMapping = subjectMappingRes.data.reduce((acc, curr) => {
          const [id, name] = curr.split(",");
          acc[id] = name;
          return acc;
        }, {});

        setSubjectMapping(parsedMapping);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [loginData]);

  // Function to calculate attendance statistics for a specific subject
  const calculateAttendance = (subjectId) => {
    const subjectAttendance = attendance.filter(
      (record) => record.subjectId === parseInt(subjectId)
    );

    const totalLectures = new Set(
      subjectAttendance.map((record) => record.attendanceDate)
    ).size;

    const totalPresent = subjectAttendance.filter(
      (record) => record.status === "Present"
    ).length;

    const attendancePercentage =
      totalLectures > 0 ? (totalPresent / totalLectures) * 100 : 0;

    return { totalLectures, totalPresent, attendancePercentage };
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="view-attendance-section">
      <h2>Student Attendance Dashboard</h2>
      <div className="attendance-cards-container">
        {Object.keys(subjectMapping).length > 0 ? (
          Object.entries(subjectMapping).map(([subjectId, subjectName]) => {
            const { totalLectures, totalPresent, attendancePercentage } =
              calculateAttendance(subjectId);

            return (
              <div className="attendance-card" key={subjectId}>
                <h3>{subjectName}</h3>
                <p>Total Lectures: {totalLectures}</p>
                <p>Present: {totalPresent}</p>
                <p>Attendance: {attendancePercentage.toFixed(2)}%</p>
                <div
                  className={`attendance-status ${
                    attendancePercentage >= 75 ? "good" : "poor"
                  }`}
                >
                  {attendancePercentage >= 75
                    ? "Good Attendance"
                    : "Needs Improvement"}
                </div>
              </div>
            );
          })
        ) : (
          <p>No subjects found for your course and semester.</p>
        )}
      </div>
    </div>
  );
};

export default ViewAttendance;
