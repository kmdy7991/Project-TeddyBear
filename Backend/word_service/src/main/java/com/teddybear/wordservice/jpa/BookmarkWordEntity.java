package com.teddybear.wordservice.jpa;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@Table(name = "bookmark_word")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class BookmarkWordEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "word", nullable = false)
    private WordEntity word;

    private Long  userId;

}
