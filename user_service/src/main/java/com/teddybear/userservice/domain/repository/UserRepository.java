package com.teddybear.userservice.domain.repository;

import com.teddybear.userservice.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); // 중복 가입 확인

    Optional<User> findByRefreshToken(String refreshToken);

    void deleteById(Long id);

    @Query("SELECT nickname FROM User WHERE id = :userSeq")
    String findNicknameById(@Param("userSeq") Long id);
}
