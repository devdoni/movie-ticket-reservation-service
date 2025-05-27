package com.movie.movieticketapi.common.exception;

import com.movie.movieticketapi.common.constant.UserConstants;
import com.movie.movieticketapi.dto.ApiResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@Log4j2
@RestControllerAdvice
public class GlobalExceptionHandler {

    // @Valid 실패 시 발생하는 예외
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationException(MethodArgumentNotValidException e) {
        List<String> errors = e.getBindingResult().getFieldErrors()
                .stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .collect(Collectors.toList());
        log.error(errors);
        ApiResponse<?> response = new ApiResponse<>(false, "Validation Error", UserConstants.USER_VALIDATE_FAIL);

        return ResponseEntity.badRequest().body(response);
    }
};
