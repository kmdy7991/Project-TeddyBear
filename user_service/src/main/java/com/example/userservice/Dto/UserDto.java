package com.example.userservice.Dto;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.Date;

@Getter
public class UserDto {
    private String email;
    private String token;
    private int age;
    private String gender;
    private String nickname;
    private int attendance;
    private Date videoViewTime;

    @Builder(builderMethodName = "signupBuilder")
    public UserDto(String email, String token) {
        this.email = email;
        this.token = token;
    }
}
