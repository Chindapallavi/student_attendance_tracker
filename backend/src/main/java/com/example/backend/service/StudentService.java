package com.example.backend.service;

import org.springframework.stereotype.Service;
import java.util.List;
import com.example.backend.model.Student;
import com.example.backend.repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository repo;

    public StudentService(StudentRepository repo) {
        this.repo = repo;
    }

    public List<Student> getAllStudents() {
        return repo.findAll();
    }

    public Student addStudent(Student student) {
        return repo.save(student);
    }
}