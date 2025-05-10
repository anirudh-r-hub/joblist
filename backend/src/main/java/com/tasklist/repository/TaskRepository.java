package com.tasklist.repository;

import com.tasklist.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TaskRepository extends JpaRepository<Task,Long> {
}
