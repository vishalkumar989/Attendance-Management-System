package com.attendance.myapp.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "courses")
public class Course {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "course_id")
	private long course_id;
	
	@Column(name = "course_name")
	private String courseName;
	
	@Column(name = "course_duration")
	private String course_duration;

	public long getCourse_id() {
		return course_id;
	}

	public void setCourse_id(long course_id) {
		this.course_id = course_id;
	}

	public String getcourseName() {
		return courseName;
	}

	public void setcourseName(String courseName) {
		this.courseName = courseName;
	}

	public String getCourse_duration() {
		return course_duration;
	}

	public void setCourse_duration(String course_duration) {
		this.course_duration = course_duration;
	}

	@Override
	public String toString() {
		return "Course [course_id=" + course_id + ", courseName=" + courseName + ", course_duration="
				+ course_duration + "]";
	}
	
	
}
