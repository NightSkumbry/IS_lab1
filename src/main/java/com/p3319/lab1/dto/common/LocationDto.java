package com.p3319.lab1.dto.common;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LocationDto {
    private Long id;
    private long x;

    @NotNull(message = "Location.y can't be null")
    private Long y;

    private String name;
}
