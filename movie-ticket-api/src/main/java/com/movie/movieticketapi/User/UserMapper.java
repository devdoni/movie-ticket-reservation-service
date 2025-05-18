package com.movie.movieticketapi.User;

import com.movie.movieticketapi.dtos.UserDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int insertNewUser(UserDto userDto);
}
