package com.teddybear.wordservice.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookmarkWordRepository extends JpaRepository<BookmarkWordEntity, Long>  {
    List<BookmarkWordEntity> findByUserId(Long userId);

    void deleteByUserIdAndWordId(Long userId, WordEntity wordId);

    boolean existsByIdAndUserId(Long wordId, Long userId);
}
