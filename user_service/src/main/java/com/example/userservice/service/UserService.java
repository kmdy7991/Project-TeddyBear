package com.example.userservice.service;

import com.example.userservice.vo.RequestUser;
import com.example.userservice.jpa.UserEntity;

public interface UserService {
    RequestUser createUser(RequestUser requestUser);
    RequestUser getUserByToken(String token);

    Iterable<UserEntity> getUserByAll();
}
