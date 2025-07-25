package com.attendance.myapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.attendance.myapp.models.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {

	Teacher findByEmailAndPassword(String email, String password);

	@Query(value = "select c.course_name, s.subject_name from courses c join course_allot ca on c.course_id = ca.course_id join subjects s on s.subject_id = ca.subject_id where id = :id", nativeQuery = true)
	List<String> fetchCoursesByTid(int id);

	@Query(value = "SELECT course_name FROM courses", nativeQuery = true)
	List<String> getAllCourses();

	@Query(value = "SELECT s.subject_name FROM subjects s JOIN courses c ON s.course_id = c.course_id WHERE c.course_name = :course AND s.semester = :semester", nativeQuery = true)
	List<String> getSubjectsByCourseAndSemester(String course, int semester);

	@Query(value = "SELECT s.subject_name FROM subjects s JOIN course_allot ca ON s.subject_id = ca.subject_id WHERE ca.course_id = :courseId AND ca.id = :id", nativeQuery = true)
	List<String> getSubjectNamesBycourseIdAndTeacherId(long courseId, int id);
}