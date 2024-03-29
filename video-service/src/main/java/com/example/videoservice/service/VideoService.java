package com.example.videoservice.service;

import com.example.videoservice.jpa.VideoEntity;
import com.example.videoservice.vo.ResponseVideo;

import java.util.List;

public interface VideoService {
    ResponseVideo getVideoById(Long videoId);
    List<VideoEntity> getVideoByTitle(String videoTitle);
    void importVideo() throws Exception;
    void importScript() throws Exception;
    void exportVideoToJson();
    void exportScriptsToJson();

    List<ResponseVideo> getWatchedVideosByUserIdAndWatchedStatus(Long userId, Boolean videoWatched);
}
