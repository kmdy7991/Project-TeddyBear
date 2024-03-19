package com.ssafy.userservice.dto;

import com.ssafy.userservice.vo.ResponseOrder;
import com.ssafy.userservice.vo.ResponseUser;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.apache.catalina.User;
import org.hibernate.query.Order;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserDto {
    private String email;
    private String name;
    private String pwd;
    private String userId;
    private LocalDate createAt;
    private String encryptPwd;

    private List<ResponseOrder> orders;

    public void setUserId() {
        this.userId = UUID.randomUUID().toString();
    }

    public void setOrder(List<ResponseOrder> order) {
        this.orders = order;
    }

    @Builder
    public UserDto(String userId, String name, String email, String pwd) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.pwd = pwd;
    }
}
