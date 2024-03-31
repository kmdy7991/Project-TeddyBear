package com.example.authservice.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
@Builder
@Table(name = "users")
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_seq")
    private Long id;

    @Column(nullable = false)
    private String email;

    private int age;

    @Column(length = 10)
    private String gender;

    private String nickname = "user123";

    @Column(nullable = false, columnDefinition = "integer default 0")
    private int attendance;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime videoViewTime;

    @Enumerated(EnumType.STRING) // Enum 값을 어떤 형태로 정할지, Enum 타입은 문자열 형태로 저장(default = int)
    @Column(nullable = false)
    private Role role;

    private String refreshToken; // 리프레시 토큰

    // 유저 권한 설정 메소드
    public void authorizeUser() {
        this.role = Role.GUEST;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }

    public void updateRefreshToken(String updateRefreshToken) {
        this.refreshToken = updateRefreshToken;
    }
}