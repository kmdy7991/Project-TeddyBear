package com.example.authservice.domain.repository;

import com.example.authservice.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); // 중복 가입 확인

    Optional<User> findByRefreshToken(String refreshToken);
}
