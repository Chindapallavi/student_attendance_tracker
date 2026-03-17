package com.example.backend.controller;

import com.example.backend.model.Attendance;
import com.example.backend.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attendance")
@CrossOrigin(origins = "http://localhost:5173")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    // GET all records
    @GetMapping
    public List<Attendance> getAllAttendance() {
        return attendanceService.getAllAttendance();
    }

    // POST new record
    @PostMapping
    public Attendance addAttendance(@RequestBody Attendance attendance) {
        return attendanceService.saveAttendance(attendance);

    }
    @DeleteMapping("/{id}")
    public void deleteAttendance(@PathVariable Long id) {
        attendanceService.deleteAttendance(id);
}
@PutMapping("/{id}")
public Attendance updateAttendance(@PathVariable Long id, @RequestBody Attendance attendance) {
    attendance.setId(id);
    return attendanceService.saveAttendance(attendance);
}
}