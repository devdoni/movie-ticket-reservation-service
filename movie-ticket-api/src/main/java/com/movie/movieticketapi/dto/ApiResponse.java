package com.movie.movieticketapi.dto;

import lombok.Data;

// Response 응답 객체
@Data
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
    private T error;

    public ApiResponse(boolean success, String message, T data, T error) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.error = error;
    }
}
