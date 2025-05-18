package com.movie.movieticketapi.dtos;

import lombok.Data;

@Data
public class UserDto {
    private int u_no;
    private String u_id;
    private String u_pw;
    private String u_nick;
    private String u_age;
    private String u_gender;
    private String u_mail;
    private String u_phone;
    private int u_is_active;
    private String u_is_unactive_date;
    private String u_is_human;
    private String u_is_human_date;
    private String u_reg_date;
    private String u_mod_date;
    private String u_last_login_date;
}
