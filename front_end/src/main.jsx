import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";

AOS.init({
  duration: 1000, // Duration of animations
  easing: "ease-in-out", // Easing style
  once: true, // Whether animation happens only once
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
