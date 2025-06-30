package com.claystore.store.exception;

import com.claystore.store.response.ApiResponse;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

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

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiResponse> handleJpaValidationErrors(ConstraintViolationException ex) {
        StringBuilder errors = new StringBuilder();
        ex.getConstraintViolations().forEach(error -> {
            errors.append(error.getPropertyPath())
                    .append(": ")
                    .append(error.getMessage())
                    .append(". ");
        });

        return ResponseEntity.badRequest().body(new ApiResponse("Validation error", errors.toString()));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse> handleAccessDenied(AccessDeniedException ex) {
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(new ApiResponse("Access denied", "You do not have permission to access this resource."));
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<ApiResponse> handleMediaType(HttpMediaTypeNotSupportedException ex) {
        String unsupported = ex.getContentType() != null ? ex.getContentType().toString() : "unknown";
        return ResponseEntity
                .status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                .body(new ApiResponse("Unsupported media type", "Content type '" + unsupported + "' is not supported."));
    }

    @ExceptionHandler(MissingServletRequestPartException.class)
    public ResponseEntity<ApiResponse> handleMissingPart(MissingServletRequestPartException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ApiResponse("Missing part", "Required part '" + ex.getRequestPartName() + "' is missing."));
    }
}
