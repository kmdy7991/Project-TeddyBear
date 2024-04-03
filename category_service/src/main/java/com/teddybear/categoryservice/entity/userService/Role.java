package com.teddybear.categoryservice.entity.userService;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    // 스프링 시큐리티에서는 권한(Role) 코드에 항상 "ROLE_" 접두사가 앞에 붙어야 함
    USER("ROLE_USER", "사용자"),
    GUEST("ROLE_GUEST", "비회원사용자");

    private final String key;
    private final String title;
}