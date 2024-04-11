package com.teddybear.wordservice.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

@Repository
public interface BookmarkWordRepository extends JpaRepository<BookmarkWordEntity, Long>  {
    List<BookmarkWordEntity> findByUserId(Long userId);

//    void deleteByUserIdAndWordId(Long userId, WordEntity wordId);

    @Modifying
    @Query("DELETE FROM BookmarkWordEntity b WHERE b.userId = :userId AND b.word.id = :wordId")
    void deleteWord(Long userId, Long wordId);

    boolean existsByIdAndUserId(Long wordId, Long userId);
}
