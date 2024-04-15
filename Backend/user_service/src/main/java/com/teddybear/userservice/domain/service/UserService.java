package com.teddybear.userservice.domain.service;

import com.teddybear.userservice.domain.entity.Role;
import com.teddybear.userservice.domain.entity.Tier;
import com.teddybear.userservice.domain.entity.User;
import com.teddybear.userservice.domain.dto.UserDto;
import com.teddybear.userservice.domain.repository.TierRepository;
import com.teddybear.userservice.domain.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final HttpSession httpSession;
    private final UserRepository userRepository;
    private final TierRepository tierRepository;

    public UserDto.AuthResponse fetchAuth() {
        UserDto.AuthResponse response = UserDto.AuthResponse.builder()
                .accessToken((String) httpSession.getAttribute("accessToken"))
                .id((Long) httpSession.getAttribute("id"))
                .build();
        return response;
    }

    public Boolean update(Long id, UserDto.UserUpdateResponse response) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            User updatedUser = user.get().builder()
                    .id(user.get().getId())
                    .tier(user.get().getTier())
                    .email(user.get().getEmail())
                    .birthday(response.getBirthday())
                    .gender(response.getGender())
                    .nickname(response.getNickname())
                    .attendance(user.get().getAttendance())
                    .videoViewTime(user.get().getVideoViewTime())
                    .role(Role.USER)
                    .concern(user.get().getConcern())
                    .refreshToken(user.get().getRefreshToken())
                    .build();
            userRepository.save(updatedUser);
            return true;
        }
        return false;
    }

    public Boolean upgradeTier(Long id, UserDto.TierNameRequest tierNameRequest) {
        Optional<Tier> tier = tierRepository.findByUserId(id);
        if (tier.isPresent()) {
            Tier updatedTier = tier.get().builder()
                    .user(tier.get().getUser())
                    .tierSeq(tier.get().getTierSeq())
                    .tierName(tierNameRequest.getTier())
                    .tierExp(0L)
                    .level(1)
                    .levelExp(0L)
                    .build();
            tierRepository.save(updatedTier);
            return true;
        }
        return false;
    }

    public Boolean upgradeExp(Long id, UserDto.ExpRequest request) {
        Optional<Tier> tier = tierRepository.findByUserId(id);
        if (tier.isPresent()) {
            String[] tiers = {"A1", "A2", "B1", "B2", "C1", "C2"};
            int userTier = 0;
            for (int i = 0; i < tiers.length; i++) {
                if (tiers[i].equals(tier.get().getTierName())) {
                    userTier = i;
                }
            }
            if (request.isTierExp()) {
                if (userTier < 5 && (tier.get().getTierExp() + request.getAddExp() - 250) / 250 > userTier) {
                    Tier updatedExp = tier.get().builder()
                            .user(tier.get().getUser())
                            .tierSeq(tier.get().getTierSeq())
                            .tierName(tiers[userTier + 1])
                            .tierExp(tier.get().getTierExp() + request.getAddExp() - ((userTier + 1) * 250L + 250))
                            .level(tier.get().getLevel())
                            .levelExp(tier.get().getLevelExp())
                            .build();
                    tierRepository.save(updatedExp);
                } else {
                    Tier updatedExp = tier.get().builder()
                            .user(tier.get().getUser())
                            .tierSeq(tier.get().getTierSeq())
                            .tierName(tier.get().getTierName())
                            .tierExp(tier.get().getTierExp() + request.getAddExp())
                            .level(tier.get().getLevel())
                            .levelExp(tier.get().getLevelExp())
                            .build();
                    tierRepository.save(updatedExp);
                }
            } else {
                if ((tier.get().getLevelExp() + request.getAddExp() - 50) / 50 > tier.get().getLevel() - 1) {
                    Tier updatedExp = tier.get().builder()
                            .user(tier.get().getUser())
                            .tierSeq(tier.get().getTierSeq())
                            .tierName(tier.get().getTierName())
                            .tierExp(tier.get().getTierExp())
                            .level(tier.get().getLevel() + 1)
                            .levelExp(tier.get().getLevelExp() + request.getAddExp() - (tier.get().getLevel() * 50L + 50))
                            .build();
                    tierRepository.save(updatedExp);
                } else {
                    Tier updatedExp = tier.get().builder()
                            .user(tier.get().getUser())
                            .tierSeq(tier.get().getTierSeq())
                            .tierName(tier.get().getTierName())
                            .tierExp(tier.get().getTierExp())
                            .level(tier.get().getLevel())
                            .levelExp(tier.get().getLevelExp() + request.getAddExp())
                            .build();
                    tierRepository.save(updatedExp);
                }
            }
            return true;
        }
        return false;
    }

    public Boolean deleteById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public UserDto.UserResponse findById(Long id) throws Exception {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            UserDto.UserResponse response = UserDto.UserResponse.builder()
                    .birthday(user.get().getBirthday())
                    .email(user.get().getEmail())
                    .role(user.get().getRole())
                    .attendance(user.get().getAttendance())
                    .gender(user.get().getGender())
                    .id(user.get().getId())
                    .nickname(user.get().getNickname())
                    .videoViewTime(user.get().getVideoViewTime())
                    .concern(user.get().getConcern())
                    .build();
            return response;
        }
        return null;
    }

    public String findConcernById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return user.get().getConcern();
        }
        return null;
    }

    public Long findIdByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            return user.get().getId();
        }
        return null;
    }

    public UserDto.TierResponse findByUserId(Long id) {
        Optional<Tier> tier = tierRepository.findByUserId(id);
        if (tier.isPresent()) {
            UserDto.TierResponse response = UserDto.TierResponse.builder()
                    .levelExp(tier.get().getLevelExp())
                    .level(tier.get().getLevel())
                    .tierExp(tier.get().getTierExp())
                    .tierName(tier.get().getTierName())
                    .build();
            return response;
        }
        return null;
    }

    public String findNicknameById(Long id) {
        String response = userRepository.findNicknameById(id);
        return response;
    }

    public String findTierById(Long id) {
        String response = tierRepository.findTierById(id);
        return response;
    }

    public UserDto.UserInfoResponse findUserInfoById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < 4; i++) {
                sb.append(user.get().getBirthday().charAt(i));
            }
            LocalDate now = LocalDate.now();
            int userAge = now.getYear() - Integer.parseInt(sb.toString());
            UserDto.UserInfoResponse response = UserDto.UserInfoResponse.builder()
                    .age(userAge / 10 * 10)
                    .gender(user.get().getGender())
                    .build();

            return response;
        }
        return null;
    }
}
