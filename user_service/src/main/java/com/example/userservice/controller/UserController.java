package com.example.userservice.controller;

import com.example.userservice.vo.RequestUser;
import com.example.userservice.jpa.UserEntity;
import com.example.userservice.service.UserService;
import com.example.userservice.vo.ResponseUser;
import com.example.userservice.vo.SignupRequestUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user-service")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    @GetMapping("health_check")
    public String status() {
        return "It's Working in User Service";
    }

    @PostMapping("/signup")
    public String createUser(@RequestBody SignupRequestUser user) {
        RequestUser requestUser = RequestUser.builder()
                .email(user.getEmail())
                .token(user.getToken())
                .build();
        userService.createUser(requestUser);

        return "Create user method is called";
    }

    @GetMapping("/users")
    public ResponseEntity<List<ResponseUser>> getUsers() {
        Iterable<UserEntity> userList = userService.getUserByAll();

        List<ResponseUser> result = new ArrayList<>();
        userList.forEach(v -> {
            ResponseUser responseUser = new ResponseUser();
            responseUser.setAge(v.getAge());
            responseUser.setEmail(v.getEmail());
            responseUser.setNickname(v.getNickname());
            responseUser.setGender(v.getGender());
            responseUser.setAttendance(v.getAttendance());
            responseUser.setToken(v.getToken());

            result.add(responseUser);
        });

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/user/{userToken}")
    public ResponseEntity<ResponseUser> getUser(@PathVariable("userToken") String userToken) {
        RequestUser requestUser = userService.getUserByToken(userToken);

        ResponseUser result = new ResponseUser();
        result.setAge(requestUser.getAge());
        result.setEmail(requestUser.getEmail());
        result.setNickname(requestUser.getNickname());
        result.setGender(requestUser.getGender());
        result.setAttendance(requestUser.getAttendance());

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
