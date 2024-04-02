package com.teddybear.categoryservice.repository;

import com.teddybear.categoryservice.entity.VideoCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<VideoCategory, Long> {
}
