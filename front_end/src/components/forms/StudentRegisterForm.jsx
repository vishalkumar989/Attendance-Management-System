import React from "react";

const StudentRegisterForm = ({ student, valueHandler2, handleSubmit2 }) => (
  <form className="register-form" onSubmit={handleSubmit2}>
    <h2>Student Registration</h2>
    <input
      type="text"
      placeholder="Full Name"
      name="fullName"
      onChange={valueHandler2}
      value={student.fullName}
      required
    />
    <input
      type="email"
      placeholder="Email"
      name="email"
      onChange={valueHandler2}
      value={student.email}
      required
    />
    <input
      type="text"
      placeholder="Phone Number"
      name="phoneNo"
      onChange={valueHandler2}
      value={student.phoneNo}
      required
    />
    <input
      type="password"
      placeholder="Password"
      name="password"
      onChange={valueHandler2}
      value={student.password}
      required
    />
    <input
      type="password"
      placeholder="Confirm Password"
      name="confirmPassword"
      onChange={valueHandler2} // This was missing
      value={student.confirmPassword} // Corrected to bind confirmPassword instead of password
      required
    />
    <input
      type="text  "
      placeholder="Address"
      name="address"
      value={student.address}
      onChange={valueHandler2}
      required
    />

    {/* Dropdown for Course */}
    <select
      name="courseName" // Changed from address to courseName
      onChange={valueHandler2}
      value={student.courseName} // Ensure this field exists in your student state
      required
    >
      <option value="">-- Select Course --</option>
      <option value="MCA">MCA</option>
      <option value="BCA">B.tech</option>
      <option value="MBA">MBA</option>
      <option value="BBA">BBA</option>
    </select>
    <br />
    <select
      name="semester" // Changed from address to courseName
      onChange={valueHandler2}
      value={student.semester} // Ensure this field exists in your student state
      required
    >
      <option value="">-- Select Course --</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
    </select>
    <br />
    <button type="submit">Register</button>
    <p className="account-message">
      Already have an account? <a href="/login">Sign In</a>
    </p>
  </form>
);

export default StudentRegisterForm;
