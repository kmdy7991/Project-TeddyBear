package com.teddybear.videoservice.jpa;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "watch_video")
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class WatchVideoEntity {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private boolean videoWatched;

    @Column(nullable = false)
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "video", nullable = false) // 외래키를 가리키는 컬럼명 지정
    private VideoEntity video;
}
