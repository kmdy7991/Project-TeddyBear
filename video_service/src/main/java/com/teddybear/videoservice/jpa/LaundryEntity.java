package com.teddybear.videoservice.jpa;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table
public class LaundryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String videoId;

    @Column(nullable = false, length = 500)
    private String videoUrl;

    @Column(nullable = false, length = 500)
    private String videoThumbnail;

    @Column(nullable = false, length = 500)
    private String videoTitle;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String videoDescription;

    @Column(nullable = false, length = 50)
    private String videoPlaytime;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String videoTranscript;

    @Column(nullable = false, length = 5)
    private String videoGrade;
}
