package com.claystore.store.service;

import com.claystore.commonsecurity.exception.ResourceNotFoundException;
import com.claystore.commonsecurity.response.ApiResponse;
import com.claystore.store.dto.*;
import com.claystore.store.entity.Order;
import com.claystore.store.entity.OrderItem;
import com.claystore.store.feignClient.ProductClient;
import com.claystore.store.feignClient.UserClient;
import com.claystore.store.repository.OrderRepository;
import com.claystore.store.request.PlaceOrderRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderService {

    private final UserClient userClient;
    private final ProductClient productClient;
    private final OrderRepository orderRepository;
    private final ObjectMapper objectMapper;

    public OrderService(UserClient userClient, ProductClient productClient,
                        OrderRepository orderRepository, ObjectMapper objectMapper) {
        this.userClient = userClient;
        this.productClient = productClient;
        this.orderRepository = orderRepository;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public OrderResponseDTO placeOrder(PlaceOrderRequest request) {

        UserDTO user = fetchUserById(request.getUserId());
        Order order = buildOrder(request, user);

        // caching product objects
        Map<Integer, ProductDTO> productMap = new HashMap<>();

        // fetch and create order items of the order
        List<OrderItem> orderItems = request.getItems()
                .stream()
                .map(orderItemDTO -> createOrderItem(orderItemDTO, order, productMap))
                .toList();

        double calculatedTotal = orderItems.stream()
                .mapToDouble(OrderItem::getPrice)
                .sum();

        order.setTotalAmount(calculatedTotal);
        order.setItems(orderItems);
        orderRepository.save(order);

        // create order items for response
        List<OrderItemDetailDTO> itemDetails = mapOrderItemsToDetails(orderItems, productMap);
        String shippingAddress = order.getAddress() + ", " + order.getCity();

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
        // check user exists
        fetchUserById(userId);

        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream().map(this::mapToOrderResponse).toList();
    }

    public OrderResponseDTO getOrderById(int id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        return mapToOrderResponse(order);
    }

    public List<OrderResponseDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream().map(this::mapToOrderResponse).toList();
    }

    @Transactional
    public void deleteOrder(int id) {
        orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        orderRepository.deleteById(id);
    }

    // helper methods
    private UserDTO fetchUserById(int userId) {
        ApiResponse response = userClient.fetchUserById(userId);
        if (response.getData() == null || !(response.getData() instanceof Map)) {
            throw new ResourceNotFoundException("User not found with ID: " + userId);
        }
        return objectMapper.convertValue(response.getData(), UserDTO.class);
    }

    private ProductDTO fetchProductById(int productId) {
        ApiResponse response = productClient.fetchProductById(productId);
        if (response.getData() == null || !(response.getData() instanceof Map)) {
            throw new ResourceNotFoundException("Product not found with ID: " + productId);
        }
        return objectMapper.convertValue(response.getData(), ProductDTO.class);
    }

    private OrderItem createOrderItem(OrderItemDTO dto, Order order, Map<Integer, ProductDTO> productMap) {
        ApiResponse response = productClient.fetchProductById(dto.getProductId());
        if (response.getData() == null || !(response.getData() instanceof Map)) {
            throw new ResourceNotFoundException("Product not found with ID: " + dto.getProductId());
        }
        ProductDTO product = objectMapper.convertValue(response.getData(), ProductDTO.class);
        productMap.put(product.getId(), product);

        OrderItem item = new OrderItem();
        item.setProductId(product.getId());
        item.setQuantity(dto.getQuantity());
        item.setPrice(product.getPrice() * dto.getQuantity());
        item.setOrder(order);
        return item;
    }

    private Order buildOrder(PlaceOrderRequest request, UserDTO user) {
        Order order = new Order();
        order.setUserId(user.getId());
        order.setName(request.getName());
        order.setAddress(request.getAddress());
        order.setCity(request.getCity());
        order.setPhoneNumber(request.getPhoneNumber());
        order.setOrderDate(LocalDateTime.now());
        return order;
    }

    private List<OrderItemDetailDTO> mapOrderItemsToDetails(List<OrderItem> orderItems, Map<Integer, ProductDTO> productMap) {
        return orderItems.stream().map(item -> {
            ProductDTO product = productMap.get(item.getProductId());
            if (product == null) {
                throw new ResourceNotFoundException("Product details missing for ID: " + item.getProductId());
            }
            return new OrderItemDetailDTO(
                    product.getId(),
                    product.getName(),
                    product.getPrice(),
                    item.getQuantity()
            );
        }).toList();
    }

    private OrderResponseDTO mapToOrderResponse(Order order) {
        List<OrderItemDetailDTO> itemDetails = order.getItems().stream().map(item -> {
            ProductDTO product = fetchProductById(item.getProductId());
            return new OrderItemDetailDTO(
                    product.getId(),
                    product.getName(),
                    product.getPrice(),
                    item.getQuantity()
            );
        }).toList();

        String shippingAddress = order.getAddress() + ", " + order.getCity();

        return new OrderResponseDTO(
                order.getId(),
                order.getUserId(), // using userId instead of user object
                order.getName(),
                itemDetails,
                order.getTotalAmount(),
                order.getOrderDate(),
                shippingAddress
        );
    }


}
