package com.example.scriptservice.service;

import com.example.scriptservice.jpa.ScriptEntity;
import com.example.scriptservice.jpa.ScriptRepository;
import com.example.scriptservice.vo.ResponseScript;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.json.simple.parser.JSONParser;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScriptServiceImpl implements ScriptService {
    private final ScriptRepository scriptRepository;
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public ScriptServiceImpl(ScriptRepository scriptRepository) {
        this.scriptRepository = scriptRepository;
    }

    @Transactional // 스크립트 파일 입력
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
    public List<ResponseScript> getScriptsByVideoId(String videoId) {
        List<ResponseScript> responseScripts = new ArrayList<>();
        List<ScriptEntity> scriptEntities = scriptRepository.findByVideoIdOrderByIdAsc(videoId);

        for(ScriptEntity scriptEntity : scriptEntities) {
            ResponseScript responseScript = ResponseScript.builder()
                    .id(scriptEntity.getId())
                    .content(scriptEntity.getContent())
                    .videoId(scriptEntity.getVideoId())
                    .build();

            responseScripts.add(responseScript);
        }

        return responseScripts;
    }


}
