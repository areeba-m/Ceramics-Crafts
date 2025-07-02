package com.claystore.store.service;

import com.claystore.store.dto.UserDTO;
import com.claystore.store.dto.UserSignupDTO;
import com.claystore.store.entity.User;
import com.claystore.store.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserDTO> getAllUsers(){
        return userRepository.findAll().stream()
                .map(this::convertToDTO)
                .toList();
    }

    public Optional<UserDTO> getUserById(int id) {
        return userRepository.findById(id)
                .map(this::convertToDTO);
    }

    public UserDTO signUp(UserSignupDTO userDTO){
        if(userRepository.findByEmail(userDTO.getEmail()).isPresent()){
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setFullName(userDTO.getFullName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setPhoneNumber(userDTO.getPhoneNumber());

        User saved = userRepository.save(user);
        return convertToDTO(saved);
    }

    public UserDTO authenticate(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return convertToDTO(user);
    }

    public Optional<UserDTO> getUserByEmail(String email){
        return userRepository.findByEmail(email)
                .map(this::convertToDTO);
    }

    public UserDTO convertToDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhoneNumber()
        );
    }

}
