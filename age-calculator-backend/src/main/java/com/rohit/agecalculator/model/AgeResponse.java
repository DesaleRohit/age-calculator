package com.rohit.agecalculator.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgeResponse {
    private int years;
    private int months;
    private int days;
}
