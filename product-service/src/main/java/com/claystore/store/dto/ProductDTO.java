package com.claystore.store.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {

    private int id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Material is required")
    private String material;

    @Min(value = 1, message = "Size must be at least 1")
    private int size;

    @Positive(message = "Price must be greater than 0")
    private double price;

    private String imageUrl;
    private String cloudinaryPublicId;
}
