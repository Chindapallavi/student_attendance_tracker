package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.backend.model.Student;
import com.example.backend.service.AuthService;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*") // ✅ allow frontend
public class AuthController {

    @Autowired
    private AuthService authService;

    // REGISTER API
    @PostMapping("/register")
    public Student register(@RequestBody Student student) {
        return authService.register(student);
    }

    // LOGIN API
    @PostMapping("/login")
    public Student login(@RequestBody Map<String, String> data) {
        String email = data.get("email");
        String password = data.get("password");

        return authService.login(email, password);
    }
}