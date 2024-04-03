package com.teddybear.categoryservice.repository;

import com.teddybear.categoryservice.entity.UserCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserCategoryRepository extends JpaRepository<UserCategory, Long> {
    @Query("SELECT u FROM UserCategory u WHERE u.user.id = :id")
    Optional<UserCategory> findByUserId(Long id);
}
