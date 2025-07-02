package com.claystore.store.service;

import com.claystore.store.dto.OrderItemDetailDTO;
import com.claystore.store.dto.UserDTO;
import com.claystore.store.entity.Order;
import com.claystore.store.entity.OrderItem;
import com.claystore.store.feignClient.ProductClient;
import com.claystore.store.feignClient.UserClient;
import com.claystore.store.repository.OrderRepository;
import com.claystore.store.request.PlaceOrderRequest;
import com.claystore.store.dto.OrderResponseDTO;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final UserClient userClient;
    private final ProductClient productClient;
    private final OrderRepository orderRepository;

    public OrderService(UserClient userClient, ProductClient productClient,
                        OrderRepository orderRepository) {
        this.userClient = userClient;
        this.productClient = productClient;
        this.orderRepository = orderRepository;
    }

    // Order Service
    @Transactional
    public OrderResponseDTO placeOrder(PlaceOrderRequest request) {
        UserDTO user = userClient.getUserById(request.getUserId());

        Order order = new Order();
        order.setUserId(user.getId());
        order.setName(request.getName());
        order.setAddress(request.getAddress());
        order.setCity(request.getCity());
        order.setPhoneNumber(request.getPhoneNumber());
        order.setOrderDate(LocalDateTime.now());

        List<OrderItem> orderItems = request.getItems().stream().map(orderItemDTO -> {
            Product product = productRepository.findById(orderItemDTO.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found."));
            OrderItem item = new OrderItem();
            item.setProduct(product);
            item.setQuantity(orderItemDTO.getQuantity());
            item.setPrice(product.getPrice() * orderItemDTO.getQuantity());
            item.setOrder(order);
            return item;
        }).toList();

        double calculatedTotal = orderItems.stream()
                .mapToDouble(item -> item.getProduct().getPrice() * item.getQuantity())
                .sum();

        order.setTotalAmount(calculatedTotal);
        order.setItems(orderItems);

        orderRepository.save(order);

        List<OrderItemDetailDTO> itemDetails = orderItems.stream().map(item ->new OrderItemDetailDTO(
                item.getProduct().getId(),
                item.getProduct().getName(),
                item.getProduct().getPrice(),
                item.getQuantity()
        )).toList();

        String shippingAddress = order.getAddress() + " " + order.getCity();

        return new OrderResponseDTO(
                order.getId(),
                user.getId(),
                request.getName(),
                itemDetails,
                calculatedTotal,
                order.getOrderDate(),
                shippingAddress
        );

    }

    public List<OrderResponseDTO> getOrdersByUserId(int userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream().map(this::mapToOrderResponse).toList();
    }

    public OrderResponseDTO getOrderById(int id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return mapToOrderResponse(order);
    }

    public List<OrderResponseDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream().map(this::mapToOrderResponse).toList();
    }

    private OrderResponseDTO mapToOrderResponse(Order order) {
        List<OrderItemDetailDTO> itemDetails = order.getItems().stream().map(item -> {
            Product product = item.getProduct();
            return new OrderItemDetailDTO(
                    product.getId(),
                    product.getName(),
                    product.getPrice(),
                    item.getQuantity()
            );
        }).toList();

        String shippingAddress = order.getAddress() + " " + order.getCity();

        return new OrderResponseDTO(
                order.getId(),
                order.getUser().getId(),
                order.getName(),
                itemDetails,
                order.getTotalAmount(),
                order.getOrderDate(),
                shippingAddress
        );
    }

    @Transactional
    public void deleteOrder(int id) {
        orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        orderRepository.deleteById(id);
    }

    // User service related functionality
    public List<UserDTO> fetchAllUsers() {
        return userClient.getAllUsers();
    }

    public UserDTO fetchUserById(int id){
        return userClient.getUserById(id);
    }
}
