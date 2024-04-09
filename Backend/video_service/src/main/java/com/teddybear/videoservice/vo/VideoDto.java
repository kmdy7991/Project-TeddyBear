package com.teddybear.videoservice.vo;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "translated_script")
public class VideoDto {
    private String video_id;
    private String video_grade;
    private String video_transcript;
}
