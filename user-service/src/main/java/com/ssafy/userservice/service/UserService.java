package com.ssafy.userservice.service;

import com.ssafy.userservice.dto.UserDto;
import com.ssafy.userservice.jpa.UserEntity;
import com.ssafy.userservice.vo.ResponseUser;
import org.springframework.security.core.userdetails.UserDetailsService;


public interface UserService extends UserDetailsService {
    ResponseUser createUser(UserDto userDto);
    UserDto getUserByUserId(String userId);
    Iterable<UserEntity> getUserByAll();

    UserDto getUserDetailByEmail(String username);
}
