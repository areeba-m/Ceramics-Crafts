package com.claystore.store.dto;

import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDetailDTO {
    private int productId;
    private String productName;
    @Positive(message="Price must be greater than 0")
    private double productPrice;
    @Positive(message="Quantity must be greater than 0")
    private int productQuantity;
}
