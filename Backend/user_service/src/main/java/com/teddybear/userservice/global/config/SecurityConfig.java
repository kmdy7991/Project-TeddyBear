package com.teddybear.userservice.global.config;

//import com.example.authservice.domain.Role;
import com.fasterxml.jackson.databind.ObjectMapper;
//import com.teddybear.userservice.global.jwt.filter.JwtAuthenticationProcessingFilter;
//import com.teddybear.userservice.global.jwt.service.JwtService;
import com.teddybear.userservice.global.oauth2.handler.OAuth2LoginFailureHandler;
import com.teddybear.userservice.global.oauth2.handler.OAuth2LoginSuccessHandler;
import com.teddybear.userservice.global.oauth2.service.CustomOAuth2UserService;
import com.teddybear.userservice.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;


@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {
//    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    private final OAuth2LoginFailureHandler oAuth2LoginFailureHandler;
    private final CustomOAuth2UserService customOAuth2UserService;

//    원랜 WebSecurityConfigurerAdapter를 상속받아서 처리했지만
//    스프링 5.7.0 이후로는 Deprecated 되었기 때문에
//    직접 스프링 빈(@Bean)으로 등록
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        csrf().disable()과 headers().frameOptions().disable()과 같은 방식은 이제 파라미터 없이 사용할 수 없음
//        그래서 Lambda 형식으로 작성
        http
                .formLogin(AbstractHttpConfigurer::disable) // FormLogin 사용 X
                .httpBasic(AbstractHttpConfigurer::disable) // httpBasic 사용 X(JWT 토큰을 사용한 로그인(Bearer 방식)이기 때문에)
                .csrf(AbstractHttpConfigurer::disable) // csrf 보안 사용 X(REST API를 사용하여 서버에 인증 정보를 저장하지 않고, 요청 시 인증 정보(JWT 토큰, OAuth2)를 담아서 요청하므로)
                .cors(AbstractHttpConfigurer::disable) // 프론트랑 왔다갔다 하려면
                .headers(
                        (headerConfig) -> headerConfig.frameOptions(
                                frameOptionsConfig -> frameOptionsConfig.disable()
                        )
                )
                .sessionManagement(s->s.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션을 사용하지 않기 때문에
                // URL별 권한 관리 옵션(인증/인가 설정 시 HttpServletRequest를 이용)
                .authorizeHttpRequests((authorizeRequest) -> authorizeRequest
                        // 아이콘, css, js 관련
                        // 기본 페이지, css, image, js 하위 폴더에 있는 자료들은 모두 접근 가능, h2-console에 접근 가능
                        .requestMatchers("/css/**", "images/**", "/js/**", "/favicon.ico", "/h2-console/**").permitAll()
                        .anyRequest().permitAll() // 전부 접근 가능
//                        .requestMatchers("/login", "/landing").permitAll() // 전부 접근 가능
//                        .requestMatchers("/profil", "/testguide", "/cefrtest").hasRole(Role.GUEST.name()) // GUEST 권한을 갖는 사람만 가능하도록
//                        .requestMatchers("/mypage/**", "/myLecture/**", "/myNote/**", "/search/**", "/category/**"
//                                , "/test/**", "/levelUptest/**", "/vocalist/**", "/myvoca/**", "/videoDetail/**")
//                        .hasRole(Role.USER.name()) // USER 권한을 갖는 사람만 가능하도록
//                        .anyRequest().authenticated() // 나머지 URL은 로그인한 사용자들에게만 허용
                )
                .logout( // 로그아웃 성공 시 / 주소로 이동
                        (logoutConfig) -> logoutConfig.logoutSuccessUrl("http://j10b107.p.ssafy.io/landing")
                )
                .oauth2Login(oauth -> oauth
                        .successHandler(oAuth2LoginSuccessHandler) // 동의하고 계속하기를 눌렀을 때 Handler 설정
                        .failureHandler(oAuth2LoginFailureHandler) // 소셜 로그인 실패 시 핸들러 설정
                        .userInfoEndpoint(userInfo -> userInfo
                                .userService(customOAuth2UserService) // customUserService 설정
                            )
                );
        // 원래 스프링 시큐리티 필터 순서가 LogoutFilter 이후에 로그인 필터 동작
        // 따라서, LogoutFilter 이후에 우리가 만든 필터 동작하도록 설정
        // 순서 : LogoutFilter -> JwtAuthenticationProcessingFilter
//        http.addFilterAfter(jwtAuthenticationProcessingFilter(), LogoutFilter.class);

        return http.build();
    }
//    @Bean
//    public JwtAuthenticationProcessingFilter jwtAuthenticationProcessingFilter() {
//        JwtAuthenticationProcessingFilter jwtAuthenticationFilter = new JwtAuthenticationProcessingFilter(jwtService, userRepository);
//        return jwtAuthenticationFilter;
//    }
}
