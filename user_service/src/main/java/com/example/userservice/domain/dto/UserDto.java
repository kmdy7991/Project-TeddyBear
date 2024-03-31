package com.example.userservice.domain.dto;

import com.example.userservice.domain.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class UserDto {
    @NoArgsConstructor
    @Getter
    @Builder
    @AllArgsConstructor
    public static class UserResponse {
        private Long id;
        private String email;
        private String birthday;
        private String gender;
        private String nickname;
        private int attendance;
        private LocalDateTime videoViewTime;
        private Role role;
        private String concern;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TierResponse {
        private String tierName;
        private Long tierExp;
        private int level;
        private Long levelExp;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserUpdateResponse {
        private String birthday;
        private String gender;
        private String nickname;
    }
}