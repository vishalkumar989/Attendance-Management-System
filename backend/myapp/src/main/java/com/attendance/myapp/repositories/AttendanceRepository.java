package com.attendance.myapp.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.attendance.myapp.models.Attendance;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

	List<Attendance> findByCourseIdAndSubjectIdAndAttendanceDate(Long courseId, Long subjectId, Date attendanceDate);

	// Other methods as needed
	boolean existsByStudentIdAndCourseIdAndSubjectIdAndAttendanceDate(Long studentId, Long courseId, Long subjectId,
			Date attendanceDate);

	@Query(value = "SELECT s.student_id, s.full_name, a.status, a.attendance_date "
			+ "FROM students s JOIN attendance a ON s.student_id = a.student_id "
			+ "WHERE a.course_id = :courseId AND a.subject_id = :subjectId "
			+ "AND a.id = :teacherId AND a.attendance_date BETWEEN :startDate AND :endDate", nativeQuery = true)
	List<Object[]> findStudentAttendanceByCourseSubjectTeacherAndDate(@Param("courseId") Long courseId,
			@Param("subjectId") Long subjectId, @Param("teacherId") int teacherId,
			@Param("startDate") java.sql.Date startDate, @Param("endDate") java.sql.Date endDate);

	List<Attendance> findByStudentId(int studentId);

}
