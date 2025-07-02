package com.claystore.store.request;

import com.claystore.store.dto.OrderItemDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlaceOrderRequest {
    @NotEmpty(message="Item list can not be empty")
    @Valid
    private List<OrderItemDTO> items;

    private int userId;

    @NotBlank(message="Name is required")
    private String name;

    @NotBlank(message="Address is required")
    private String address;

    @NotBlank(message="City is required")
    private String city;

    @NotBlank(message="Phone Number is required")
    private String phoneNumber;

    double totalAmount;
}
