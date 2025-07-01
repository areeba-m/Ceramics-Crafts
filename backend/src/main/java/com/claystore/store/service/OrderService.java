package com.claystore.store.service;

import com.claystore.store.dto.OrderItemDetailDTO;
import com.claystore.store.entity.Order;
import com.claystore.store.entity.OrderItem;
import com.claystore.store.entity.Product;
import com.claystore.store.entity.User;
import com.claystore.store.repository.OrderRepository;
import com.claystore.store.repository.ProductRepository;
import com.claystore.store.repository.UserRepository;
import com.claystore.store.request.PlaceOrderRequest;
import com.claystore.store.response.OrderResponse;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public OrderService(UserRepository userRepository, ProductRepository productRepository,
                        OrderRepository orderRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
    }

    @Transactional
    public OrderResponse placeOrder(PlaceOrderRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(()-> new RuntimeException("User not found."));

        Order order = new Order();
        order.setUser(user);
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

        return new OrderResponse(
                order.getId(),
                user.getId(),
                request.getName(),
                itemDetails,
                calculatedTotal,
                order.getOrderDate(),
                shippingAddress
        );

    }

    public List<OrderResponse> getOrdersByUserId(int userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream().map(this::mapToOrderResponse).toList();
    }

    public OrderResponse getOrderById(int id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return mapToOrderResponse(order);
    }

    public List<OrderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream().map(this::mapToOrderResponse).toList();
    }


    private OrderResponse mapToOrderResponse(Order order) {
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

        return new OrderResponse(
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

}
