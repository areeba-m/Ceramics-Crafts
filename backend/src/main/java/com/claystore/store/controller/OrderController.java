package com.claystore.store.controller;

import com.claystore.store.dto.UserDTO;
import com.claystore.store.request.PlaceOrderRequest;
import com.claystore.store.response.ApiResponse;
import com.claystore.store.dto.OrderResponseDTO;
import com.claystore.store.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/orders/placeOrder")
    public ResponseEntity<ApiResponse> placeOrder(@Valid @RequestBody PlaceOrderRequest request){
        try {
            OrderResponseDTO orderResponseDTO = orderService.placeOrder(request);
            return ResponseEntity.ok(new ApiResponse("Successfully placed an order.", orderResponseDTO));
        } catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Could not place order.", e.getMessage()));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Could not place order.", e.getMessage()));
        }
    }

    @GetMapping("/orders/user/{userId}")
    public ResponseEntity<ApiResponse> getOrdersByUserId(@PathVariable int userId){
        try {
            List<OrderResponseDTO> o = orderService.getOrdersByUserId(userId);
            return ResponseEntity.ok(new ApiResponse("Successfully fetched orders by this user.", o));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Could not find orders placed by this user.", e.getMessage()));
        }
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<ApiResponse> getOrderById(@PathVariable int id){
        try {
            OrderResponseDTO o = orderService.getOrderById(id);
            return ResponseEntity.ok(new ApiResponse("Successfully fetched an order.", o));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Could not find order.", e.getMessage()));
        }
    }

    @GetMapping("/orders")
    public ResponseEntity<ApiResponse> getAllOrders(){
        try {
            List<OrderResponseDTO> orderResponseDTOS = orderService.getAllOrders();
            return ResponseEntity.ok(new ApiResponse("Successfully fetched all orders.", orderResponseDTOS));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Could not find orders.", e.getMessage()));
        }
    }

    @DeleteMapping("/orders/{id}")
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

    // User Controller
    @GetMapping("/users")
    public ResponseEntity<ApiResponse> getAllUsers() {
        try {
            List<UserDTO> users = orderService.fetchAllUsers();
            return ResponseEntity.ok(new ApiResponse("Fetched users successfully", users));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Failed to fetch users", e.getMessage()));
        }
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<ApiResponse> getUserById(@PathVariable int id) {
        try {
            UserDTO user = orderService.fetchUserById(id);
            return ResponseEntity.ok(new ApiResponse("User found", user));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse("User not found", null));
        }
    }

}
