import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StudentsAttendance.css";

const StudentCard = ({ student, attendanceStatus, onAttendanceChange }) => (
  <div className="student-card">
    <p>Name: {student.name}</p>
    <p>ID: {student.id}</p>
    <label>
      <input
        type="radio"
        checked={attendanceStatus === true}
        onChange={() => onAttendanceChange(student.id, true)}
      />
      Present
    </label>
    <label>
      <input
        type="radio"
        checked={attendanceStatus === false}
        onChange={() => onAttendanceChange(student.id, false)}
      />
      Absent
    </label>
  </div>
);

const StudentsAttendance = ({ course, subject, loginData, onBackClick }) => {
  const [students, setStudents] = useState([]);
  const [attendanceMode, setAttendanceMode] = useState("view");
  const [attendanceData, setAttendanceData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (attendanceMode === "take") {
      fetchStudents();
    } else if (attendanceMode === "view") {
      fetchTodayAttendance();
    }
  }, [attendanceMode]);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:8080/teacher/students",
        {
          params: { course, subject },
        }
      );
      const formattedStudents = response.data.map((studentString) => {
        const [name, id] = studentString.split(",");
        return { id: parseInt(id, 10), name: name.trim() };
      });
      setStudents(formattedStudents);
    } catch (err) {
      setError("Failed to fetch students.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTodayAttendance = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:8080/teacher/todayAttendance",
        {
          params: { course, subject },
        }
      );
      if (response.data && Array.isArray(response.data)) {
        const formattedData = response.data.reduce((acc, record) => {
          acc[record.studentId] = record.status === "Present";
          return acc;
        }, {});
        setAttendanceData(formattedData);
      } else {
        setError("No attendance data found.");
      }
    } catch (err) {
      setError("Failed to fetch today's attendance.");
      alert("Attendance is not taken yet!");
    } finally {
      setLoading(false);
    }
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      [studentId]: status,
    }));
  };

  const submitAttendance = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.post("http://localhost:8080/teacher/updateAttendance", {
        course,
        subject,
        attendance: attendanceData,
        teacherId: loginData.id,
      });
      alert("Attendance successfully submitted!");
      setAttendanceMode("view");
    } catch (err) {
      setError("Error submitting attendance.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled = Object.keys(attendanceData).length === 0 || loading;

  return (
    <div className="students-attendance-container">
      <button className="btn back-button" onClick={onBackClick}>
        Back
      </button>
      <h3>
        {attendanceMode === "take" ? "Take Attendance" : "View Attendance"} for{" "}
        {subject} in {course}
      </h3>

      <div className="action-buttons">
        <button
          className="btn"
          onClick={() => setAttendanceMode("take")}
          disabled={loading}
        >
          Take Attendance
        </button>
        <button
          className="btn"
          onClick={() => setAttendanceMode("view")}
          disabled={loading}
        >
          View Attendance
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="students-list">
          {attendanceMode === "take" && students.length > 0 ? (
            students.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                attendanceStatus={attendanceData[student.id]}
                onAttendanceChange={handleAttendanceChange}
              />
            ))
          ) : attendanceMode === "view" &&
            Object.keys(attendanceData).length > 0 ? (
            Object.entries(attendanceData).map(([studentId, isPresent]) => (
              <div key={studentId} className="student-card">
                <p>ID: {studentId}</p>
                <p>Status: {isPresent ? "Present" : "Absent"}</p>
              </div>
            ))
          ) : (
            <p>No students or attendance data available.</p>
          )}
        </div>
      )}

      {attendanceMode === "take" && students.length > 0 && (
        <button
          className="btn submit-button"
          onClick={submitAttendance}
          disabled={isSubmitDisabled}
        >
          Submit Attendance
        </button>
      )}
    </div>
  );
};

export default StudentsAttendance;
