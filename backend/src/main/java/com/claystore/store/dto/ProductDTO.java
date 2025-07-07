package com.claystore.store.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {

    private int id;
    private String name;
    private String description;
    private String material;
    private int size;
    private double price;
    private String imageUrl;
    private String cloudinaryPublicId;
}

