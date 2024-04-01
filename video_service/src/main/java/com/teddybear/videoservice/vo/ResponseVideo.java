package com.teddybear.videoservice.vo;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class ResponseVideo {
    private Long id;
    private String videoTitle;
    private String videoDiscription;
    private String videoUrl;
    private String videoId;
    private String videoTime;
    private String videoThumbnail;
    private String videoGrade;
}
