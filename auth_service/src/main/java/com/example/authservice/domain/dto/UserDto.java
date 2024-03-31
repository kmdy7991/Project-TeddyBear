package com.example.authservice.domain.dto;

import com.example.authservice.domain.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Builder
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String email;
    private int age;
    private String gender;
    private String nickname;
    private int attendance;
    private LocalDateTime videoViewTime;
    private Role role;
    private String refreshToken;
}