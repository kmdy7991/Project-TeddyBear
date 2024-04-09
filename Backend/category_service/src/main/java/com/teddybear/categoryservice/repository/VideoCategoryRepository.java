package com.teddybear.categoryservice.repository;

import com.teddybear.categoryservice.entity.VideoCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VideoCategoryRepository extends JpaRepository<VideoCategory, Long> {
    @Query("SELECT videoId From VideoCategory WHERE category = :category")
    List<String> findVideoIdByCategory(@Param("category") String category);

    @Query("SELECT category From VideoCategory WHERE videoId = :videoId")
    String findCategoryByVideoId(@Param("videoId") String videoId);
}
