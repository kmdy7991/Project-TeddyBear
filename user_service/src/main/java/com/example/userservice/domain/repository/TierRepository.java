package com.example.userservice.domain.repository;

import com.example.userservice.domain.Tier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@Repository
public interface TierRepository extends JpaRepository<Tier, Long> {
    Optional<Tier> findByUserId(Long userSeq);

    @Query("SELECT tierName FROM Tier WHERE user.id = :id")
    String findTierById(@Param("id") Long id);
}
