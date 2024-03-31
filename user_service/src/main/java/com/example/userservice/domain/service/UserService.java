package com.example.userservice.domain.service;

import com.example.userservice.domain.Role;
import com.example.userservice.domain.Tier;
import com.example.userservice.domain.User;
import com.example.userservice.domain.dto.UserDto;
import com.example.userservice.domain.repository.TierRepository;
import com.example.userservice.domain.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final TierRepository tierRepository;

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
                    .build();
            userRepository.save(updatedUser);
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
