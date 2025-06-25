package com.claystore.store.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private double totalAmount;

    @OneToMany(mappedBy="cart", cascade=CascadeType.ALL)
    @JsonManagedReference
    private List<CartItem> items = new ArrayList<>();

    @OneToOne
    @JoinColumn(name="user_id")
    private User user;
}
