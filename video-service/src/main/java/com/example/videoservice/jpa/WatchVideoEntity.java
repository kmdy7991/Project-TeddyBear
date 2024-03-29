package com.example.videoservice.jpa;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "watch_video")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class WatchVideoEntity {
    @Id
    @Column(name = "w_video_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private boolean videoWatched;

    @Column(nullable = false, length = 500)
    private String thumbnailUrl;

    @Column(nullable = false)
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "video_id", nullable = false) // 외래키를 가리키는 컬럼명 지정
    private VideoEntity videoId;
}
