package com.teddybear.videoservice.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.teddybear.videoservice.client.CategoryClient;
import com.teddybear.videoservice.client.LanguageClient;
import com.teddybear.videoservice.client.UserClient;
import com.teddybear.videoservice.client.dto.UserCategoryRequestDto;
import com.teddybear.videoservice.jpa.*;
import com.teddybear.videoservice.vo.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
//@Transactional
public class VideoServiceImpl implements VideoService {
    private final VideoRepository videoRepository;
    private final WatchVideoRepository watchVideoRepository;
    private final BookmarkVideoRepository bookmarkVideoRepository;
    private final NoteRepository noteRepository;
    private final TranslatedVideoRepository translatedVideoRepository;
    private final LanguageClient languageClient;
    private final UserClient userClient;
    private final CategoryClient categoryClient;
    @PersistenceContext
    private EntityManager entityManager;

    public ResponseVideo getVideoById(Long id) {
        VideoEntity videoEntity = videoRepository.findById(id).orElse(null);
        if (videoEntity != null) {
            ResponseVideo responseVideo = ResponseVideo.builder()
                    .id(videoEntity.getId())
                    .videoTitle(videoEntity.getVideoTitle())
                    .videoDiscription(videoEntity.getVideoDescription())
                    .videoUrl(videoEntity.getVideoUrl())
                    .videoId(videoEntity.getVideoId())
                    .videoTime(videoEntity.getVideoTime())
                    .videoThumbnail(videoEntity.getVideoThumbnail())
                    .videoGrade(videoEntity.getVideoGrade())
                    .build();

            return responseVideo;
        } else {
            return null;
        }
    }

    @Override
    public List<ResponseVideo> getVideoByTitle(String videoTitle) {
        List<VideoEntity> list = videoRepository.searchTitle(videoTitle);

        if (list == null || list.isEmpty()) {
            return null;
        }
        List<ResponseVideo> responseVideos = new ArrayList<>();
        for (VideoEntity videoEntity : list) {
            ResponseVideo responseVideo = ResponseVideo.builder()
                    .id(videoEntity.getId())
                    .videoTitle(videoEntity.getVideoTitle())
                    .videoDiscription(videoEntity.getVideoDescription())
                    .videoUrl(videoEntity.getVideoUrl())
                    .videoId(videoEntity.getVideoId())
                    .videoTime(videoEntity.getVideoTime())
                    .videoThumbnail(videoEntity.getVideoThumbnail())
                    .videoGrade(videoEntity.getVideoGrade())
                    .build();
            responseVideos.add(responseVideo);
        }
        return responseVideos;
    }

    @Override
    public ResponseVideo getVideoByVideoId(String videoId) {
        VideoEntity videoEntity = videoRepository.getVideoByVideoId(videoId);
        ResponseVideo response = ResponseVideo.builder()
                .id(videoEntity.getId())
                .videoDiscription(videoEntity.getVideoDescription())
                .videoId(videoEntity.getVideoId())
                .videoGrade(videoEntity.getVideoGrade())
                .videoUrl(videoEntity.getVideoUrl())
                .videoThumbnail(videoEntity.getVideoThumbnail())
                .videoTitle(videoEntity.getVideoTitle())
                .videoTime(videoEntity.getVideoTime()).build();
        return response;
    }

    @Override // 영상 데이터 생성
    public void importVideo() throws Exception {
        JSONParser parser = new JSONParser();
        Reader reader = new FileReader("src/main/resources/VideoCrawling.json");
        JSONArray dateArray = (JSONArray) parser.parse(reader);

        int dupl = 0;

        for (int i = 0; i < dateArray.size(); i++) {
            System.out.println(dateArray);
            JSONObject element = (JSONObject) dateArray.get(i);

            VideoEntity videoEntity = VideoEntity.builder()
                    .videoId((String) element.get("videoId"))
                    .videoUrl((String) element.get("videoUrl"))
                    .videoThumbnail((String) element.get("videoThumbnail"))
                    .videoTitle((String) element.get("videoTitle"))
                    .videoDescription((String) element.get("videoDescription"))
                    .videoTime((String) element.get("videoPlaytime"))
                    .videoGrade((String) element.get("videoGrade"))
                    .build();

            try {
                videoRepository.save(videoEntity);
            } catch (DataIntegrityViolationException e) {
                // 중복된 videoId를 추가하려고 할 때 발생하는 예외를 처리
                // 여기서는 예외를 무시하도록 설정
                log.error("중복된 videoId를 무시합니다: {}", videoEntity.getVideoId());

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

    @Override
    public List<ResponseVideo> getWatchedVideosByUserIdAndWatchedStatus(Long userId, Boolean videoWatched) {

        // 유저 아이디에 해당하는 영상 리스트 조회
        List<WatchVideoEntity> watchedVideos;
        if (videoWatched) {
            watchedVideos = watchVideoRepository.findByUserIdAndVideoWatched(userId, true);
        } else {
            watchedVideos = watchVideoRepository.findByUserIdAndVideoWatched(userId, false);
        }

        // 시청한 영상 아이디에 해당하는 영상 리스트 조회
        List<VideoEntity> videoEntities = new ArrayList<>();
        for (WatchVideoEntity watchedVideo : watchedVideos) {
            VideoEntity videoEntity = videoRepository.findById(watchedVideo.getVideo().getId()).orElse(null);
            videoEntities.add(videoEntity);
        }

        // VideoEntity를 ResponseVideo로 변환
        List<ResponseVideo> responseVideos = new ArrayList<>();
        for (VideoEntity videoEntity : videoEntities) {
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

    @Override
    public void watchVideo(RequestWatchVideo requestWatchVideo) {

        // 받은 비디오 Id를 저장해서 videoId에 해당하는 VideoEntity를 뽑음
        Long videoId = requestWatchVideo.getVideoId();
        Long userId = requestWatchVideo.getUserId();
        // 유저 아이디에 영상 아이디가 있으면 추가 안함
        boolean exists = watchVideoRepository.existsByUserIdAndVideo_Id(userId, videoId);

        if (!exists) {
//        System.out.println("videoId: " + videoId);
            VideoEntity videoEntity = videoRepository.findById(videoId)
                    .orElseThrow(() -> new IllegalArgumentException("Video with id " + videoId + " not found"));
//        System.out.println("videoEntity: " + videoEntity.getVideoId());

            // RequestWatchVideo를 WatchVideoEntity로 변환
            WatchVideoEntity watchVideoEntity = WatchVideoEntity.builder()
                    .videoWatched(requestWatchVideo.isVideoWatched())
                    .userId(requestWatchVideo.getUserId())
                    .video(videoEntity)
                    .build();

            watchVideoRepository.save(watchVideoEntity);

            categoryClient.countUpCategory(UserCategoryRequestDto.builder()
                    .videoId(videoEntity.getVideoId())
                    .userId(requestWatchVideo.getUserId())
                    .build());

        }
    }

    @Transactional
    public void updateWatchVideo(RequestWatchVideo requestWatchVideo) {
        Long userId = requestWatchVideo.getUserId();
        Long videoId = requestWatchVideo.getVideoId();
        boolean videoWatched = requestWatchVideo.isVideoWatched();

        // 해당 userId와 videoId를 가진 WatchVideoEntity 조회
        WatchVideoEntity watchVideoEntity = watchVideoRepository.findByUserIdAndVideo_Id(userId, videoId);

        // 시청 완료 여부 업데이트
        WatchVideoEntity watchVideoentity = WatchVideoEntity.builder()
                .id(watchVideoEntity.getId())
                .userId(watchVideoEntity.getUserId())
                .video(watchVideoEntity.getVideo())
                .videoWatched(videoWatched)
                .build();

        watchVideoRepository.save(watchVideoentity);
    }

    @Override
    public void bookmarkVideo(RequestBookmarkVideo requestBookmarkVideo) {
        // videoId로부터 VideoEntity 가져오기
        Long videoId = requestBookmarkVideo.getVideoId();
        Long userId = requestBookmarkVideo.getUserId();
        VideoEntity videoEntity = videoRepository.findById(videoId)
                .orElseThrow(() -> new IllegalArgumentException("Video with id " + videoId + " not found"));

        boolean exist = bookmarkVideoRepository.existsByVideoIdAndUserId(videoId, userId);
        System.out.println("exist: " + exist);

        if (!exist) {
            BookmarkVideoEntity bookmarkVideoEntity = BookmarkVideoEntity.builder()
                    .userId(userId)
                    .video(videoEntity)
                    .build();
            bookmarkVideoRepository.save(bookmarkVideoEntity);
        }
    }

    @Override
    public List<ResponseVideo> getVideoByUserId(Long userId) {
        List<BookmarkVideoEntity> bookmarkedVideos = bookmarkVideoRepository.findByUserId(userId);
        List<ResponseVideo> responseVideos = new ArrayList<>();

        for (BookmarkVideoEntity bookmarkedVideo : bookmarkedVideos) {
            VideoEntity videoEntity = bookmarkedVideo.getVideo();
            ResponseVideo responseVideo = ResponseVideo.builder()
                    .id(videoEntity.getId())
                    .videoTitle(videoEntity.getVideoTitle())
                    .videoUrl(videoEntity.getVideoUrl())
                    .videoId(videoEntity.getVideoId())
                    .videoTime(videoEntity.getVideoTime())
                    .videoThumbnail(videoEntity.getVideoThumbnail())
                    .videoGrade(videoEntity.getVideoGrade())
                    .videoDiscription(videoEntity.getVideoDescription())
                    .build();
            responseVideos.add(responseVideo);
        }
        return responseVideos;
    }

    @Override
    public List<ResponseRecommendDto> getTailoredVideos(Long userId) {
        String concernById = userClient.findConcernById(userId).orElseThrow(NoSuchElementException::new);

        return languageClient.videoIdInfo(PythonDto.builder()
                .videoDtoList(translatedVideoRepository.findAll().subList(0, 50))
                .concern("영어 천재가 되고 싶다 오픽 최강 토스 고득점 토익")
                .build());
    }

    @Override
    public void deleteBookmarkedVideo(RequestBookmarkVideo requestBookmarkVideo) {
        Long userId = requestBookmarkVideo.getUserId();
        Long videoId = requestBookmarkVideo.getVideoId();

        // 주어진 userId와 videoId를 만족하는 BookmarkVideoEntity를 삭제
        List<BookmarkVideoEntity> bookmarkedVideos = bookmarkVideoRepository.findByUserIdAndVideoId(userId, videoId);
        bookmarkVideoRepository.deleteAll(bookmarkedVideos);

    }

    @Override
    public void createNote(RequestNote requestNote) {
        Long videoId = requestNote.getVideoId();
        VideoEntity videoEntity = videoRepository.findById(videoId)
                .orElseThrow(() -> new IllegalArgumentException("Video with id " + videoId + " not found"));

        NoteEntity noteEntity = NoteEntity.builder()
                .userId(requestNote.getUserId())
                .video(videoEntity)
                .note(requestNote.getNote())
                .build();

        noteRepository.save(noteEntity);
    }

    @Override
    public ResponseNote getNote(Long userId, Long videoId) {
        NoteEntity noteEntity = noteRepository.findByUserIdAndVideoId(userId, videoId);
        VideoEntity videoEntity = videoRepository.findById(videoId).orElse(null);
        System.out.println("videoId: " + noteEntity.getVideo().getId());
        if (noteEntity != null) {
            return ResponseNote.builder()
                    .id(noteEntity.getId())
                    .note(noteEntity.getNote())
                    .noteDate(noteEntity.getNoteDate())
                    .videoId(videoId)
                    .videoTitle(videoEntity.getVideoTitle())
                    .build();
        } else {
            return null; // 또는 적절한 오류 처리
        }

    }

    public ResponseNote getNoteByNoteId(Long noteId) {
        NoteEntity noteEntity = noteRepository.findById(noteId).orElse(null);
        VideoEntity videoEntity = videoRepository.findById(noteEntity.getVideo().getId()).orElse(null);
//        System.out.println(noteEntity.getId());
        System.out.println("videoId: " + noteEntity.getVideo().getId());
        if (noteEntity != null) {
            ResponseNote responseNote = ResponseNote.builder()
                    .id(noteEntity.getId())
                    .note(noteEntity.getNote())
                    .noteDate(noteEntity.getNoteDate())
                    .videoId(videoEntity.getId())
                    .videoTitle(videoEntity.getVideoTitle())
                    .build();

            return responseNote;
        } else {
            return null; // 또는 적절한 오류 처리
        }
    }

    @Override
    public List<ResponseNote> getNoteByUserId(Long userId) {
        List<ResponseNote> responseNotes = new ArrayList<>();
        List<NoteEntity> noteEntities = noteRepository.findByUserId(userId);

        for (NoteEntity noteEntity : noteEntities) {
            ResponseNote responseNote = ResponseNote.builder()
                    .id(noteEntity.getId())
                    .note(noteEntity.getNote())
                    .noteDate(noteEntity.getNoteDate())
                    .build();

            responseNotes.add(responseNote);
        }

        return responseNotes;
    }

    @Override
    public void deleteNote(Long userId, Long videoId) {
        noteRepository.deleteByUserIdAndVideoId(userId, videoId);
    }

    @Override
    public void deleteNoteByNoteId(Long noteId) {
        noteRepository.deleteById(noteId);
    }

    @Override
    public boolean existBookmarkVideo(RequestBookmarkVideo requestBookmarkVideo) {
        Long userId = requestBookmarkVideo.getUserId();
        Long videoId = requestBookmarkVideo.getVideoId();
        return bookmarkVideoRepository.existsByVideoIdAndUserId(videoId, userId);

    }

    @Override
    public boolean updateNoteByNoteId(Long noteId, UpdateNote updatedNote) {
        NoteEntity note = noteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        // 빌더 클래스를 사용하여 엔티티를 복제하고 수정
        NoteEntity updatedNoteEntity = NoteEntity.builder()
                .id(note.getId())
                .userId(note.getUserId())
                .video(note.getVideo())
                .note(updatedNote.getUpdatedNote())
                .noteDate(LocalDateTime.now())
                .build();

        noteRepository.save(updatedNoteEntity);
        return true;
    }

    @Override
    public boolean updateNoteContent(Long userId, Long videoId, UpdateNote updatedNote) {
        // 주어진 userId와 videoId에 해당하는 NoteEntity 찾기
        NoteEntity note = noteRepository.findByUserIdAndVideoId(userId, videoId);
        if (note != null) {
            NoteEntity updatedNoteEntity = NoteEntity.builder()
                    .id(note.getId())
                    .userId(note.getUserId())
                    .video(note.getVideo())
                    .note(updatedNote.getUpdatedNote())
                    .noteDate(LocalDateTime.now())
                    .build();

            noteRepository.save(updatedNoteEntity);
            return true;
        }
        return false;
    }

    @Override
    public boolean existWatchVideo(Long userId, Long videoId) {
        return watchVideoRepository.existsByUserIdAndVideoId(userId, videoId);
    }


}
