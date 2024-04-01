package com.example.scriptservice.controller;

import com.example.scriptservice.service.ScriptService;
import com.example.scriptservice.vo.ResponseScript;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/script-service")
public class ScriptController {
    private final ScriptService scriptService;

    @Autowired
    public ScriptController(ScriptService scriptService){
        this.scriptService = scriptService;
    }

    @PostMapping("/importScript") // 스크립트 넣기
    public ResponseEntity<String> importScript() {
        try {
            scriptService.importScript();
            return ResponseEntity.status(HttpStatus.OK).body("Script imported successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to import script: " + e.getMessage());
        }
    }

    @GetMapping("/exportScript") // 스크립트 빼내기
    public ResponseEntity<String> exportScriptToJson() {
        try {
            scriptService.exportScriptsToJson();
            return ResponseEntity.status(HttpStatus.OK).body("Script exported successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to export script: " + e.getMessage());
        }
    }

    @GetMapping("/script/{videoId}") // 영상 스크립트 조회
    public ResponseEntity<List<ResponseScript>> getScriptsByVideoId(@PathVariable String videoId) {
        List<ResponseScript> scripts = scriptService.getScriptsByVideoId(videoId);
        return ResponseEntity.status(HttpStatus.OK).body(scripts);
    }


}
