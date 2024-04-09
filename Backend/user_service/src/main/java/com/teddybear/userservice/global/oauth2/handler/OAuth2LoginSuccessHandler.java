package com.teddybear.userservice.global.oauth2.handler;

import com.teddybear.userservice.domain.entity.Role;
import com.teddybear.userservice.domain.entity.User;
import com.teddybear.userservice.domain.repository.UserRepository;
import com.teddybear.userservice.global.oauth2.dto.CustomOAuth2User;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
//@Transactional
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {
    private final UserRepository userRepository;
    private final HttpSession httpSession;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("OAuth2 Login 성공!");
        try {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
            response.sendRedirect("https://j10b107.p.ssafy.io/loading");
            // 프론트에서 기존 유저인지 검사
            loginSuccess(response, oAuth2User); // 로그인에 성공한 경우 access, refresh 토큰 생성
        } catch (Exception e) {
            throw e;
        }
    }

    private void loginSuccess(HttpServletResponse response, CustomOAuth2User oAuth2User) throws IOException {
        Optional<User> user = userRepository.findByEmail(oAuth2User.getEmail());
        if (user.isPresent()) {
            User updatedUser = user.get().builder()
                    .id(user.get().getId())
                    .tier(user.get().getTier())
                    .email(user.get().getEmail())
                    .birthday(user.get().getBirthday())
                    .gender(user.get().getGender())
                    .nickname(user.get().getNickname())
                    .attendance(user.get().getAttendance())
                    .videoViewTime(user.get().getVideoViewTime())
                    .role(Role.USER)
                    .concern(user.get().getConcern())
                    .build();
            userRepository.save(updatedUser);
            System.out.println("...................유저 갱신.................................................");
        } else {
            System.out.println("유저가 없다........................................................................");
            System.out.println("유저가 없다........................................................................");
            System.out.println("유저가 없다........................................................................");
            System.out.println("유저가 없다........................................................................");
            System.out.println("유저가 없다........................................................................");
        }
    }
}
