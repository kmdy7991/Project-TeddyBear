package com.example.userservice.vo;

import com.example.userservice.vo.ResponseTier;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;
import java.util.List;

@Getter
@Builder
public class RequestUser {
    private String email;
    private String nickname;
    private int age;
    private String gender;
    private int attendance;
    private String token;
    private Date videoViewTime;

    private List<ResponseTier> tier;

}
