package com.claystore.store.controller;

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
    public ResponseEntity<ApiResponse> signUp(@Valid @RequestBody User user){
        try{
            User u = userService.signUp(user);
            return ResponseEntity.ok(new ApiResponse("User registered successfully.", u));
        }
        catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ApiResponse("User already registered.", e.getMessage()));

        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Could not sign up.", e.getMessage()));
        }

    }

    @PostMapping("/auth/login")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody AuthRequest request, HttpServletResponse response) {
        try{
            User user = userService.authenticate(request.getEmail(), request.getPassword());
            String token = jwtUtil.generateToken(user.getEmail());

            ResponseCookie cookie = ResponseCookie.from("jwt", token)
                    .httpOnly(true)
                    .secure(false) // set to false for development
                    .path("/")
                    .maxAge(jwtUtil.getJwtExpirationMs() / 1000)
                    .sameSite("Strict")
                    .build();
            response.setHeader("Set-Cookie", cookie.toString());

            // Create response with token
            AuthResponse authResponse = new AuthResponse(token);

            return ResponseEntity.ok(new ApiResponse("Login successful.",authResponse));
        }
        catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse(e.getMessage(), null));
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Login failed.", e.getMessage()));
        }

    }

    @PostMapping("/auth/logout")
    public ResponseEntity<ApiResponse> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0) // expire immediately
                .sameSite("Strict")
                .build();

        response.setHeader("Set-Cookie", cookie.toString());

        return ResponseEntity.ok(new ApiResponse("Logged out successfully.", null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getUserById(@PathVariable int id){
        try{
            Optional<User> optionalUser = userService.getUserById(id);
            if(optionalUser.isPresent()){
                User u = optionalUser.get();
                return ResponseEntity.ok(
                        new ApiResponse("User found.", u));
            }
            else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse("User with ID not found.",optionalUser));
            }

        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error fetching user.", e.getMessage()));
        }

    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllUsers(){
        try{
            List<User> users = userService.getAllUsers();
            return ResponseEntity.ok(
                    new ApiResponse("Successfully fetched all users.", users));

        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error fetching users.", e.getMessage()));
        }
    }
}

