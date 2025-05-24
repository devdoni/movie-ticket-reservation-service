package com.movie.movieticketapi.common.constant;

public class RegexPatterns {

    // ID, PW, NICK 정규식 관리
    public static final String ID = "^[a-zA-Z0-9]{1,20}$";
    public static final String PW = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$";
    public static final String NICK = "^[a-zA-Z0-9가-힣]{1,20}$";
}
