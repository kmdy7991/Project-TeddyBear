package com.example.videoservice.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends JpaRepository<NoteEntity, Long> {
//    NoteEntity findByUserIdAndVideo(Long userId, Long videoId);

//    @Query("SELECT n FROM NoteEntity n WHERE n.userId = :userId AND n.video = :video")
//    NoteEntity findByUserIdAndVideo(@Param("userId") Long userId, @Param("video") VideoEntity video);
//
//    NoteEntity findByUserIdAndVideo_Id(Long userId, Long videoId);
    NoteEntity findByUserIdAndVideoId(Long userId, Long videoId);
}
