package com.attendance.myapp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.attendance.myapp.models.Course;
import com.attendance.myapp.models.Teacher;
import com.attendance.myapp.repositories.ClassRepository;
import com.attendance.myapp.repositories.TeacherRepository;

@Service
public class TeacherService {

	@Autowired
	private TeacherRepository teacherRepository;
	
	private ClassRepository classRepository;
	

	public TeacherService(TeacherRepository teacherRepository) {
		this.teacherRepository = teacherRepository;
	}

	public Teacher saveTeacher(Teacher teacher) {
		return teacherRepository.save(teacher);
	}

	public Teacher findByEmailIdAndpassword(String email, String password) {
		// TODO Auto-generated method stub
		return teacherRepository.findByEmailAndPassword(email, password);
	}

	public List<String> fetchCourses(int id) {

		return teacherRepository.fetchCoursesByTid(id);
	}

	public List<String> getAllCourses() {
		return teacherRepository.getAllCourses();
	}

	public List<String> getSubjectsByCourseAndSemester(String course, int semester) {
		
		return teacherRepository.getSubjectsByCourseAndSemester(course, semester);
	}

	public List<String> getSubjectsByCourseIdAndId(long courseId, int id) {
		
		return teacherRepository.getSubjectNamesBycourseIdAndTeacherId(courseId, id);
	}
}
