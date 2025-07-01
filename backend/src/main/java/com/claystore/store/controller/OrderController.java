package com.claystore.store.controller;

import com.claystore.store.request.PlaceOrderRequest;
import com.claystore.store.response.ApiResponse;
import com.claystore.store.response.OrderResponse;
import com.claystore.store.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/placeOrder")
    public ResponseEntity<ApiResponse> placeOrder(@Valid @RequestBody PlaceOrderRequest request){
        try {
            OrderResponse orderResponse = orderService.placeOrder(request);
            return ResponseEntity.ok(new ApiResponse("Successfully placed an order.", orderResponse));
        } catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Could not place order.", e.getMessage()));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Could not place order.", e.getMessage()));
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse> getOrdersByUserId(@PathVariable int userId){
        try {
            List<OrderResponse> o = orderService.getOrdersByUserId(userId);
            return ResponseEntity.ok(new ApiResponse("Successfully fetched orders by this user.", o));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Could not find orders placed by this user.", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getOrderById(@PathVariable int id){
        try {
            OrderResponse o = orderService.getOrderById(id);
            return ResponseEntity.ok(new ApiResponse("Successfully fetched an order.", o));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Could not find order.", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllOrders(){
        try {
            List<OrderResponse> orderResponses = orderService.getAllOrders();
            return ResponseEntity.ok(new ApiResponse("Successfully fetched all orders.", orderResponses));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Could not find orders.", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteOrder(@PathVariable int id){
        try{
            orderService.deleteOrder(id);
            return ResponseEntity
                    .ok(new ApiResponse("Successfully deleted order.", null));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse("Could not delete order.", e.getMessage()));
        }
    }

}
