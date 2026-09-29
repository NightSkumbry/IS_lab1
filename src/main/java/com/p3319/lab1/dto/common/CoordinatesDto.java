package com.p3319.lab1.dto.common;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoordinatesDto {
    private Long id;

    @Min(value = -219, message = "Coordinates.x must be greater than -220")
    private long x;

    @NotNull(message = "Coordinates.y can't be null")
    private Double y;
}
