package com.teddybear.videoservice.service;

import com.teddybear.videoservice.vo.*;

import java.util.List;

public interface VideoService {
    ResponseVideo getVideoById(Long videoId);
    List<ResponseVideo> getVideoByTitle(String videoTitle);
    ResponseVideo getVideoByVideoId(String videoId);
    void importVideo() throws Exception;
    void exportVideoToJson();
    List<ResponseVideo> getWatchedVideosByUserIdAndWatchedStatus(Long userId, Boolean videoWatched);
    void watchVideo(RequestWatchVideo requestWatchVideo);
    void updateWatchVideo(RequestWatchVideo requestWatchVideo);
    void bookmarkVideo(RequestBookmarkVideo requestBookmarkVideo);
    List<ResponseVideo> getVideoByUserId(Long userId);
    List<ResponseRecommendDto> getTailoredVideos(Long userId);
    void deleteBookmarkedVideo(RequestBookmarkVideo requestBookmarkVideo);
    void createNote(RequestNote requestNote);
    ResponseNote getNote(Long userId, Long videoId);
    ResponseNote getNoteByNoteId(Long noteId);
    List<ResponseNote> getNoteByUserId(Long userId);
    void deleteNote(Long userId, Long videoId);
    void deleteNoteByNoteId(Long noteId);
    boolean existBookmarkVideo(RequestBookmarkVideo requestBookmarkVideo);
    boolean updateNoteByNoteId(Long noteId, UpdateNote  updatedNote);
    boolean updateNoteContent(Long userId, Long videoId, UpdateNote  updatedNote);

    boolean existWatchVideo(Long userId, Long videoId);

}
