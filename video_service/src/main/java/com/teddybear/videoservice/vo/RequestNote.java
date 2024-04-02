package com.teddybear.videoservice.vo;

import com.teddybear.videoservice.jpa.VideoEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class RequestNote {
    private Long userId;
    private Long videoId;
    private String note;
}
