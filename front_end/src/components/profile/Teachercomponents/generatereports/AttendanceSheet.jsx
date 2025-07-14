import React from "react";
import { saveAs } from "file-saver";
import "./AttendanceSheet.css";

const AttendanceSheet = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No report data available.</p>;
  }

  // Extract unique dates for the table header
  const uniqueDates = [...new Set(data.map((record) => record.attendaceDate))];

  // Create a map of student records
  const studentMap = {};
  data.forEach((record) => {
    if (!studentMap[record.studentId]) {
      studentMap[record.studentId] = {
        fullName: record.fullName,
        attendance: {},
      };
    }
    studentMap[record.studentId].attendance[record.attendaceDate] =
      record.status;
  });

  const downloadCSV = () => {
    let csvContent = "Student ID,Student Name," + uniqueDates.join(",") + "\n";

    Object.entries(studentMap).forEach(([studentId, studentData]) => {
      let row = [studentId, studentData.fullName];
      uniqueDates.forEach((date) => {
        row.push(studentData.attendance[date] || "N/A");
      });
      csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "attendance_report.csv");
  };

  return (
    <div className="attendance-sheet-container">
      <h3>Attendance Report</h3>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            {uniqueDates.map((date) => (
              <th key={date}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(studentMap).map(([studentId, studentData]) => (
            <tr key={studentId}>
              <td>{studentId}</td>
              <td>{studentData.fullName}</td>
              {uniqueDates.map((date) => (
                <td key={date}>{studentData.attendance[date] || "N/A"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="download-button" onClick={downloadCSV}>
        Download CSV
      </button>
    </div>
  );
};

export default AttendanceSheet;
