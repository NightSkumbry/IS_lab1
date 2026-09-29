package com.p3319.lab1.dto.common;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressDto {
    private Long id;

    @Size(min = 6, message = "Address.zipCode length must be at least 6")
    private String zipCode;

    @Valid
    private LocationDto town;
}
