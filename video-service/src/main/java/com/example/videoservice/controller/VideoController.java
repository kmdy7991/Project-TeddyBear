package com.example.videoservice.controller;

import com.example.videoservice.jpa.VideoEntity;
import com.example.videoservice.service.VideoService;
import com.example.videoservice.vo.ResponseVideo;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/video-service")
public class VideoController {
    private final VideoService videoService;
    @Autowired
    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @GetMapping("/video/{videoId}") // 영상상세보기
    public ResponseEntity<ResponseVideo> getVideo(@PathVariable Long videoId) {
        ResponseVideo responseVideo = videoService.getVideoById(videoId);

        return ResponseEntity.status(HttpStatus.OK).body(responseVideo);
    }

    @GetMapping("/videos/{videoTitle}") // 제목으로 검색
    public ResponseEntity<List<ResponseVideo>> getVideos(@PathVariable String videoTitle) {
        System.out.println("Controller Received videoTitle: " + videoTitle);
        List<VideoEntity> videoEntities = videoService.getVideoByTitle(videoTitle);
//        log.info("list size = {}", videoEntities.size());
//        log.info("list size = {}", videoEntities.get(0));

        List<ResponseVideo> responseVideos = new ArrayList<>();
        if (videoEntities != null) {
            for (VideoEntity videoEntity : videoEntities) {
                ResponseVideo video = ResponseVideo.builder()
                        .id(videoEntity.getId())
                        .videoTitle(videoEntity.getVideoTitle())
                        .videoDiscription(videoEntity.getVideoDescription())
                        .videoUrl(videoEntity.getVideoUrl())
                        .videoId(videoEntity.getVideoId())
                        .videoTime(videoEntity.getVideoTime())
                        .videoThumbnail(videoEntity.getVideoThumbnail())
                        .videoGrade(videoEntity.getVideoGrade())
                        .build();
                responseVideos.add(video);
            }
        }
        log.info("list size = {}", responseVideos.get(0).getVideoTitle());

        return ResponseEntity.status(HttpStatus.OK).body(responseVideos);
    }

    @PostMapping("/importVideos") // 영상 넣기
    public ResponseEntity<String> importVideo() {
        try {
            videoService.importVideo();
            return ResponseEntity.status(HttpStatus.OK).body("Videos imported successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to import videos: " + e.getMessage());
        }
    }


    @PostMapping("/importScript") // 스크립트 넣기
    public ResponseEntity<String> importScript() {
        try {
            videoService.importScript();
            return ResponseEntity.status(HttpStatus.OK).body("Script imported successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to import script: " + e.getMessage());
        }
    }

    @GetMapping("/exportVideo") // 영상 빼내기
    public ResponseEntity<String> exportVideoToJson() {
        try {
            videoService.exportVideoToJson();
            return ResponseEntity.status(HttpStatus.OK).body("Video exported successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to export video: " + e.getMessage());
        }

    }

    @GetMapping("/exportScript") // 스크립트 빼내기
    public ResponseEntity<String> exportScriptToJson() {
        try {
            videoService.exportScriptsToJson();
            return ResponseEntity.status(HttpStatus.OK).body("Script exported successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to export script: " + e.getMessage());
        }

    }

    @GetMapping("/watch/{userId}") // 시청 영상 조회
    public ResponseEntity<List<ResponseVideo>> getWatchedVideosByUserId(
            @PathVariable Long userId,
            @RequestParam(value = "videoWatched", defaultValue = "false") Boolean videoWatched) {
        // videoWatched가 true이면 시청한 동영상 반환
        // videoWatched가 false이면 시청하지 않은 동영상 반환
        List<ResponseVideo> watchedVideos = videoService.getWatchedVideosByUserIdAndWatchedStatus(userId, videoWatched);
        return ResponseEntity.ok(watchedVideos);
    }


}
