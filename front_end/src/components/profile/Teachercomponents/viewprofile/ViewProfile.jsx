import React from "react";
import "./ViewProfile.css";

const ViewProfile = ({ loginData }) => {
  // console.log("Login data:", loginData);
  const teacherData = {
    name: loginData.fullName,
    email: loginData.email,
    teacherId: loginData.id,
    subject: "Mathematics",
    phone: "+1234567890",
    address: "123 Main St, City, Country",
    photo: "https://via.placeholder.com/150", // Placeholder for profile photo
    bio: "Passionate educator with over 10 years of experience in teaching mathematics. Dedicated to fostering a positive learning environment.",
  };

  return (
    <div className="view-profile-container">
      <h2 className="profile-title">Teacher Profile</h2>
      <div className="profile-card">
        <img src={teacherData.photo} alt="Profile" className="profile-photo" />
        <div className="profile-info">
          <h3 className="profile-name">{teacherData.name}</h3>
          <p className="profile-bio">{teacherData.bio}</p>
          <div className="profile-details">
            <p className="profile-detail">
              <strong>Email:</strong> {teacherData.email}
            </p>
            <p className="profile-detail">
              <strong>Teacher ID:</strong> {teacherData.teacherId}
            </p>
            <p className="profile-detail">
              <strong>Subject:</strong> {teacherData.subject}
            </p>
            <p className="profile-detail">
              <strong>Phone:</strong> {teacherData.phone}
            </p>
            <p className="profile-detail">
              <strong>Address:</strong> {teacherData.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
