package com.movie.movieticketapi.User;

import com.movie.movieticketapi.dtos.UserDto;
import lombok.extern.log4j.Log4j2;
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

    @PostMapping("/register")
    public Object registerUser(@RequestBody UserDto userDto) {
        log.info("registerUser()");
        int result = -1;

        log.info("UserDto: {}", userDto);

        if (userDto != null) {
            result = userService.registeringUser(userDto);
            log.info("result : {}", result);
        }

        return result;
    }

}
