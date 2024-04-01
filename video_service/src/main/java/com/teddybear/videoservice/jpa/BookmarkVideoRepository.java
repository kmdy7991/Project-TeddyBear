package com.teddybear.videoservice.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookmarkVideoRepository extends JpaRepository<BookmarkVideoEntity, Long> {
    List<BookmarkVideoEntity> findByUserId(Long userId);
    List<BookmarkVideoEntity> findByUserIdAndVideoId(Long userId, Long videoId);
    boolean existsByVideoIdAndUserId(Long videoId, Long userId);

}
