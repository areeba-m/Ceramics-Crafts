package com.claystore.store.controller;

import com.claystore.store.entity.Order;
import com.claystore.store.entity.Product;
import com.claystore.store.entity.User;
import com.claystore.store.response.ApiResponse;
import com.claystore.store.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllProducts(){
        try{
            List<Product> products = service.getAllProducts();
            return ResponseEntity.ok(
                    new ApiResponse("Successfully fetched all products.", products));

        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error fetching products.", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getProductById(@PathVariable int id){
        try{
            Optional<Product> optionalProduct = service.getProductById(id);
            if(optionalProduct.isPresent()){
                Product product = optionalProduct.get();
                return ResponseEntity.ok(
                        new ApiResponse("Product found.", product));
            }
            else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse("Product with ID not found.",optionalProduct));
            }

        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error fetching product.", e.getMessage()));
        }
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse> addProduct(@Valid @RequestPart("product") Product product,
                                                  @RequestPart("image") MultipartFile image){
        try {
            Product p = service.saveProduct(product, image);
            return ResponseEntity.ok(new ApiResponse("Successfully added a product.", p));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Failed to add a product.", e.getMessage()));
        }
    }

    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse> updateProduct(
            @PathVariable int id,
            @Valid @RequestPart("product") Product updatedProduct,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        try {
            Product product = service.updateProduct(id, updatedProduct, image);
            return ResponseEntity.ok(new ApiResponse("Product updated successfully.", product));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Failed to update product.", e.getMessage()));
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable int id){
        try {
            service.deleteProduct(id);
            return ResponseEntity
                    .ok(new ApiResponse("Product deleted successfully.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Failed to delete product.", e.getMessage()));
        }
    }
}
