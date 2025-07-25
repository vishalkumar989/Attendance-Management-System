package com.attendance.myapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.attendance.myapp.models.Attendance;
import com.attendance.myapp.models.Course;
import com.attendance.myapp.models.Student;
import com.attendance.myapp.models.Teacher;
import com.attendance.myapp.repositories.CourseRepository;
import com.attendance.myapp.services.AttendanceService;
import com.attendance.myapp.services.StudentService;
import com.attendance.myapp.services.TeacherService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@CrossOrigin(origins = { "http://localhost:5173", // Local frontend URL
		"https://s7rl96t9-5173.inc1.devtunnels.ms/", // Tunnel URL
		"http://192.168.41.48:5173" // Local IP-based URL for frontend
})
public class StudentController {

	@Autowired
	StudentService studentService;
	@Autowired
	TeacherService teacherService;
	@Autowired
	AttendanceService attendanceService;
	@Autowired
	CourseRepository courseRepository;

	@PostMapping("register-student")
	public String registerStudent(@RequestBody Student student, @RequestParam String courseName) {
		System.out.println(student);
		System.out.println(courseName);
		Student savedStudent = studentService.saveStudent(student, courseName);
		System.out.println(savedStudent);
		if (savedStudent != null) {
			return "success";
		}
		return null;
	}

	@PostMapping("/student/login")
	public Student studentLogin(@RequestBody Student loginDetails) {

		Student student = studentService.findByEmailAndPassword(loginDetails.getEmail(), loginDetails.getPassword());
		System.out.println(student);
		System.out.println("hello");
		if (student != null) {
			student.setPassword(null); // Ensure password is not returned
			return student;
		}
		return null;
	}

	@GetMapping("/teacher/students")
	public List<String> fetchStudents(@RequestParam String course, @RequestParam String subject) {
		List<String> students = studentService.fetchStudentByCourseIdAndSemester(course, subject);
		return students; // Return the list of students
	}

	@GetMapping("/student/getsubjects")
	public List<String> getSubjects(@RequestParam Integer course, @RequestParam Integer semester) {
		String coursename = null;
		switch (course) {
		case 1:
			coursename = "mca";
			break;
		case 2:
			coursename = "mba";
			break;
		case 3:
			coursename = "bca";
			break;
		case 4:
			coursename = "bba";
			break;
		default:
			throw new IllegalArgumentException("Invalid course ID: " + course);
		}
		List<String> subjects = teacherService.getSubjectsByCourseAndSemester(coursename, semester);
		return subjects;
	}

	@GetMapping("/student/attendance")
	public List<Attendance> fetchStudentAttendance(@RequestParam int studentId) {
		List<Attendance> attendancedata = attendanceService.findBYStudentId(studentId);
		System.out.println(attendancedata);
		return attendancedata;
	}
	@GetMapping("/student/subjectMapping")
	public List<String> subjectMapping(@RequestParam int courseId, @RequestParam int semester) {
		return studentService.subjectMapping(courseId, semester);
	}
	

}
