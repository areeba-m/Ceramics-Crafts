package com.claystore.store.controller;

import com.claystore.commonsecurity.exception.ResourceNotFoundException;
import com.claystore.commonsecurity.response.ApiResponse;
import com.claystore.commonsecurity.util.JwtUtil;
import com.claystore.store.dto.UserDTO;
import com.claystore.store.dto.UserSignupDTO;
import com.claystore.store.request.AuthRequest;
import com.claystore.store.response.AuthResponse;
import com.claystore.store.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/users")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/auth/signup")
    public ResponseEntity<ApiResponse> signUp(@Valid @RequestBody UserSignupDTO user){
        UserDTO registeredUser = userService.signUp(user);
        return ResponseEntity.ok(new ApiResponse("User registered successfully.", registeredUser));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody AuthRequest request, HttpServletResponse response) {
        UserDTO user = userService.authenticate(request.getEmail(), request.getPassword());
        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity
                .ok(new ApiResponse("Login successful.", new AuthResponse(token, user.getId())));

    }

    @PostMapping("/auth/logout")
    public ResponseEntity<ApiResponse> logout(HttpServletResponse response) {
        return ResponseEntity.ok(new ApiResponse("Logged out successfully.", null));
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(
                new ApiResponse("Successfully fetched all users.", users));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getUserById(@PathVariable int id) {
        Optional<UserDTO> optionalUser = userService.getUserById(id);
        if(optionalUser.isPresent()){
            UserDTO u = optionalUser.get();
            return ResponseEntity.ok(
                    new ApiResponse("User found.", u));
        }
        else {
            throw new ResourceNotFoundException("User with ID not found.");
        }
    }
}

