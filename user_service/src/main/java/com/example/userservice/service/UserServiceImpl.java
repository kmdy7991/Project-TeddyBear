package com.example.userservice.service;

import com.example.userservice.vo.RequestUser;
import com.example.userservice.jpa.UserEntity;
import com.example.userservice.jpa.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Override
    public RequestUser createUser(RequestUser requestUser) {
        UserEntity userEntity = UserEntity.signupBuilder()
                .email(requestUser.getEmail())
                .token(requestUser.getToken())
                .build();
        userRepository.save(userEntity);
        return null;
    }

    @Override
    public RequestUser getUserByToken(String token) {
        UserEntity userEntity = userRepository.findByToken(token);

        if(userEntity == null)
            return null;

        RequestUser requestUser = RequestUser.builder()
                .email(userEntity.getEmail())
                .token(userEntity.getToken())
                .age(userEntity.getAge())
                .gender(userEntity.getGender())
                .nickname(userEntity.getNickname())
                .attendance(userEntity.getAttendance())
                .build();

        String wordUrl = "http://localhost:8081/order-service/%s/bookmarkWords";

        return requestUser;


    }

    @Override
    public Iterable<UserEntity> getUserByAll() {
        return userRepository.findAll();
    }
}
