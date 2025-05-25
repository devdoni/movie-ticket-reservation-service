package com.movie.movieticketapi.User;

import com.movie.movieticketapi.dto.LoginUserDto;
import com.movie.movieticketapi.dto.RegisterUserDto;
import jakarta.validation.constraints.NotBlank;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int insertNewUser(RegisterUserDto registerUserDto);

    int selectUserCountByUId(String u_id);

    LoginUserDto selectUserByUId(String u_id);
}
