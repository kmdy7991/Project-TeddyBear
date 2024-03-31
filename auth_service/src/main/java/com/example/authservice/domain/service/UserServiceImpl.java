package com.example.authservice.domain.service;

import com.example.authservice.domain.Role;
import com.example.authservice.domain.User;
import com.example.authservice.domain.dto.UserDto;
import com.example.authservice.domain.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public void signUp(UserDto userDto) throws Exception {

        if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        User user = User.builder()
                .age(userDto.getAge())
                .gender(userDto.getGender())
                .nickname(userDto.getNickname())
                .role(Role.USER)
                .build();

        userRepository.save(user);
    }

    public User findById(Long id) throws Exception {
        Optional<User> user = userRepository.findById(id);

        return user.get();
    }
}
