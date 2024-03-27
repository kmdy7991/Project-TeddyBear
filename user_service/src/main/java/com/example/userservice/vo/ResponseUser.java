package com.example.userservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.util.List;
@Data
//@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseUser {
    private String email;
    private String nickname;
    private int age;
    private String gender;
    private int attendance;
    private String token;

    private List<ResponseTier> tier;

}
