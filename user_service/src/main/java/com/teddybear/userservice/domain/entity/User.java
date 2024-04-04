package com.teddybear.userservice.domain.entity;

import com.teddybear.userservice.domain.entity.categoryService.UserCategory;
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

    @OneToOne(mappedBy = "user", orphanRemoval = true)
    @JoinColumn(name = "tier_seq")
    private Tier tier;

    @OneToOne(mappedBy = "user", orphanRemoval = true)
    @JoinColumn(name = "user_category_seq")
    private UserCategory userCategory;

    @Column(nullable = false)
    private String email;

    private String birthday;

    @Column(length = 10)
    private String gender;

    private String nickname;

    @Column(nullable = false, columnDefinition = "integer default 0")
    private int attendance;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime videoViewTime;

    @Enumerated(EnumType.STRING) // Enum 값을 어떤 형태로 정할지, Enum 타입은 문자열 형태로 저장(default = int)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false, columnDefinition = "text")
    private String concern;

    private String refreshToken; // 리프레시 토큰

    public void updateRefreshToken(String updateRefreshToken) {
        this.refreshToken = updateRefreshToken;
    }
}