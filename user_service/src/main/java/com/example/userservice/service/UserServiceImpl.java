package com.example.userservice.service;

import com.example.userservice.Dto.UserDto;
import com.example.userservice.jpa.UserEntity;
import com.example.userservice.jpa.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Override
    public UserDto createUser(UserDto userDto) {
        UserEntity userEntity = UserEntity.signupBuilder()
                .email(userDto.getEmail())
                .token(userDto.getToken())
                .build();
        userRepository.save(userEntity);
        return null;
    }
}
