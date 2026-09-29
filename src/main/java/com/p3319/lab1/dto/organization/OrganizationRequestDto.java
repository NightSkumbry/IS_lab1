package com.p3319.lab1.dto.organization;

import com.p3319.lab1.dto.common.AddressDto;
import com.p3319.lab1.entity.enums.OrganizationType;

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
public class OrganizationRequestDto {

    @NotBlank(message = "Organization.name can't be blank")
    private String name;

    @NotNull(message = "Organization.officialAddress can't be null")
    @Valid
    private AddressDto officialAddress;

    @NotNull(message = "Organization.annualTurnover can't be null")
    @Positive(message = "Organization.annualTurnover must be greater than 0")
    private Long annualTurnover;

    @Positive(message = "Organization.employeesCount must be greater than 0")
    private int employeesCount;

    @NotNull(message = "Organization.rating can't be null")
    @Positive(message = "Organization.rating must be greater than 0")
    private Float rating;

    private OrganizationType type; // Can be null

    @NotNull(message = "Organization.postalAddress can't be null")
    @Valid
    private AddressDto postalAddress;
}
