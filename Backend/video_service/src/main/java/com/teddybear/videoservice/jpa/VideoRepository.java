package com.teddybear.videoservice.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface VideoRepository extends JpaRepository<VideoEntity, Long> {
    @Query("SELECT v FROM VideoEntity v WHERE v.videoTitle LIKE %:keyword%")
    List<VideoEntity> searchTitle (String keyword);

    @Query("SELECT v FROM VideoEntity v where v.videoId = :videoId")
    VideoEntity getVideoByVideoId(String videoId);


//    List<VideoEntity> findByVideoTitleContaining(String keyword);
}
