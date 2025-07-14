import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import img1 from "../../assets/img1.jpg";
import easyToUseImg from "../../assets/img2.jpg";
import CrossPlatform from "../../assets/CrossPlatform.png";
import AccurateReports from "../../assets/AccurateReports.png";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease-in-out", // Animation easing
      once: true, // Animation triggers only once
    });
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section" data-aos="fade-up">
        <div className="hero-content">
          <h1>Welcome to Our App</h1>
          <p>
            Discover the best way to manage your class attendance and
            performance with our intuitive app.
          </p>
          <button
            className="join-us-btn"
            data-aos="zoom-in"
            onClick={() => {
              navigate("/login");
            }}
          >
            Join Us
          </button>
        </div>
        <div className="hero-image">
          <img src={img1} alt="App overview" />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us" data-aos="fade-right">
        <h2>Why Choose Us?</h2>
        <div className="feature-grid">
          <div className="feature-item" data-aos="zoom-in" data-aos-delay="200">
            <img src={easyToUseImg} alt="Feature 1" />
            <h3>Easy to Use</h3>
            <p>Our app is designed to be intuitive and user-friendly.</p>
          </div>
          <div className="feature-item" data-aos="zoom-in" data-aos-delay="400">
            <img src={AccurateReports} alt="Feature 2" />
            <h3>Accurate Reports</h3>
            <p>Generate accurate attendance and performance reports.</p>
          </div>
          <div className="feature-item" data-aos="zoom-in" data-aos-delay="600">
            <img src={CrossPlatform} alt="Feature 3" />
            <h3>Cross-Platform</h3>
            <p>Use our app on any device, anywhere, anytime.</p>
          </div>
        </div>
      </section>

      {/* What is Our App Section */}
      <section className="what-is-app" data-aos="fade-left" id="about">
        <h2>What is Our App?</h2>
        <div className="app-description">
          <p>
            Our app is a comprehensive solution for managing attendance,
            tracking performance, and generating reports. Whether you're a
            teacher or a student, our app offers powerful tools to simplify your
            tasks.
          </p>
          <p>
            From easy attendance marking to detailed performance reports, our
            app covers it all.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="call-to-action" data-aos="fade-up">
        <h2>Ready to Get Started?</h2>
        <button
          className="join-us-btn"
          data-aos="zoom-in"
          onClick={() => {
            navigate("/login");
          }}
        >
          Join Us Now
        </button>
      </section>
    </div>
  );
};

export default Home;
