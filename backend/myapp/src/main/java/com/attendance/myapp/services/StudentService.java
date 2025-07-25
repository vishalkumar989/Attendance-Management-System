package com.attendance.myapp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.attendance.myapp.models.Course;
import com.attendance.myapp.models.Student;
import com.attendance.myapp.repositories.CourseRepository;
import com.attendance.myapp.repositories.StudentRepository;
import com.attendance.myapp.repositories.SubjectRepository;

@Service
public class StudentService {

	@Autowired
	StudentRepository studentRepository;

	@Autowired
	CourseRepository courseRepository;
	@Autowired
	SubjectRepository subjectRepository;

	public Student saveStudent(Student student, String courseName) {
		Course course = courseRepository.findByCourseName(courseName);
		student.setCourse_id(course.getCourse_id());
		return studentRepository.save(student);
	}

	public List<String> fetchStudentByCourseIdAndSemester(String course, String subject) {
		
		int courseId = courseRepository.findCourseIdByCourseName(course);
		int semester = subjectRepository.findSemesterBySubjectName(subject);
		return studentRepository.findStudentByCourseIdAndSemester(courseId, semester); 
	}

	public Student findByEmailAndPassword(String email, String password) {
		// TODO Auto-generated method stub
		return studentRepository.findByEmailAndPassword(email, password);
	}

	public List<String> subjectMapping(int courseId, int semester) {
		// TODO Auto-generated method stub
		return subjectRepository.subjectMapping(courseId, semester);
	}
}
