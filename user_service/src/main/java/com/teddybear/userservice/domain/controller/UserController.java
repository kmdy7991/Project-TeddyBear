package com.teddybear.userservice.domain.controller;

import com.teddybear.userservice.domain.service.UserService;
import com.teddybear.userservice.domain.dto.UserDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user-service")
public class UserController {

    private final UserService userService;

    // 생성자를 통한 의존성 주입
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/fetchId")
    public ResponseEntity<UserDto.AuthResponse> fetchAuth() {
        UserDto.AuthResponse response = userService.fetchAuth();
        if (response != null) {
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@PathVariable Long id, @RequestBody UserDto.UserUpdateResponse request) throws Exception {
        boolean success = userService.update(id, request);
        if (success) {
            return ResponseEntity.ok("User updated successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User updating failed");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        boolean result = userService.deleteById(id);
        if (result) {
            return ResponseEntity.status(HttpStatus.OK).body("User deleted successfully.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User deleting failed");
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDto.UserResponse> findById(@PathVariable Long id) throws Exception {
        UserDto.UserResponse response = userService.findById(id);
        if (response != null) {
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @GetMapping("/user/concern/{id}")
    public ResponseEntity<String> findConcernById(@PathVariable Long id) throws Exception {
        String response = userService.findConcernById(id);
        if (response != null) {
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PostMapping("/findId")
    public ResponseEntity<Long> findIdByEmail(@RequestBody String email) throws Exception {
        Long response = userService.findIdByEmail(email);
        if (response != null) {
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @GetMapping("/tier/{id}")
    public ResponseEntity<UserDto.TierResponse> findByUserId(@PathVariable Long id) {
        UserDto.TierResponse response = userService.findByUserId(id);
        if (response != null) {
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PutMapping("/tier/upgradeTier/{id}")
    public ResponseEntity<String> upgradeTier(@PathVariable Long id, @RequestBody UserDto.TierNameRequest tierNameRequest) {
        boolean success = userService.upgradeTier(id, tierNameRequest);
        if (success) {
            return ResponseEntity.ok("Tier updated successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tier updating failed");
    }

    @PutMapping("/tier/upgradeExp/{id}")
    public ResponseEntity<String> upgradeExp(@PathVariable Long id, @RequestBody UserDto.ExpRequest request) throws Exception {
        boolean success = userService.upgradeExp(id, request);
        if (success) {
            return ResponseEntity.ok("Exp updated successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Exp updating failed");
    }

    @GetMapping("/checkNickname/{id}")
    public ResponseEntity<String> findNicknameById(@PathVariable Long id) {
        String response = userService.findNicknameById(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/checkTier/{id}")
    public ResponseEntity<String> findTierById(@PathVariable Long id) {
        String response = userService.findTierById(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/info/{id}")
    public ResponseEntity<UserDto.UserInfoResponse> findUserInfoById(@PathVariable Long id) throws Exception {
        UserDto.UserInfoResponse response = userService.findUserInfoById(id);
        if (response != null) {
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
}
