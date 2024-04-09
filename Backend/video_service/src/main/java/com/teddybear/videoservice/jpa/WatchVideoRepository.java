package com.teddybear.videoservice.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface WatchVideoRepository extends JpaRepository<WatchVideoEntity, Long> {
    List<WatchVideoEntity> findByUserIdAndVideoWatched(Long userId, boolean videoWatched);
    boolean existsByUserIdAndVideoId(Long userId, Long videoId);
    boolean existsByUserIdAndVideo_Id(Long userId, Long videoId);
    WatchVideoEntity findByUserIdAndVideo_Id(Long userId, Long videoId);
}
