package com.claystore.store.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name="cart_item")
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int quantity;

    private double price;

    @ManyToOne
    @JoinColumn(name="product_id")
    private Product product;

    @ManyToOne(cascade=CascadeType.ALL)
    @JsonBackReference
    private Cart cart;



}
