package com.claystore.store.controller;

import com.claystore.store.dto.UserDTO;
import com.claystore.store.dto.UserSignupDTO;
import com.claystore.store.entity.User;
import com.claystore.store.request.AuthRequest;
import com.claystore.store.response.ApiResponse;
import com.claystore.store.response.AuthResponse;
import com.claystore.store.service.UserService;
import com.claystore.store.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
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
        try {
            UserDTO registeredUser = userService.signUp(user);
            return ResponseEntity.ok(new ApiResponse("User registered successfully.", registeredUser));
        }
        catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ApiResponse("Invalid request.", e.getMessage()));

        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Could not sign up.", e.getMessage()));
        }
    }

    @PostMapping("/auth/login")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody AuthRequest request, HttpServletResponse response) {
        try{
            UserDTO user = userService.authenticate(request.getEmail(), request.getPassword());
            String token = jwtUtil.generateToken(user.getEmail());
            return ResponseEntity
                    .ok(new ApiResponse("Login successful.", new AuthResponse(token, user.getId())));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse("Login failed.", e.getMessage()));
        }

    }

    @PostMapping("/auth/logout")
    public ResponseEntity<ApiResponse> logout(HttpServletResponse response) {
        return ResponseEntity.ok(new ApiResponse("Logged out successfully.", null));
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable int id) {
        Optional<UserDTO> userOpt = userService.getUserById(id);
        return userOpt.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

