import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/nav/nav"; // Updated to Navbar
import Login from "./components/login/login";
import Home from "./components/home/home";
import Register from "./components/Registration/Register";
import StudentProfile from "./components/profile/StudentProfile";
import TeacherProfile from "./components/profile/Teachercomponents/profile/TeacherProfile";
import AddClass from "./components/profile/Teachercomponents/manageclasses/AddClass";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar /> {/* Use Navbar correctly */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/StudentProfile" element={<StudentProfile />} />
          <Route path="/TeacherProfile" element={<TeacherProfile />} />
          <Route path="/TeacherProfile/addclass" element={<AddClass />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
