package com.teddybear.categoryservice.service;

import com.teddybear.categoryservice.client.CategoryClient;
import com.teddybear.categoryservice.dto.CategoryResponseDto;
import com.teddybear.categoryservice.entity.UserCategory;
import com.teddybear.categoryservice.repository.CategoryRepository;
import com.teddybear.categoryservice.repository.UserCategoryRepository;
import com.teddybear.categoryservice.repository.VideoCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{
    private final CategoryClient categoryClient;
    private final VideoCategoryRepository videoCategoryRepository;
    private final UserCategoryRepository userCategoryRepository;

    @Override
    public List<CategoryResponseDto> getCategorys() {
        return categoryClient.getCategory();
    }

    @Override
    public List<String> getVideosbyCategry(String category) {
        return videoCategoryRepository.findVideoIdByCategory(category);
    }

    @Override
    public String getCategory(String videoId) {
        return videoCategoryRepository.findCategoryByVideoId(videoId);
    }

    @Override
    public boolean countUpCategory(Long userId, String category) {
        Optional<UserCategory> userCategory = userCategoryRepository.findByUserId(userId);
        if (userCategory.isPresent()) {
            if (category.equals("생활문화")) {
                UserCategory created = UserCategory.builder()
                        .userCategorySeq(userCategory.get().getUserCategorySeq())
                        .user(userCategory.get().getUser())
                        .life(userCategory.get().getLife() + 1)
                        .society(userCategory.get().getSociety())
                        .it(userCategory.get().getIt())
                        .sports(userCategory.get().getSports())
                        .world(userCategory.get().getWorld())
                        .politics(userCategory.get().getPolitics())
                        .economy(userCategory.get().getEconomy())
                        .build();
                userCategoryRepository.save(created);
                return true;
            } else if (category.equals("사회")) {
                UserCategory created = UserCategory.builder()
                        .userCategorySeq(userCategory.get().getUserCategorySeq())
                        .user(userCategory.get().getUser())
                        .life(userCategory.get().getLife())
                        .society(userCategory.get().getSociety() + 1)
                        .it(userCategory.get().getIt())
                        .sports(userCategory.get().getSports())
                        .world(userCategory.get().getWorld())
                        .politics(userCategory.get().getPolitics())
                        .economy(userCategory.get().getEconomy())
                        .build();
                userCategoryRepository.save(created);
                return true;
            } else if (category.equals("IT과학")) {
                UserCategory created = UserCategory.builder()
                        .userCategorySeq(userCategory.get().getUserCategorySeq())
                        .user(userCategory.get().getUser())
                        .life(userCategory.get().getLife())
                        .society(userCategory.get().getSociety())
                        .it(userCategory.get().getIt() + 1)
                        .sports(userCategory.get().getSports())
                        .world(userCategory.get().getWorld())
                        .politics(userCategory.get().getPolitics())
                        .economy(userCategory.get().getEconomy())
                        .build();
                userCategoryRepository.save(created);
                return true;
            } else if (category.equals("스포츠")) {
                UserCategory created = UserCategory.builder()
                        .userCategorySeq(userCategory.get().getUserCategorySeq())
                        .user(userCategory.get().getUser())
                        .life(userCategory.get().getLife())
                        .society(userCategory.get().getSociety())
                        .it(userCategory.get().getIt())
                        .sports(userCategory.get().getSports() + 1)
                        .world(userCategory.get().getWorld())
                        .politics(userCategory.get().getPolitics())
                        .economy(userCategory.get().getEconomy())
                        .build();
                userCategoryRepository.save(created);
                return true;
            } else if (category.equals("세계")) {
                UserCategory created = UserCategory.builder()
                        .userCategorySeq(userCategory.get().getUserCategorySeq())
                        .user(userCategory.get().getUser())
                        .life(userCategory.get().getLife())
                        .society(userCategory.get().getSociety())
                        .it(userCategory.get().getIt())
                        .sports(userCategory.get().getSports())
                        .world(userCategory.get().getWorld() + 1)
                        .politics(userCategory.get().getPolitics())
                        .economy(userCategory.get().getEconomy())
                        .build();
                userCategoryRepository.save(created);
                return true;
            } else if (category.equals("정치")) {
                UserCategory created = UserCategory.builder()
                        .userCategorySeq(userCategory.get().getUserCategorySeq())
                        .user(userCategory.get().getUser())
                        .life(userCategory.get().getLife())
                        .society(userCategory.get().getSociety())
                        .it(userCategory.get().getIt())
                        .sports(userCategory.get().getSports())
                        .world(userCategory.get().getWorld())
                        .politics(userCategory.get().getPolitics() + 1)
                        .economy(userCategory.get().getEconomy())
                        .build();
                userCategoryRepository.save(created);
                return true;
            } else if (category.equals("경제")) {
                UserCategory created = UserCategory.builder()
                        .userCategorySeq(userCategory.get().getUserCategorySeq())
                        .user(userCategory.get().getUser())
                        .life(userCategory.get().getLife())
                        .society(userCategory.get().getSociety())
                        .it(userCategory.get().getIt())
                        .sports(userCategory.get().getSports())
                        .world(userCategory.get().getWorld())
                        .politics(userCategory.get().getPolitics())
                        .economy(userCategory.get().getEconomy() + 1)
                        .build();
                userCategoryRepository.save(created);
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
}
