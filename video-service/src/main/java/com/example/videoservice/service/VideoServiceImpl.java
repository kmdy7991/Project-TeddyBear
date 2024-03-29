package com.example.videoservice.service;

import com.example.videoservice.jpa.*;
import com.example.videoservice.vo.ResponseScript;
import com.example.videoservice.vo.ResponseVideo;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
@Slf4j
@Service
//@Transactional
public class VideoServiceImpl implements VideoService {
    private final VideoRepository videoRepository;
    private final ScriptRepository scriptRepository;
    private final WatchVideoRepository watchVideoRepository;
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public VideoServiceImpl(VideoRepository videoRepository, ScriptRepository scriptRepository, WatchVideoRepository watchVideoRepository) {
        this.videoRepository = videoRepository;
        this.scriptRepository = scriptRepository;
        this.watchVideoRepository = watchVideoRepository;
    }

    public ResponseVideo getVideoById(Long id) {
        VideoEntity videoEntity = videoRepository.findById(id).orElse(null);
        if (videoEntity != null) {
            return new ResponseVideo(
                    videoEntity.getId(),
                    videoEntity.getVideoTitle(),
                    videoEntity.getVideoDescription(),
                    videoEntity.getVideoUrl(),
                    videoEntity.getVideoGrade(),
                    videoEntity.getVideoTime(),
                    videoEntity.getVideoThumbnail(),
                    videoEntity.getVideoId()
                    );
        } else {
            return null;
        }
    }

    @Override
    public List<VideoEntity> getVideoByTitle(String videoTitle) {
        System.out.println("Service Received videoTitle: " + videoTitle);
        List<VideoEntity> list = videoRepository.searchTitle(videoTitle);
        log.info("list size = {}", list.size());
        log.info("list get = {}", list.get(0).getVideoTitle());

        return list;
    }

    @Override
    public void importVideo() throws Exception {
        JSONParser parser = new JSONParser();
        Reader reader = new FileReader("src/main/resources/VideoCrawling.json");
        JSONArray dateArray = (JSONArray) parser.parse(reader);

        int dupl = 0;

        for (int i = 0; i < dateArray.size(); i++) {
            JSONObject element = (JSONObject) dateArray.get(i);

//            VideoEntity videoEntity = VideoEntity.builder()
//                    .videoTitle((String) element.get("video_title"))
//                    .videoDescription((String) element.get("video_description"))
//                    .videoUrl((String) element.get("video_url"))
//                    .videoId((String) element.get("video_id"))
//                    .videoTime((String) element.get("video_playtime"))
//                    .videoThumbnail((String) element.get("video_thumbnail"))
//                    .videoGrade((String) element.get("video_grade"))
//                    .build();
            VideoEntity videoEntity = VideoEntity.builder()
                    .videoTitle((String) element.get("videoTitle"))
                    .videoDescription((String) element.get("videoDescription"))
                    .videoUrl((String) element.get("videoUrl"))
                    .videoId((String) element.get("videoId"))
                    .videoTime((String) element.get("videoTime"))
                    .videoThumbnail((String) element.get("videoThumbnail"))
                    .videoGrade((String) element.get("videoGrade"))
                    .build();

            try {
                videoRepository.save(videoEntity);
            } catch (DataIntegrityViolationException e) {
                // 중복된 videoId를 추가하려고 할 때 발생하는 예외를 처리
                // 여기서는 예외를 무시하도록 설정
                log.error("중복된 videoId를 무시합니다: {}", videoEntity.getVideoId());
                dupl++;
            }
        }

        System.out.println(dupl);
    }

    @Transactional
    public void importScript() throws Exception {
        JSONParser parser = new JSONParser();
        Reader reader = new FileReader("src/main/resources/ScriptCrawling.json");
        JSONArray dataArray = (JSONArray) parser.parse(reader);

        for (Object obj : dataArray) {
            JSONObject jsonScript = (JSONObject) obj;
            String videoId = (String) jsonScript.get("video_id");

            JSONArray transcript = (JSONArray) jsonScript.get("video_transcript");

            for (Object text : transcript) {
                ScriptEntity scriptEntity = ScriptEntity.builder()
                        .videoId(videoId)
                        .content((String) text)
                        .build();
                entityManager.persist(scriptEntity);
            }
        }
    }

    public void exportVideoToJson() {
        List<VideoEntity> videoEntities = videoRepository.findAll();
        ObjectMapper objectMapper = new ObjectMapper();
        try (FileWriter fileWriter = new FileWriter("C:/Users/SSAFY/teddyOutput/videos.json")) {

            objectMapper.writeValue(fileWriter, videoEntities);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void exportScriptsToJson() {
        List<ScriptEntity> scriptEntities = scriptRepository.findAll();
        ObjectMapper objectMapper = new ObjectMapper();
        try (FileWriter fileWriter = new FileWriter("C:/Users/SSAFY/teddyOutput/scripts.json")) {

            objectMapper.writeValue(fileWriter, scriptEntities);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<ResponseVideo> getWatchedVideosByUserIdAndWatchedStatus(Long userId, Boolean videoWatched) {

        // 시청 영상 아이디 조회
        List<WatchVideoEntity> watchedVideos;
        if (videoWatched) {
            watchedVideos = watchVideoRepository.findByUserIdAndVideoWatched(userId, true);
        } else {
            watchedVideos = watchVideoRepository.findByUserIdAndVideoWatched(userId, false);
        }

        List<VideoEntity> videoEntities = new ArrayList<>();
        for (WatchVideoEntity watchedVideo : watchedVideos) {
            VideoEntity videoEntity = videoRepository.findById(watchedVideo.getVideoId().getId()).orElse(null);
            videoEntities.add(videoEntity);
        }

        List<ResponseVideo> responseVideos = new ArrayList<>();
        for(VideoEntity videoEntity : videoEntities) {
            ResponseVideo responseVideo = ResponseVideo.builder()
                    .id(videoEntity.getId())
                    .videoTitle(videoEntity.getVideoTitle())
                    .videoUrl(videoEntity.getVideoUrl())
                    .videoId(videoEntity.getVideoId())
                    .videoTime(videoEntity.getVideoTime())
                    .videoThumbnail(videoEntity.getVideoThumbnail())
                    .videoDiscription(videoEntity.getVideoDescription())
                    .videoGrade(videoEntity.getVideoGrade())
                    .build();

            responseVideos.add(responseVideo);
        }


        return responseVideos;
    }


}
