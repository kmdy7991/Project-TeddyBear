package com.example.scriptservice.service;

import com.example.scriptservice.vo.ResponseScript;

import java.util.List;

public interface ScriptService {
    void importScript() throws Exception;
    void exportScriptsToJson();
    List<ResponseScript> getScriptsByVideoId(String videoId);
}
