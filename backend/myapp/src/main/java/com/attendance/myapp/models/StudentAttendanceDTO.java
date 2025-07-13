package com.attendance.myapp.models;

import java.sql.Date;

public class StudentAttendanceDTO {
	private Long studentId;
	private String fullName;
	private String status;
	private Date attendaceDate;

	public Long getStudentId() {
		return studentId;
	}

	public void setStudentId(Long studentId) {
		this.studentId = studentId;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getAttendaceDate() {
		return attendaceDate;
	}

	public void setAttendaceDate(Date attendaceDate) {
		this.attendaceDate = attendaceDate;
	}

	@Override
	public String toString() {
		return "StudentAttendanceDTO [studentId=" + studentId + ", fullName=" + fullName + ", status=" + status
				+ ", attendaceDate=" + attendaceDate + "]";
	}

}
