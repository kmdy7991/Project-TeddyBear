package com.example.categoryservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
@Builder
@Table(name = "video_category")
@AllArgsConstructor
public class VideoCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "video_category_seq")
    private Long videoCategorySeq;

    @ManyToOne
    @JoinColumn(name = "category", nullable = false)
    private Category category;
}
