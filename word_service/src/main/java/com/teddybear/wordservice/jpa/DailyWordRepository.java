package com.teddybear.wordservice.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DailyWordRepository extends JpaRepository<DailyWordEntity, Long> {
    List<DailyWordEntity> findByTier(String tier);
}
