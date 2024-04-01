package com.teddybear.videoservice.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface WatchVideoRepository extends JpaRepository<WatchVideoEntity, Long> {
    List<WatchVideoEntity> findByUserIdAndVideoWatched(Long userId, boolean videoWatched);
}
