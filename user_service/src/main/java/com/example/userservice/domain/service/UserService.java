package com.example.userservice.domain.service;

import com.example.userservice.domain.Role;
import com.example.userservice.domain.Tier;
import com.example.userservice.domain.User;
import com.example.userservice.domain.dto.UserDto;
import com.example.userservice.domain.repository.TierRepository;
import com.example.userservice.domain.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final TierRepository tierRepository;

    public User update(UserDto.UserUpdateResponse response) {
        User user = User.builder()
                .birthday(response.getBirthday())
                .gender(response.getGender())
                .nickname(response.getNickname())
                .role(Role.USER)
                .build();

        return userRepository.save(user);
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    public User findById(Long id) throws Exception {
        Optional<User> user = userRepository.findById(id);

        return user.get();
    }

    public Tier findByUserId(Long id) {
        Optional<Tier> tier = tierRepository.findByUserId(id);
        return tier.get();
    }

    public String findNicknameById(Long id) {
        String response = userRepository.findNicknameById(id);
        return response;
    }

    public String findTierById(Long id) {
        String response = tierRepository.findTierById(id);
        return response;
    }
}
