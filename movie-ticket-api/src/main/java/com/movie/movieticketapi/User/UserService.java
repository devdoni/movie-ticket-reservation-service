package com.movie.movieticketapi.User;

import com.movie.movieticketapi.common.constant.UserConstants;
import com.movie.movieticketapi.dto.LoginUserDto;
import com.movie.movieticketapi.dto.RegisterUserDto;
import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;
import org.springframework.dao.DataAccessException;
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

    // 유저 회원가입 처리 서비스
    public int registeringUser(RegisterUserDto registerUserDto) {
        log.info("registeringUser()");

        try {
            // 아이디 중복체크
            int result = userMapper.selectUserCountByUId(registerUserDto.getU_id());

            if (result > 0) {
                return UserConstants.USER_ID_ALREADY_EXIST;
            }
            // 중복 체크 통과시 패스워드 해시후 데이터베이스 커넥션
            String hashedPassword = passwordEncoder.encode(registerUserDto.getU_pw());

            registerUserDto.setU_pw(hashedPassword);

            return userMapper.insertNewUser(registerUserDto);
        } catch (DataAccessException dae) {
            log.error("DB 접근 중 오류 발생 : {}", dae.getMessage());
            return UserConstants.DB_ERROR;

        } catch (Exception e) {
            log.error("알 수 없는 오류 발생 : {}", e.getMessage(), e);
            return UserConstants.UNKNOWN_ERROR;
        }
    }

    public int userLoginService(@Valid LoginUserDto loginUserDto) {
        log.info("userLoginService()");

        try {
            LoginUserDto dbUser = userMapper.selectUserByUId(loginUserDto.getU_id());

            if (dbUser == null) {
                log.info("User not found");
                return UserConstants.USER_LOGIN_FAIL;
            }

            boolean isPasswordMatch = passwordEncoder.matches(loginUserDto.getU_pw(), dbUser.getU_pw());

            if (!isPasswordMatch) {
                log.info("Password mismatch");
                return UserConstants.USER_LOGIN_FAIL;
            }

            log.info("Login successful");
            return UserConstants.USER_LOGIN_SUCCESS;

        } catch (DataAccessException dae) {
            log.error("DB access error: {}", dae.getMessage());
            return UserConstants.DB_ERROR;

        } catch (Exception e) {
            log.error("Unknown error occurred: {}", e.getMessage(), e);
            return UserConstants.UNKNOWN_ERROR;
        }
    }
}
