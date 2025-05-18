package com.movie.movieticketapi.User;

import com.movie.movieticketapi.dtos.UserDto;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Log4j2
@Service
public class UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public int registeringUser(UserDto userDto) {
        log.info("Registering user: {}", userDto);

        String hashedPassword = passwordEncoder.encode(userDto.getU_pw());
        userDto.setU_pw(hashedPassword);

        return userMapper.insertNewUser(userDto);

    }
}
