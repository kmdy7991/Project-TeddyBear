package com.example.userservice.domain.dto;

import com.example.userservice.domain.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

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
    public static class ExpRequest {
        private boolean isTierExp;
        private int addExp;
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

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserInfoResponse {
        private int age;
        private String gender;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VideoDto {
        private String videoId;
        private String videoGrade;
        private String script;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PythonDto {
        private List<VideoDto> videoDtoList;
        private String concern;
    }
}