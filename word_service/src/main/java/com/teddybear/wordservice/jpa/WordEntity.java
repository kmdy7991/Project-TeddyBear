package com.teddybear.wordservice.jpa;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Entity
@Table(name = "word")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class WordEntity {
    @Id
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

    @OneToMany(mappedBy = "word")
    private List<BookmarkWordEntity> bookmarkHistory;
}
