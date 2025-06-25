package com.claystore.store.controller;

import com.claystore.store.entity.Order;
import com.claystore.store.response.ApiResponse;
import com.claystore.store.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createOrder(@RequestBody Order order){
        try {
            Order o = orderService.createOrder(order);
            return ResponseEntity.ok(new ApiResponse("Successfully placed an order.", o));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Could not place order.", e.getMessage()));
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse> getOrdersByUserId(@PathVariable int userId){
        try {
            List<Order> o = orderService.getOrdersByUserId(userId);
            return ResponseEntity.ok(new ApiResponse("Successfully fetched orders by this user.", o));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Could find orders placed by this user.", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getOrderById(@PathVariable int id){
        try {
            Order o = orderService.getOrderById(id);
            return ResponseEntity.ok(new ApiResponse("Successfully fetched an order.", o));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Could not find order.", e.getMessage()));
        }
    }

}
