package com.claystore.store.controller;

import com.claystore.store.entity.Cart;
import com.claystore.store.service.CartService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping
    public Cart addToCart(@RequestBody Cart cart){
        return cartService.addToCart(cart);
    }

    @GetMapping("/{userId}")
    public List<Cart> getCart(@PathVariable int userId){
        return cartService.getCartByUserId(userId);
    }

    @DeleteMapping("/{id}")
    public void removeItem(@PathVariable int id){
        cartService.removeItem(id);
    }

    @DeleteMapping("/user/{userId}")
    public void clearCart(@PathVariable int userId){
        cartService.clearCart(userId);
    }
}
