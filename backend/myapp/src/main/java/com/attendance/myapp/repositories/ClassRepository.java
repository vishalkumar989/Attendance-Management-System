package com.attendance.myapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.attendance.myapp.models.CourseAllot;

public interface ClassRepository extends JpaRepository<CourseAllot, Long>{

}
