package com.claystore.store.feignClient;

import com.claystore.commonsecurity.response.ApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name="product-service", url="http://localhost:8082")
public interface ProductClient {

    @GetMapping("/api/products/{id}")
    ApiResponse fetchProductById(@PathVariable int id);

}
