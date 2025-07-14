import React from "react";

const TeacherRegisterForm = ({ teacher, valueHandler, handleSubmit }) => (
  <form className="register-form" onSubmit={handleSubmit}>
    <h2>Teacher Registration</h2>
    <input
      type="text"
      placeholder="Full Name"
      name="fullName"
      value={teacher.fullName}
      onChange={valueHandler}
      required
    />
    <input
      type="email"
      placeholder="Email"
      name="email"
      value={teacher.email}
      onChange={valueHandler}
      required
    />
    <input
      type="password"
      placeholder="Password"
      name="password"
      value={teacher.password}
      onChange={valueHandler}
      required
    />
    <input
      type="password"
      placeholder="Confirm Password"
      name="confirmPassword"
      value={teacher.confirmPassword}
      onChange={valueHandler}
      required
    />
    

    <button type="submit">Register</button>
    <p className="account-message">
      Already have an account? <a href="/login">Sign In</a>
    </p>
  </form>
);

export default TeacherRegisterForm;
