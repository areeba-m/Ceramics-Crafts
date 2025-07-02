package com.claystore.store.response;

import com.claystore.store.dto.OrderItemDetailDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {

    private int orderId;
    private int userId;
    private String name;
    private List<OrderItemDetailDTO> items;
    private double totalAmount;
    private LocalDateTime orderDate;
    private String shippingAddress;

}
