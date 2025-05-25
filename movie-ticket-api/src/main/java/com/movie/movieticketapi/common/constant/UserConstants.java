package com.movie.movieticketapi.common.constant;

public class UserConstants {

    // 알 수 없는 에러
    public static final int UNKNOWN_ERROR = -2;
    // DB 에러시
    public static final int DB_ERROR = -1;
    // 아이디 중복
    public static final int USER_ID_ALREADY_EXIST = 0;
    // 회원가입 성공
    public static final int USER_INSERT_SUCCESS = 1;
    // 검증 오류
    public static final int USER_VALIDATE_FAIL = 2;
    // 로그인 실패
    public static final int USER_LOGIN_FAIL = 3;
    // 로그인 성공
    public static final int USER_LOGIN_SUCCESS = 4;
}
