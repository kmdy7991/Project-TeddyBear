package com.teddybear.videoservice.controller;

import com.teddybear.videoservice.service.VideoService;
import com.teddybear.videoservice.vo.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@Slf4j
@EnableFeignClients
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

    @GetMapping("/videoDetail/{videoId}") // videoId로 상세 조회
    public ResponseEntity<ResponseVideo> getVideoDetail(@PathVariable String videoId) {
        ResponseVideo response = videoService.getVideoByVideoId(videoId);
        if (response != null) {
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @GetMapping("/videos/user/{userId}") // 유저 맞춤 영상 추천
    public ResponseEntity<List<ResponseRecommendDto>> getTailoredVideos(@PathVariable("userId") Long userId) {
        log.info("userId in = {}", userId);
        List<ResponseRecommendDto> response = videoService.getTailoredVideos(userId);
        if (response != null) {
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
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

    @GetMapping("/exportVideo") // 영상 빼내기
    public ResponseEntity<String> exportVideoToJson() {
        try {
            videoService.exportVideoToJson();
            return ResponseEntity.status(HttpStatus.OK).body("Video exported successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to export video: " + e.getMessage());
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

    @PutMapping("/watch") // 시청 영상 수정
    public ResponseEntity<String> updateWatchVideo(@RequestBody RequestWatchVideo requestWatchVideo) {
        try {
            videoService.updateWatchVideo(requestWatchVideo);
            return ResponseEntity.ok("Watch status updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update watch status: " + e.getMessage());
        }
    }

    @PostMapping("/bookmarkVideo") // 북마크 영상 생성
    public ResponseEntity<String> bookmarkVideo(@RequestBody RequestBookmarkVideo requestBookmarkVideo) {
        videoService.bookmarkVideo(requestBookmarkVideo);
        return ResponseEntity.status(HttpStatus.OK).body("Video bookmarked successfully.");

    }

    @GetMapping("/bookmarkVideo/{userId}") // 북마크 영상 조회
    public ResponseEntity<List<ResponseVideo>> getBookmarkVideo(@PathVariable Long userId) {
        List<ResponseVideo> responseVideos = videoService.getVideoByUserId(userId);

        if (responseVideos != null) {
            return ResponseEntity.status(HttpStatus.OK).body(responseVideos);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/bookmarkVideo") // 북마크 영상 삭제
    public ResponseEntity<String> deleteBookmarkedVideo(@RequestBody RequestBookmarkVideo requestBookmarkVideo) {
        videoService.deleteBookmarkedVideo(requestBookmarkVideo);
        return ResponseEntity.status(HttpStatus.OK).body("Bookmarked video deleted successfully.");
    }

    @PostMapping("/note") // 필기노트 생성
    public ResponseEntity<String> bookmarkVideo(@RequestBody RequestNote requestNote) {
        videoService.createNote(requestNote);
        return ResponseEntity.status(HttpStatus.OK).body("note create successfully.");

    }

    @GetMapping("/note/{userId}/{videoId}") // 필기노트 1개 조회
    public ResponseEntity<ResponseNote> getNote(@PathVariable Long userId, @PathVariable Long videoId) {
        ResponseNote responseNote = videoService.getNote(userId, videoId);
//        System.out.println("responseNote: " + responseNote.getVideo().getId());
        if (responseNote != null) {
            return ResponseEntity.status(HttpStatus.OK).body(responseNote);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
    }

    @GetMapping("/note/{noteId}") // 필기노트 1개 조회
    public ResponseEntity<ResponseNote> getNote(@PathVariable Long noteId) {
        ResponseNote responseNote = videoService.getNoteByNoteId(noteId);
//        System.out.println("responseNote: " + responseNote.getVideo().getId());
        if (responseNote != null) {
            return ResponseEntity.status(HttpStatus.OK).body(responseNote);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
    }

    @GetMapping("/notes/{userId}") // 사용자별 필기노트 리스트 조회
    public ResponseEntity<List<ResponseNote>> getNotes(@PathVariable Long userId) {
        List<ResponseNote> responseNotes = videoService.getNoteByUserId(userId);

        return ResponseEntity.status(HttpStatus.OK).body(responseNotes);
    }

    @DeleteMapping("/note/{userId}/{videoId}") // 필기노트 1개 삭제
    public ResponseEntity<String> deleteNote(@PathVariable Long userId, @PathVariable Long videoId) {
        videoService.deleteNote(userId, videoId);

        return ResponseEntity.status(HttpStatus.OK).body("Note deleted successfully.");
    }

    @DeleteMapping("/note/{noteId}") // 필기노트 1개 삭제
    public ResponseEntity<String> deleteNote(@PathVariable Long noteId) {
        videoService.deleteNoteByNoteId(noteId);

        return ResponseEntity.status(HttpStatus.OK).body("Note deleted successfully.");
    }

    @GetMapping("/bookmarkVideo/isExist") // 북마크 영상 유무
    public ResponseEntity<Boolean> existBookmarkVideo(
            @RequestParam Long userId,
            @RequestParam Long videoId
    ) {
        RequestBookmarkVideo requestBookmarkVideo = new RequestBookmarkVideo(userId, videoId);
        boolean isExist = videoService.existBookmarkVideo(requestBookmarkVideo);

        return ResponseEntity.status(HttpStatus.OK).body(isExist);
    }

    @PutMapping("/note/{noteId}") // 필기노트 수정
    public ResponseEntity<String> updateNote(@PathVariable Long noteId, @RequestBody UpdateNote  updatedNote) {
        boolean success = videoService.updateNoteByNoteId(noteId, updatedNote);
        if (success) {
            return ResponseEntity.ok("Note updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Note not found");
        }
    }

    @PutMapping("/note/{userId}/{videoId}") // 필기노트 수정
    public ResponseEntity<String> updateNote(@PathVariable Long userId, @PathVariable Long videoId, @RequestBody UpdateNote  updatedNote) {
        boolean isUpdated = videoService.updateNoteContent(userId, videoId, updatedNote);
        if (isUpdated) {
            return ResponseEntity.ok("Note updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Note not found for the given user and video.");
        }
    }

    @GetMapping("/watch/isExist") // 시청 영상 유무
    public ResponseEntity<Boolean> existWatchVideo(@RequestParam Long userId,
                                                   @RequestParam Long videoId) {
        boolean isExist = videoService.existWatchVideo(userId, videoId);

        return ResponseEntity.status(HttpStatus.OK).body(isExist);
    }

}
