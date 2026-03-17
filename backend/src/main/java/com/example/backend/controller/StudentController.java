package com.example.backend.controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.backend.model.Student;
import com.example.backend.service.StudentService;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @GetMapping
    public List<Student> getStudents() {
        return service.getAllStudents();
    }

    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return service.addStudent(student);
    }
}