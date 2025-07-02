package com.claystore.store.feignClient;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name="product-service", url="http://localhost:8082")
public interface ProductClient {
}
