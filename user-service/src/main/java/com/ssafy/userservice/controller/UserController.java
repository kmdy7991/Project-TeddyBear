package com.ssafy.userservice.controller;

import com.ssafy.userservice.dto.UserDto;
import com.ssafy.userservice.service.UserService;
import com.ssafy.userservice.vo.RequestUser;
import com.ssafy.userservice.vo.ResponseUser;
import io.micrometer.core.annotation.Timed;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserController {
    private final Environment env;
    private final UserService userService;

    @GetMapping("/health-check")
    @Timed(value = "users.status", longTask = true)
    public String status() {
        return String.format("It's Working in User Service"
                + ", port(local.server.port)=" + env.getProperty("local.server.port")
                + ", port(server.port)=" + env.getProperty("server.port")
                + ", token secret=" + env.getProperty("token.secret")
                + ", token expiration time=" + env.getProperty("token.expiration_time")
                + ", rabbit mq =" + env.getProperty("spring.rabbitmq.host")
                + ", token expiration time=" + env.getProperty("greeting.message")
        );
    }

    @PostMapping("/users")
    public ResponseEntity<ResponseUser> createUser(@RequestBody RequestUser requestUser) {
        UserDto userDto = UserDto.builder()
                .name(requestUser.getName())
                .email(requestUser.getEmail())
                .pwd(requestUser.getPwd())
                .build();

        userDto.setUserId();

        ResponseUser responseUser = userService.createUser(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseUser);
    }

    @GetMapping("/users")
    public ResponseEntity<List<ResponseUser>> getUsers() {
        List<ResponseUser> res = new ArrayList<>();

        userService.getUserByAll().forEach(v -> {
            res.add(
                    ResponseUser.builder()
                            .userId(v.getUserId())
                            .email(v.getEmail())
                            .name(v.getName())
                            .build()
            );
        });
        return ResponseEntity.ok(res);
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<ResponseUser> getUser(@PathVariable("userId") String userId) {
        UserDto userDto = userService.getUserByUserId(userId);

        ResponseUser findUser = ResponseUser.builder()
                .userId(userDto.getUserId())
                .email(userDto.getEmail())
                .name(userDto.getName())
                .orders(userDto.getOrders())
                .build();
        return ResponseEntity.ok(findUser);
    }
}