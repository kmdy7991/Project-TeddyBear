package com.teddybear.videoservice.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<NoteEntity, Long> {
    NoteEntity findByUserIdAndVideoId(Long userId, Long videoId);
    List<NoteEntity> findByUserId(Long userId);
    @Transactional
    void deleteByUserIdAndVideoId(Long userId, Long videoId);
}
