package com.movie.movieticketapi.dto;

import com.movie.movieticketapi.common.constant.RegexPatterns;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

// 유저 회원가입시 사용되는 DTO
@Data
public class RegisterUserDto {
    @NotBlank(message = "{validation.required.user}")
    @Pattern(regexp = RegexPatterns.ID, message = "{validation.invalid.user}")
    private String u_id;

    @NotBlank(message = "{validation.required.user}")
    @Pattern(regexp = RegexPatterns.PW, message = "{validation.invalid.user}")
    private String u_pw;

    @NotBlank(message = "{validation.required.user}")
    @Pattern(regexp = RegexPatterns.NICK, message = "{validation.invalid.user}")
    private String u_nick;

    @NotBlank(message = "{validation.required.user}")
    private String u_age;

    @NotBlank(message = "{validation.required.user}")
    private String u_gender;

    @Email(message = "{validation.invalid.user}")
    @NotBlank(message = "{validation.required.user}")
    private String u_mail;

    @NotBlank(message = "{validation.required.user}")
    private String u_phone;

}
