package com.teddybear.userservice.domain.repository;

import com.teddybear.userservice.domain.entity.categoryService.UserCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserCategoryRepository extends JpaRepository<UserCategory, Long> {

    Optional<UserCategory> findByUserId(Long id);
}
