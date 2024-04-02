package com.teddybear.videoservice.vo;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VideoDto {
    private String videoId;
    private String videoGrade;
    private String script;
}
