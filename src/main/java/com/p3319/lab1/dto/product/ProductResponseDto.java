package com.p3319.lab1.dto.product;

import java.time.ZonedDateTime;

import com.p3319.lab1.dto.common.CoordinatesDto;
import com.p3319.lab1.dto.organization.OrganizationShortDto;
import com.p3319.lab1.dto.person.PersonShortDto;
import com.p3319.lab1.entity.enums.UnitOfMeasure;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDto {
    private Integer id;
    private String name;
    private CoordinatesDto coordinates;
    private ZonedDateTime creationDate;
    private UnitOfMeasure unitOfMeasure;
    private OrganizationShortDto manufacturer;
    private float price;
    private Double manufactureCost;
    private double rating;
    private String partNumber;
    private PersonShortDto owner;
}
