package com.example.scriptservice.controller;

import com.example.scriptservice.service.ScriptService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


}
