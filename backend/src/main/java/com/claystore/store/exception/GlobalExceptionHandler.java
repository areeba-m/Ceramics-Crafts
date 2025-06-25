package com.claystore.store.exception;

import com.claystore.store.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse> handleValidationErrors(MethodArgumentNotValidException ex) {
        StringBuilder errors = new StringBuilder();
        ex
                .getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        errors.append(error.getField())
                                .append(": ")
                                .append(error.getDefaultMessage())
                                .append(". ")
        );
        return ResponseEntity.badRequest().body(new ApiResponse("Validation error", errors.toString()));
    }
}
