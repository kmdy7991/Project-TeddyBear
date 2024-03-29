package com.example.videoservice.jpa;

import com.fasterxml.jackson.annotation.JsonTypeId;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "video", uniqueConstraints = @UniqueConstraint(name = "unique_video_id", columnNames = {"videoId"}))
public class VideoEntity {
    @Id
    @Column(name = "video_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String videoTitle;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String videoDescription;

    @Column(nullable = false, length = 500)
    private String videoUrl;

    @Column(nullable = false, length = 100)
    private String videoId;

    @Column(nullable = false, length = 50)
    private String videoTime;

    @Column(nullable = false, length = 500)
    private String videoThumbnail;

    @Column(nullable = false, length = 5)
    private String videoGrade;

}
