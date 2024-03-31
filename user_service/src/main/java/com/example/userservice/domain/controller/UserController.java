package com.example.userservice.domain.controller;

import com.example.userservice.domain.Role;
import com.example.userservice.domain.Tier;
import com.example.userservice.domain.User;
import com.example.userservice.domain.dto.UserDto;
import com.example.userservice.domain.service.UserService;
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

    @PutMapping("/update/{id}")
    public ResponseEntity<UserDto.UserResponse> update(@PathVariable Long id, @RequestBody UserDto.UserUpdateResponse request) throws Exception {
        User user = userService.findById(id);
        UserDto.UserResponse response = UserDto.UserResponse.builder()
                .birthday(request.getBirthday())
                .email(user.getEmail())
                .role(Role.USER)
                .attendance(user.getAttendance())
                .gender(request.getGender())
                .id(user.getId())
                .nickname(request.getNickname())
                .videoViewTime(user.getVideoViewTime())
                .concern(user.getConcern())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        userService.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body("User deleted successfully.");
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDto.UserResponse> findById(@PathVariable Long id) throws Exception {
        User user = userService.findById(id);
        if (user != null) {
            UserDto.UserResponse response = UserDto.UserResponse.builder()
                    .birthday(user.getBirthday())
                    .email(user.getEmail())
                    .role(user.getRole())
                    .attendance(user.getAttendance())
                    .gender(user.getGender())
                    .id(user.getId())
                    .nickname(user.getNickname())
                    .videoViewTime(user.getVideoViewTime())
                    .concern(user.getConcern())
                    .build();

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
    }

    @GetMapping("/tier/{id}")
    public ResponseEntity<UserDto.TierResponse> findByUserId(@PathVariable Long id) {
        Tier tier = userService.findByUserId(id);
        if (tier != null) {
            UserDto.TierResponse response = UserDto.TierResponse.builder()
                    .tierName(tier.getTierName())
                    .tierExp(tier.getTierExp())
                    .level(tier.getLevel())
                    .levelExp(tier.getLevelExp())
                    .build();

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
    }

    @GetMapping("/checkNickname/{id}")
    public ResponseEntity<String> findNicknameById(@PathVariable Long id) {
        String response = userService.findNicknameById(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/checkTier/{id}")
    public ResponseEntity<String> findTierById(@PathVariable Long id) {
        String response = userService.findTierById(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
