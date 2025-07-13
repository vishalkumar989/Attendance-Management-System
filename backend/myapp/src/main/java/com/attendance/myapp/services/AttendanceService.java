package com.attendance.myapp.services;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.attendance.myapp.models.Attendance;
import com.attendance.myapp.models.StudentAttendanceDTO;
import com.attendance.myapp.repositories.AttendanceRepository;

@Service
public class AttendanceService {

	@Autowired
	private AttendanceRepository attendanceRepository;

	// Get today's attendance for a course and subject
	public List<Attendance> getTodayAttendance(Long courseId, Long subjectId, Date date) {
		List<Attendance> attendance = attendanceRepository.findByCourseIdAndSubjectIdAndAttendanceDate(courseId,
				subjectId, date);
		System.out.println(attendance);

		return attendanceRepository.findByCourseIdAndSubjectIdAndAttendanceDate(courseId, subjectId, date);
	}

	// Save attendance records

	@Transactional
	public String saveAttendance(List<Attendance> attendanceList) {
		// Get all unique identifiers from the attendance list
		List<Attendance> duplicates = attendanceList.stream()
				.filter(attendance -> attendanceRepository.existsByStudentIdAndCourseIdAndSubjectIdAndAttendanceDate(
						attendance.getStudentId(), attendance.getCourseId(), attendance.getSubjectId(),
						attendance.getAttendanceDate()))
				.collect(Collectors.toList());

		// Remove duplicates from attendanceList to only save new entries
		List<Attendance> newAttendances = attendanceList.stream().filter(attendance -> !duplicates.contains(attendance))
				.collect(Collectors.toList());

		// Save all attendance records that are not duplicates
		if (!newAttendances.isEmpty()) {
			attendanceRepository.saveAll(newAttendances);
		} else {
			return "All records already exist.";
		}
		return "All unique attendance records saved successfully";
	}

	public List<StudentAttendanceDTO> getAttendanceReport(long courseId, long subjectId, int teacherId,
			java.sql.Date startDate, java.sql.Date endDate) {
		List<Object[]> results = attendanceRepository.findStudentAttendanceByCourseSubjectTeacherAndDate(courseId,
				subjectId, teacherId, startDate, endDate);
		return results.stream().map(result -> {
			StudentAttendanceDTO dto = new StudentAttendanceDTO();
			dto.setStudentId((Long) result[0]);
			dto.setFullName((String) result[1]);
			dto.setStatus((String) result[2]);
			dto.setAttendaceDate((java.sql.Date) result[3]); // Ensure correct type
			return dto;
		}).collect(Collectors.toList());
	}

	public List<Attendance> findBYStudentId(int studentId) {
		
		return attendanceRepository.findByStudentId(studentId);
	}

}
