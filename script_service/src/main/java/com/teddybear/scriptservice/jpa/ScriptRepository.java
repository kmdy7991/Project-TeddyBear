package com.example.scriptservice.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScriptRepository extends JpaRepository<ScriptEntity, Long> {
    List<ScriptEntity> findByVideoIdOrderByIdAsc(String videoId);
}
