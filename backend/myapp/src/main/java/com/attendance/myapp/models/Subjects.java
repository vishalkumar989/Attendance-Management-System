package com.attendance.myapp.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "subjects")
public class Subjects {
	@Id
	@Column(name = "subject_id")
	private long subjectId;
	
	@Column(name = "subject_name")
	private String subjectName;
	
	@Column(name = "course_id")
	private long coursetId;
	
	@Column(name = "semester")
	private long semester;

	public long getSubjectId() {
		return subjectId;
	}

	public void setSubjectId(long subjectId) {
		this.subjectId = subjectId;
	}

	public String getSubjectName() {
		return subjectName;
	}

	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}

	public long getCoursetId() {
		return coursetId;
	}

	public void setCoursetId(long coursetId) {
		this.coursetId = coursetId;
	}

	public long getSemester() {
		return semester;
	}

	public void setSemester(long semester) {
		this.semester = semester;
	}

	@Override
	public String toString() {
		return "Subjects [subjectId=" + subjectId + ", subjectName=" + subjectName + ", coursetId=" + coursetId
				+ ", semester=" + semester + "]";
	}
	
}
