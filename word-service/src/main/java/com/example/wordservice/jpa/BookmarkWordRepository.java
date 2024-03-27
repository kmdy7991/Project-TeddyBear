package com.example.wordservice.jpa;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookmarkWordRepository extends JpaRepository<BookmarkWordEntity, Long>  {
    List<BookmarkWordEntity> findByUserId(Long userId);

    void deleteByUserIdAndWordId(Long userId, WordEntity wordId);


}
