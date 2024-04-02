package com.teddybear.categoryservice.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@Table(name = "video_category")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VideoCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "video_category_seq")
    private Long videoCategorySeq;

    @Column(name = "video_id")
    private String videoId;

    @Column(name = "category")
    private String category;



    // 수정이 필요해 보임 -----------------------------
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "category", nullable = false)
//    private Category category;
    // ---------------------------------------------


    @Builder
    public VideoCategory(String videoId, String category){
        this.videoId = videoId;
        this.category = category;
    }
}
