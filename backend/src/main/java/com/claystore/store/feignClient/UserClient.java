package com.claystore.store.feignClient;

import com.claystore.store.dto.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name="user-service", url="http://localhost:8081")
public interface UserClient {

    @GetMapping("/api/users/{id}")
    UserDTO getUserById(@PathVariable int id);

    @GetMapping("/api/users")
    List<UserDTO> getAllUsers();
}
