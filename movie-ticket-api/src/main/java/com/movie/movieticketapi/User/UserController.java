package com.movie.movieticketapi.User;

import com.movie.movieticketapi.common.constant.UserConstants;
import com.movie.movieticketapi.dto.ApiResponse;
import com.movie.movieticketapi.dto.RegisterUserDto;
import com.movie.movieticketapi.dto.UserDto;
import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

            return ResponseEntity.ok(new ApiResponse<>(false, "존재하는 아이디", result));

        } else if (result == UserConstants.DB_ERROR) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, "서버 오류", result));
        } else if (result == UserConstants.UNKNOWN_ERROR) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(false, "알 수 없는 오류", result));
        }

        return ResponseEntity.ok(result);
    }

}
