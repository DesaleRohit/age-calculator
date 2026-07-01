package com.rohit.agecalculator.controller;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rohit.agecalculator.model.AgeResponse;
import com.rohit.agecalculator.service.AgeService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AgeController {

    private final AgeService ageService; // Added 'final' for immutability

    public AgeController(AgeService ageService) {
        this.ageService = ageService;
    }

    @GetMapping("/age")
    public AgeResponse getAge(
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dob) {

        return ageService.calculateAge(dob);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleInvalidDate(IllegalArgumentException ex) {
        // This catches the error from the service and sends the message to the user
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

}