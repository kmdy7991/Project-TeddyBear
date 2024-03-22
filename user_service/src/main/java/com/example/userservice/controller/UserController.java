package com.example.userservice.controller;

import com.example.userservice.Dto.UserDto;
import com.example.userservice.service.UserService;
import com.example.userservice.vo.SignupRequestUser;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
        UserDto userDto = UserDto.signupBuilder()
                .email(user.getEmail())
                .token(user.getToken())
                .build();
        userService.createUser(userDto);

        return "Create user method is called";
    }
}
