package com.teddybear.videoservice.jpa;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "video")
public class VideoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String videoTitle;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String videoDescription;

    @Column(nullable = false, length = 500)
    private String videoUrl;

    @Column(nullable = false, length = 100, unique = true)
    private String videoId;

    @Column(nullable = false, length = 50)
    private String videoTime;

    @Column(nullable = false, length = 500)
    private String videoThumbnail;

    @Column(nullable = false, length = 5)
    private String videoGrade;

    @OneToMany(mappedBy = "video")
    private List<WatchVideoEntity> watchHistory;

    @OneToMany(mappedBy = "video")
    private List<BookmarkVideoEntity> bookmarkHistory;

    @OneToMany(mappedBy = "video")
    private List<NoteEntity> noteHistory;

}
