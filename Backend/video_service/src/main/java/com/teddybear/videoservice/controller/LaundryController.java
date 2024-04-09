package com.teddybear.videoservice.controller;

import com.teddybear.videoservice.service.LaundryService;
import com.teddybear.videoservice.vo.RequestWatchVideo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/video-service")
public class LaundryController {
    private final LaundryService laundryService;

    @Autowired
    public LaundryController(LaundryService laundryService) {
        this.laundryService = laundryService;
    }

    @PostMapping("/importLaundry1") // 영상 넣기
    public ResponseEntity<String> importVideo() {
        try {
            laundryService.importVideo();
            return ResponseEntity.status(HttpStatus.OK).body("Videos imported successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to import videos: " + e.getMessage());
        }
    }


    @GetMapping("/exportLaundry1") // 영상 빼내기
    public ResponseEntity<String> exportVideoToJson() {
        try {
            laundryService.exportVideoToJson();
            return ResponseEntity.status(HttpStatus.OK).body("Video exported successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to export video: " + e.getMessage());
        }

    }




}
