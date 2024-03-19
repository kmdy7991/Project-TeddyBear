package com.ssafy.userservice.jpa;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50, unique = true)
    private String email;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = false, unique = true)
    private String userId;

    @Column(nullable = false, unique = true)
    private String encryptPwd;

    @Builder
    public UserEntity(String email, String name, String userId){
        this.email = email;
        this.name = name;
        this.userId = userId;
    }

    public void setPassword(String encryptPwd){
        this.encryptPwd = encryptPwd;
    }
}