package com.claystore.store.service;

import com.claystore.store.entity.Cart;
import com.claystore.store.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {
    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public Cart addToCart(Cart cart){
        return cartRepository.save(cart);
    }

    public List<Cart> getCartByUserId(int userId){
        return cartRepository.findByUserId(userId);
    }

    public void removeItem(int id){
        cartRepository.deleteById(id);
    }

    public void clearCart(int userId){
        cartRepository.deleteByUserId(userId);
    }
}
