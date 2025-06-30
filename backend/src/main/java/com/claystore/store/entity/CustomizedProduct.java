package com.claystore.store.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomizedProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Shape is required")
    private String shape;

    @NotBlank(message = "Color is required")
    private String color;

    @NotBlank(message = "Texture is required")
    private String texture;

    @Min(value = 1, message = "Size must be at least 1")
    private int size;

    private String referenceImageUrl;

    private String specialFeature;

    @NotBlank(message = "Instruction is required")
    private String instruction;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    private String cloudinaryPublicId;

}
