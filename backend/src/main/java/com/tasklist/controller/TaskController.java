package com.tasklist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.tasklist.service.TaskService;
import com.tasklist.model.Task;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Task> getAllTasks(){
        return taskService.getAllTasks();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task){
        return taskService.createTask(task);
    }
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id,@RequestBody Task task){
        return taskService.updateTask(id,task);
    }
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id){
        taskService.deleteTask(id);
    }
}
