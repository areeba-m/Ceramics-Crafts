package com.claystore.store.controller;

import com.claystore.commonsecurity.response.ApiResponse;
import com.claystore.store.request.PlaceOrderRequest;
import com.claystore.store.dto.OrderResponseDTO;
import com.claystore.store.service.OrderService;
import com.fasterxml.jackson.databind.ObjectMapper;
import feign.FeignException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/placeOrder")
    public ResponseEntity<ApiResponse> placeOrder(@Valid @RequestBody PlaceOrderRequest request){
        OrderResponseDTO orderResponseDTO = orderService.placeOrder(request);
        return ResponseEntity.ok(new ApiResponse("Successfully placed an order.", orderResponseDTO));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse> getOrdersByUserId(@PathVariable int userId){
        List<OrderResponseDTO> o = orderService.getOrdersByUserId(userId);
        return ResponseEntity.ok(new ApiResponse("Successfully fetched orders by this user.", o));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getOrderById(@PathVariable int id){
        OrderResponseDTO o = orderService.getOrderById(id);
        return ResponseEntity.ok(new ApiResponse("Successfully fetched an order.", o));
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllOrders(){
        List<OrderResponseDTO> orderResponseDTOS = orderService.getAllOrders();
        return ResponseEntity.ok(new ApiResponse("Successfully fetched all orders.", orderResponseDTOS));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteOrder(@PathVariable int id){
        orderService.deleteOrder(id);
        return ResponseEntity.ok(new ApiResponse("Successfully deleted order.", null));
    }

}
