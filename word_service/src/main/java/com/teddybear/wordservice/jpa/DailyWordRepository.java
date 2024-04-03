package com.teddybear.wordservice.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DailyWordRepository extends JpaRepository<DailyWordEntity, Long> {
}
