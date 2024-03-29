package com.example.userservice.jpa;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "users" , uniqueConstraints = @UniqueConstraint(name = "VAILD TOKEN", columnNames = {"token"}))

@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserEntity {
    @Id
    @Column(name = "user_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String email;

    @Column(nullable = false,unique = true, length = 100)
    private String token;

    private int age;

    @Column(length = 10)
    private String gender;

    @Column(nullable = false, length = 50)
    private String nickname = "user123";

    @Column(nullable = false, columnDefinition = "integer default 0")
    private int attendance;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime videoViewTime;


    @Builder(builderMethodName = "signupBuilder")
    public UserEntity(String email, String token, int age, String gender, int attendance, LocalDateTime videoViewTime){
        this.email = email;
        this.token = token;
        this.age = age;
        this.gender = gender;
        this.attendance = attendance;
        this.videoViewTime = videoViewTime;
    }
}
