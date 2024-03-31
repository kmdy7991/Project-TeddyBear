package com.example.authservice.domain.service;

import com.example.authservice.domain.User;
import com.example.authservice.domain.dto.UserDto;

public interface UserService {
    void signUp(UserDto userDto) throws Exception;
    User findById(Long id) throws Exception;
}
