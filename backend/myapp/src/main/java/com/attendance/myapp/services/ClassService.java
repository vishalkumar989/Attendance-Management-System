package com.attendance.myapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.attendance.myapp.models.CourseAllot;
import com.attendance.myapp.repositories.ClassRepository;

@Service
public class ClassService {
	@Autowired
	ClassRepository classrepository;

	public void save(CourseAllot courseAllot) {
		classrepository.save(courseAllot);
	}

}
