package com.attendance.myapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.attendance.myapp.models.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
	Course findByCourseName(String course_name);


	@Query(value = "select course_id from courses where course_name = :course", nativeQuery = true)
	int findCourseIdByCourseName(String course);
}
