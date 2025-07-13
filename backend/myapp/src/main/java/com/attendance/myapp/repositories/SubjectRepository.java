package com.attendance.myapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.attendance.myapp.models.Subjects;

public interface SubjectRepository extends JpaRepository<Subjects, Long> {
	Subjects findBySubjectName(String subject_name);

	@Query(value = "select semester from subjects where subject_name = :subject", nativeQuery = true)
	int findSemesterBySubjectName(String subject);

	@Query(value = "select subject_id, subject_name from subjects where course_id = :courseId and semester = :semester", nativeQuery = true)
	List<String> subjectMapping(int courseId, int semester);
}
