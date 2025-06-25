package com.claystore.store.service;

import com.claystore.store.entity.Product;
import com.claystore.store.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository; /*constructor injection*/
    }

    public List<Product> getAllProducts(){
        return repository.findAll();
    }

    public Optional<Product> getProductById(int id){
        return repository.findById(id);
    }

    public Product saveProduct(Product product){
        return repository.save(product);
    }

    public Product updateProduct(int id, Product newProduct){
        Product oldProduct = repository.findById(id).orElseThrow();
        oldProduct.setName(newProduct.getName());
        oldProduct.setDescription(newProduct.getDescription());
        oldProduct.setMaterial(newProduct.getMaterial());
        oldProduct.setColor(newProduct.getColor());
        oldProduct.setSize(newProduct.getSize());
        oldProduct.setPrice(newProduct.getPrice());
        oldProduct.setCustomizable(newProduct.isCustomizable());
        return repository.save(oldProduct);
    }

    public void deleteProduct(int id){
        repository.deleteById(id);
    }
}
