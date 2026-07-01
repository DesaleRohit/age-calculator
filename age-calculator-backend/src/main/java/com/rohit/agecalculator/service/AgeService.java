package com.rohit.agecalculator.service;

import java.time.LocalDate;
import java.time.Period;

import org.springframework.stereotype.Service;

import com.rohit.agecalculator.model.AgeResponse;

@Service
public class AgeService {

    public AgeResponse calculateAge(LocalDate dateOfBirth) {
        LocalDate today = LocalDate.now();

        if (dateOfBirth.isAfter(today)) {
            throw new IllegalArgumentException("Date of birth cannot be in the future.");
        }

        Period period = Period.between(dateOfBirth, today);

        return new AgeResponse(
                period.getYears(),
                period.getMonths(),
                period.getDays()
        );
    }
}