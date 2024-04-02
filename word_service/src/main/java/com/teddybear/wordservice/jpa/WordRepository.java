package com.teddybear.wordservice.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface WordRepository extends JpaRepository<WordEntity, Long> {
    List<WordEntity> findAllByOrderByEngAsc();
    List<WordEntity> findByTier(String tier);

    List<WordEntity> findAllByIdIn(List<Long> wordIds);

}
