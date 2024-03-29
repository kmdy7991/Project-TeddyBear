package com.example.videoservice.controller;

import com.example.videoservice.jpa.VideoEntity;
import com.example.videoservice.service.VideoService;
import com.example.videoservice.vo.RequestBookmarkVideo;
import com.example.videoservice.vo.RequestWatchVideo;
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
//        System.out.println("Controller Received videoTitle: " + videoTitle);
//        log.info("list size = {}", responseVideos.get(0).getVideoTitle());
        List<ResponseVideo> responseVideos = videoService.getVideoByTitle(videoTitle);
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

    @PostMapping("/watch") // 시청 영상 생성
    public ResponseEntity<String> watchVideo(@RequestBody RequestWatchVideo requestWatchVideo) {
        videoService.watchVideo(requestWatchVideo);
        return ResponseEntity.status(HttpStatus.OK).body("Watched video saved successfully.");
    }

    @PostMapping("/bookmarkVideo") // 북마크 영상 생성
    public ResponseEntity<String> bookmarkVideo(@RequestBody RequestBookmarkVideo requestBookmarkVideo) {
        videoService.bookmarkVideo(requestBookmarkVideo);
        return ResponseEntity.status(HttpStatus.OK).body("Video bookmarked successfully.");

    }

    @GetMapping("/bookmarkVideo/{userId}") // 북마크 영상 조회
    public ResponseEntity<List<ResponseVideo>> getBookmarkVideo(@PathVariable Long userId) {
        List<ResponseVideo> responseVideos = videoService.getVideoByUserId(userId);

        return ResponseEntity.status(HttpStatus.OK).body(responseVideos);
    }

    @DeleteMapping("/bookmarkVideo") // 북마크 영상 삭제
    public ResponseEntity<String> deleteBookmarkedVideo(@RequestBody RequestBookmarkVideo requestBookmarkVideo) {
        videoService.deleteBookmarkedVideo(requestBookmarkVideo);
        return ResponseEntity.status(HttpStatus.OK).body("Bookmarked video deleted successfully.");
    }


}
