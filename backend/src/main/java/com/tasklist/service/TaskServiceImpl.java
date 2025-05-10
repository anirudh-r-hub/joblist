package com.tasklist.service;

import com.tasklist.model.Task;
import com.tasklist.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;
    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(Long id, Task updatedTask) {
        Optional<Task> optionalTask=taskRepository.findById(id);
        if(optionalTask.isPresent()){
            Task task=optionalTask.get();
            task.setCompany(updatedTask.getCompany());
            task.setJob(updatedTask.getJob());
            task.setDateApplied(updatedTask.getDateApplied());
            return taskRepository.save(task);
        }
        else {
            throw new RuntimeException("Task not found with id " + id);
        }
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
