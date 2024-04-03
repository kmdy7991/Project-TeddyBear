package com.teddybear.videoservice.jpa;

import com.teddybear.videoservice.vo.VideoDto;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TranslatedVideoRepository extends MongoRepository<VideoDto, String> {
}
