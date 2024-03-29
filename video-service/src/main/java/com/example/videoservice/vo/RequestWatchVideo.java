package com.example.videoservice.vo;

import com.example.videoservice.jpa.VideoEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class RequestWatchVideo {
    private boolean videoWatched;
    private Long userId;
    private Long videoId;
}
