package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Student;
import com.example.backend.repository.StudentRepository;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private StudentRepository studentRepository;

    // REGISTER
    public Student register(Student student) {
        return studentRepository.save(student);
    }

    // LOGIN
    public Student login(String email, String password) {
        Optional<Student> user = studentRepository.findByEmail(email);

        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user.get();
        } else {
            throw new RuntimeException("Invalid Credentials");
        }
    }
}