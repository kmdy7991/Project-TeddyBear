package com.teddybear.wordservice.jpa;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@Table(name = "daily_word")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class DailyWordEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long wordId;
    private String eng;
    private String kor;
    private String part;
    private String tier;
}

