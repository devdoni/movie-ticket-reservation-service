package com.movie.movieticketapi.User;

import com.movie.movieticketapi.dto.RegisterUserDto;
import com.movie.movieticketapi.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int insertNewUser(RegisterUserDto registerUserDto);

    int selectUserByUId(String u_id);
}
