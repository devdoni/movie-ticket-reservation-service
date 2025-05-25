package com.movie.movieticketapi.common.exception;

import com.movie.movieticketapi.common.constant.UserConstants;
import com.movie.movieticketapi.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // @Valid 실패 시 발생하는 예외
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationException(MethodArgumentNotValidException e) {
        List<String> errors = e.getBindingResult().getFieldErrors()
                .stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .collect(Collectors.toList());
        ApiResponse<?> response = new ApiResponse<>(false, "Validation Error", UserConstants.USER_VALIDATE_FAIL, errors);

        return ResponseEntity.badRequest().body(response);
    }
};
