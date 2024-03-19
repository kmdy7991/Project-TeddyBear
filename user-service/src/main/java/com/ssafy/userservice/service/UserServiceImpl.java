package com.ssafy.userservice.service;

import com.ssafy.userservice.client.OrderServiceClient;
import com.ssafy.userservice.dto.UserDto;
import com.ssafy.userservice.jpa.UserEntity;
import com.ssafy.userservice.repository.UserRepository;
import com.ssafy.userservice.vo.ResponseOrder;
import com.ssafy.userservice.vo.ResponseUser;
import jakarta.persistence.Column;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.cloud.client.circuitbreaker.CircuitBreaker;
import org.springframework.cloud.client.circuitbreaker.CircuitBreakerFactory;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final OrderServiceClient orderServiceClient;
    private final CircuitBreakerFactory circuitBreakerFactory;

    @Override
    public ResponseUser createUser(UserDto userDto) {
        UserEntity userEntity = UserEntity.builder()
                .email(userDto.getEmail())
                .userId(userDto.getUserId())
                .name(userDto.getName())
                .build();

        userEntity.setPassword(passwordEncoder.encode(userDto.getPwd()));
        log.info("userEntity = {}", userEntity.getUserId());

        userRepository.save(userEntity);

        return ResponseUser.builder()
                .userId(userEntity.getUserId())
                .email(userEntity.getEmail())
                .name(userEntity.getName())
                .build();
    }

    @Override
    public UserDto getUserByUserId(String userId) {
        UserEntity findUser = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("userId not Found"));

        UserDto user = UserDto.builder()
                .userId(findUser.getUserId())
                .email(findUser.getEmail())
                .name(findUser.getName())
                .build();

        log.info("Before call orders microservices");
        CircuitBreaker circuitbreaker = circuitBreakerFactory.create("circuitbreaker");
        List<ResponseOrder> orderList = circuitbreaker.run(() -> orderServiceClient.getOrders(userId),
                throwable -> new ArrayList<>()
        );
        log.info("After call orders microservices");

        user.setOrder(orderList);

        return user;
    }

    @Override
    public Iterable<UserEntity> getUserByAll() {
        return userRepository.findAll();
    }

    @Override
    public UserDto getUserDetailByEmail(String email) {
        UserEntity userEntity = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(email));

        return UserDto.builder()
                .userId(userEntity.getUserId())
                .build();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));

        return new User(userEntity.getEmail(), userEntity.getEncryptPwd(),
                true, true, true, true,
                new ArrayList<>());
    }
}
