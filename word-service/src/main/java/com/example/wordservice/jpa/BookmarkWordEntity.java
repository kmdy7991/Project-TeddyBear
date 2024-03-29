package com.example.wordservice.jpa;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "bookmark_word")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BookmarkWordEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bm_word_seq")
    private Long id;

//    @ManyToOne(fetch = FetchType.LAZY)
    @ManyToOne
    @JoinColumn(name = "word_seq")
    private WordEntity wordId;

    @Column(name = "user_seq")
    private Long  userId;

    @Builder
    public BookmarkWordEntity(WordEntity wordId, Long userId){
        this.wordId = wordId;
        this.userId = userId;
    }
}
