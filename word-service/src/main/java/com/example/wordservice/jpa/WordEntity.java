package com.example.wordservice.jpa;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
@Getter
@Entity
@Table(name = "ref_word")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WordEntity {

    public WordEntity(Long id) {
        this.id = id;
    }

    @Id
    @Column(name = "word_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String eng;

    @Column(nullable = false)
    private String kor;

    @Column(nullable = false, length = 20)
    private String part;

    @Column(nullable = false, length = 2)
    private String tier;

    @Builder
    public WordEntity(String eng, String kor, String part, String tier) {
        this.eng = eng;
        this.kor = kor;
        this.part = part;
        this.tier = tier;
    }


}
