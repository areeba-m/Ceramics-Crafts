package com.claystore.store.controller;


import com.claystore.commonsecurity.exception.ResourceNotFoundException;
import com.claystore.commonsecurity.response.ApiResponse;
import com.claystore.store.dto.CustomizedProductDTO;
import com.claystore.store.service.CustomizedProductService;
import jakarta.validation.Valid;
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
        List<CustomizedProductDTO> products = service.getAllCustomizedProducts();
        return ResponseEntity.ok(new ApiResponse("Successfully fetched all products.", products));

    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getCustomizedProductById(@PathVariable int id){
        Optional<CustomizedProductDTO> optionalProduct = service.getCustomizedProductById(id);
        if(optionalProduct.isPresent()){
            CustomizedProductDTO product = optionalProduct.get();
            return ResponseEntity.ok(
                    new ApiResponse("Customized Product found.", product));
        }
        else {
            throw new ResourceNotFoundException("Customized Product with ID not found.");
        }

    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse> addProduct(
            @Valid @RequestPart("product") CustomizedProductDTO productDTO,
            @RequestPart(value = "image", required = false) MultipartFile image
    ){
        CustomizedProductDTO p = service.saveCustomizedProduct(productDTO, image);
        return ResponseEntity.ok(new ApiResponse("Successfully added a product.", p));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable int id){
        service.deleteCustomizedProduct(id);
        return ResponseEntity.ok(new ApiResponse("Product deleted successfully.", null));
    }
}
