package com.movie.movieticketapi.dto;

import com.movie.movieticketapi.common.constant.RegexPatterns;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class RegisterUserDto {
    @NotBlank(message = "{validation.required.id}")
    @Pattern(regexp = RegexPatterns.ID, message = "{validation.invalid.id}")
    private String u_id;

    @NotBlank(message = "{validation.required.pw}")
    @Pattern(regexp = RegexPatterns.PW, message = "{validation.invalid.pw}")
    private String u_pw;

    @NotBlank(message = "{validation.required.nick}")
    @Pattern(regexp = RegexPatterns.NICK, message = "{validation.invalid.nick}")
    private String u_nick;

    @NotBlank(message = "{validation.required.age}")
    private String u_age;

    @NotBlank(message = "{validation.required.gender}")
    private String u_gender;

    @Email(message = "{validation.invalid.mail}")
    @NotBlank(message = "{validation.required.mail}")
    private String u_mail;

    @NotBlank(message = "{validation.required.phone}")
    private String u_phone;

}
