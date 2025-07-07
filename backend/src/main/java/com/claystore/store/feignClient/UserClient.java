package com.claystore.store.feignClient;

import com.claystore.commonsecurity.response.ApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name="user-service", url="http://localhost:8081")
public interface UserClient {

    @GetMapping("/api/users/{id}")
    ApiResponse fetchUserById(@PathVariable int id);
}
