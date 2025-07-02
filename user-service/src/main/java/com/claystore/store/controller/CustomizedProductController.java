package com.claystore.store.controller;


import com.claystore.store.entity.CustomizedProduct;
import com.claystore.store.entity.Product;
import com.claystore.store.response.ApiResponse;
import com.claystore.store.service.CustomizedProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products/customized")
public class CustomizedProductController {

    private final CustomizedProductService service;

    public CustomizedProductController(CustomizedProductService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllCustomizedProducts(){
        try{
            List<CustomizedProduct> products = service.getAllCustomizedProducts();
            return ResponseEntity.ok(
                    new ApiResponse("Successfully fetched all products.", products));

        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error fetching products.", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getCustomizedProductById(@PathVariable int id){
        try{
            Optional<CustomizedProduct> optionalProduct = service.getCustomizedProductById(id);
            if(optionalProduct.isPresent()){
                CustomizedProduct product = optionalProduct.get();
                return ResponseEntity.ok(
                        new ApiResponse("Customized Product found.", product));
            }
            else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse("Customized Product with ID not found.",optionalProduct));
            }

        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error fetching product.", e.getMessage()));
        }
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse> addProduct(
            @Valid @RequestPart("product") CustomizedProduct product,
            @RequestPart(value = "image", required = false) MultipartFile image
    ){
        try {
            CustomizedProduct p = service.saveCustomizedProduct(product, image);
            return ResponseEntity
                    .ok(new ApiResponse("Successfully added a product.", p));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Failed to add a product.", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable int id){
        try {
            service.deleteCustomizedProduct(id);
            return ResponseEntity
                    .ok(new ApiResponse("Product deleted successfully.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Failed to delete product.", e.getMessage()));
        }
    }
}
