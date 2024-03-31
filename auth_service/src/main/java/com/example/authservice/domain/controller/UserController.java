package com.example.authservice.domain.controller;

import com.example.authservice.domain.User;
import com.example.authservice.domain.dto.UserDto;
import com.example.authservice.domain.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user-service")
public class UserController {

    private final UserService userService;

    // 생성자를 통한 의존성 주입
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("health_check")

    public String status() {
        return "It's Working in User Service";
    }

    @GetMapping("user/{id}")
    public ResponseEntity<UserDto> findById(@PathVariable Long id) throws Exception {
        User user = userService.findById(id);
        if (user != null) {
            UserDto userDto = UserDto.builder()
                    .age(user.getAge())
                    .email(user.getEmail())
                    .role(user.getRole())
                    .attendance(user.getAttendance())
                    .gender(user.getGender())
                    .id(user.getId())
                    .nickname(user.getNickname())
                    .refreshToken(user.getRefreshToken())
                    .videoViewTime(user.getVideoViewTime())
                    .build();

            return ResponseEntity.status(HttpStatus.OK).body(userDto);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }

    }

    @PostMapping("sign_up")
    public String signUp(@RequestBody UserDto userDto) throws Exception {
        userService.signUp(userDto);
        return "회원가입 성공";
    }
}
