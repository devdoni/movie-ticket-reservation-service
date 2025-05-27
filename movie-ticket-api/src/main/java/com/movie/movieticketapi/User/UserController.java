package com.movie.movieticketapi.User;

import com.movie.movieticketapi.common.constant.UserConstants;
import com.movie.movieticketapi.common.utils.JwtUtil;
import com.movie.movieticketapi.dto.ApiResponse;
import com.movie.movieticketapi.dto.LoginResponse;
import com.movie.movieticketapi.dto.LoginUserDto;
import com.movie.movieticketapi.dto.RegisterUserDto;
import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 유저 회원가입 요청
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterUserDto registerUserDto) {
        log.info("registerUser()");

        int result = userService.registeringUser(registerUserDto);

        if (result == UserConstants.USER_INSERT_SUCCESS) {
            return ResponseEntity.ok(new ApiResponse<>(true, "회원가입 성공", result));

        } else if (result == UserConstants.USER_ID_ALREADY_EXIST) {

            return ResponseEntity.ok(new ApiResponse<>(true, "존재하는 아이디", result));

        } else if (result == UserConstants.DB_ERROR) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, "서버 오류", result));

        } else if (result == UserConstants.UNKNOWN_ERROR) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(false, "알 수 없는 오류", result));
        }

        return ResponseEntity.ok(result);
    }

    // 유저 로그인 요청
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginUserDto loginUserDto) {
        log.info("loginUser()");

        int result = userService.userLoginService(loginUserDto);

        if (result == UserConstants.USER_LOGIN_SUCCESS) {
            try {
                LoginResponse loginResponse = userService.generateToken(loginUserDto.getU_id());
                ResponseCookie cookie = ResponseCookie.from("token", loginResponse.getToken())
                        .httpOnly(true)
                        .secure(true)
                        .sameSite("Strict")
                        .path("/")
                        .maxAge(3600)
                        .build();

                return ResponseEntity
                        .ok()
                        .header(HttpHeaders.SET_COOKIE, cookie.toString())
                        .body(new ApiResponse<>(true, "로그인 성공", result));

            } catch (RuntimeException e) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse<>(false, e.getMessage(), UserConstants.UNAUTHORIZED_ERROR));

            }

        } else if (result == UserConstants.USER_LOGIN_FAIL) {
            return ResponseEntity.ok(new ApiResponse<>(true, "로그인 실패", result));

        } else if (result == UserConstants.DB_ERROR) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(false, "DB 오류", result));


        } else if (result == UserConstants.UNKNOWN_ERROR) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse<>(false, "알 수 없는 오류", result));

        }

        return ResponseEntity.ok(result);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        log.info("logout()");

        try {
            ResponseCookie deleteCookie = ResponseCookie.from("token", "")
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .sameSite("Strict")
                    .maxAge(0)
                    .build();

            return ResponseEntity
                    .ok()
                    .header(HttpHeaders.SET_COOKIE, deleteCookie.toString())
                    .body((new ApiResponse<>(true, "로그아웃 완료", UserConstants.USER_LOGOUT_SUCCESS)));

        } catch (RuntimeException e) {
            log.info("AUTHORIZE ERROR : {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse<>(false, e.getMessage(), UserConstants.UNAUTHORIZED_ERROR));
        }


    }

}
