package com.teddybear.videoservice.service;

import com.teddybear.videoservice.jpa.LaundryEntity;
import com.teddybear.videoservice.jpa.LaundryRepository;
import com.teddybear.videoservice.jpa.VideoEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.util.List;

@Slf4j
@Service
public class LaundryServiceImpl implements LaundryService {
    private final LaundryRepository laundryRepository;

    public LaundryServiceImpl(LaundryRepository laundryRepository) {
        this.laundryRepository = laundryRepository;
    }

    @Override
    public void importVideo() throws Exception {
        JSONParser parser = new JSONParser();
        Reader reader = new FileReader("src/main/resources/laundryData1.json");
        JSONArray dataArray = (JSONArray) parser.parse(reader);

        for(int i=0; i<dataArray.size(); i++) {
            JSONObject element = (JSONObject) dataArray.get(i);

            JSONArray transcriptArray = (JSONArray) element.get("video_transcript");
            String transcriptString = transcriptArray.toJSONString(); // JSON 배열을 문자열로 변환

            LaundryEntity laundryEntity = LaundryEntity.builder()
                    .videoId((String) element.get("video_id"))
                    .videoUrl((String) element.get("video_url"))
                    .videoThumbnail((String) element.get("video_thumbnail"))
                    .videoTitle((String) element.get("video_title"))
                    .videoDescription((String) element.get("video_description"))
                    .videoPlaytime((String) element.get("video_playtime"))
                    .videoGrade((String) element.get("video_grade"))
                    .videoTranscript(transcriptString)
                    .build();

            try {
                laundryRepository.save(laundryEntity);
            } catch (DataIntegrityViolationException e) {
                // 중복된 videoId를 추가하려고 할 때 발생하는 예외를 처리
                // 여기서는 예외를 무시하도록 설정
                log.error("중복된 videoId를 무시합니다: {}", laundryEntity.getVideoId());
            }

        }

    }

    @Override
    public void exportVideoToJson() {
        List<LaundryEntity> laundryEntities = laundryRepository.findAll();
        ObjectMapper objectMapper = new ObjectMapper();
        try (FileWriter fileWriter = new FileWriter("C:/Users/SSAFY/Desktop/crawl2. 중복 제거/reYoung.json")) {

            objectMapper.writeValue(fileWriter, laundryEntities);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
