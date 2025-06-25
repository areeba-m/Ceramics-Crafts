package com.claystore.store.repository;

import com.claystore.store.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart,Integer> {
    List<Cart> findByUserId(int userId);
    void deleteByUserId(int userId);
}
