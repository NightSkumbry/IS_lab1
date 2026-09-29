package com.p3319.lab1.dto.person;

import com.p3319.lab1.dto.common.LocationDto;
import com.p3319.lab1.entity.enums.Color;
import com.p3319.lab1.entity.enums.Country;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonRequestDto {

    @NotBlank(message = "Person.name can't be blank")
    private String name;

    private Color eyeColor; // Can be null

    @NotNull(message = "Person.hairColor can't be null")
    private Color hairColor;

    @Valid
    private LocationDto location; // Can be null

    @Positive(message = "Person.weight must be greater than 0")
    private Integer weight; // Can be null

    @NotNull(message = "Person.nationality can't be null")
    private Country nationality;
}
