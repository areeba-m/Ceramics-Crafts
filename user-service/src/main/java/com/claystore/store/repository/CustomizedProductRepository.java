package com.claystore.store.repository;

import com.claystore.store.entity.CustomizedProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomizedProductRepository extends JpaRepository<CustomizedProduct, Integer> {
}
