package com.attendance.myapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.attendance.myapp.models.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
	
    Student findByEmailAndPassword(String email, String password);

    @Query("SELECT s.fullName,s. student_id FROM Student s WHERE s.course_id = :course_id AND s.semester = :semester")
    List<String> findStudentByCourseIdAndSemester(long course_id, int semester);
}
