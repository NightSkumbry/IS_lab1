package com.p3319.lab1.dto.product;

import com.p3319.lab1.dto.common.CoordinatesDto;
import com.p3319.lab1.entity.enums.UnitOfMeasure;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestDto {

    @NotBlank(message = "Product.name can't be blank")
    private String name;

    @NotNull(message = "Product.coordinates can't be null")
    @Valid
    private CoordinatesDto coordinates;

    @NotNull(message = "Product.unitOfMeasure can't be null")
    private UnitOfMeasure unitOfMeasure;

    @NotNull(message = "Product.manufacturerId can't be null")
    @Positive(message = "Product.manufacturerId must be greater than 0")
    private Long manufacturerId;

    @Positive(message = "Product.price must be greater than 0")
    private float price;

    private Double manufactureCost; // Can be null

    @Positive(message = "Product.rating must be greater than 0")
    private double rating;

    @NotBlank(message = "Product.partNumber can't be blank")
    @Size(min = 28, max = 84, message = "Product.partNumber length must be between 28 and 84")
    private String partNumber;

    @NotNull(message = "Product.ownerId can't be null")
    @Positive(message = "Product.ownerId must be greater than 0")
    private Long ownerId;
}
