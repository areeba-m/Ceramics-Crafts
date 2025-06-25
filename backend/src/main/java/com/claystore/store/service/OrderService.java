package com.claystore.store.service;

import com.claystore.store.entity.Order;
import com.claystore.store.entity.OrderItem;
import com.claystore.store.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order createOrder(Order order){
        order.setOrderTime(LocalDateTime.now());
        for(OrderItem item: order.getItems()){
            item.setOrder(order);
        }
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByUserId(int userId){
        return orderRepository.findByUserId(userId);
    }

    public Order getOrderById(int id){
        return orderRepository.findById(id).orElseThrow(()->new RuntimeException("Order not found"));
    }
}
