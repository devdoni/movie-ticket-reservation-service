package com.movie.movieticketapi.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginUserDto {
    @NotBlank(message = "{validation.required.user}")
    private String u_id;

    @NotBlank(message = "{validation.required.user}")
    private String u_pw;

}
