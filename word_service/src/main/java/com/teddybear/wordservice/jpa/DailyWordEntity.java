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
    @OneToOne
    @JoinColumn(name = "word_id", referencedColumnName = "id")
    private WordEntity word;
}
