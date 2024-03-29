package com.example.videoservice.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.config.RepositoryConfiguration;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface WatchVideoRepository extends JpaRepository<WatchVideoEntity, Long> {
    List<WatchVideoEntity> findByUserIdAndVideoWatchedTrue(Long userId);
}
