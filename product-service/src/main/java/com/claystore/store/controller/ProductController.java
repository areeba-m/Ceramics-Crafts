package com.claystore.store.controller;

import com.claystore.commonsecurity.exception.ResourceNotFoundException;
import com.claystore.commonsecurity.response.ApiResponse;
import com.claystore.store.dto.ProductDTO;
import com.claystore.store.service.ProductService;
import jakarta.validation.Valid;
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
        List<ProductDTO> products = service.getAllProducts();
        return ResponseEntity.ok(
                new ApiResponse("Successfully fetched all products.", products));

    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getProductById(@PathVariable int id){
        Optional<ProductDTO> optionalProduct = service.getProductById(id);
        if(optionalProduct.isPresent()){
            ProductDTO product = optionalProduct.get();
            return ResponseEntity.ok(new ApiResponse("Product found.", product));
        }
        else {
            throw new ResourceNotFoundException("Product with ID not found.");
        }
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse> addProduct(@Valid @RequestPart("product") ProductDTO productDTO,
                                                  @RequestPart("image") MultipartFile image){
        ProductDTO p = service.saveProduct(productDTO, image);
        return ResponseEntity.ok(new ApiResponse("Successfully added a product.", p));
    }

    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse> updateProduct(
            @PathVariable int id,
            @Valid @RequestPart("product") ProductDTO updatedProduct,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        ProductDTO product = service.updateProduct(id, updatedProduct, image);
        return ResponseEntity.ok(new ApiResponse("Product updated successfully.", product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable int id){
        service.deleteProduct(id);
        return ResponseEntity.ok(new ApiResponse("Product deleted successfully.", null));
    }
}
