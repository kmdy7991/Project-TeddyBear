package com.example.authservice.global.oauth.service;

import com.example.authservice.domain.User;
import com.example.authservice.domain.repository.UserRepository;
import com.example.authservice.global.oauth.dto.CustomOAuth2User;
import com.example.authservice.global.oauth.dto.OAuthAttributes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final UserRepository userRepository;
//    private final HttpSession httpSession;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        log.info("CustomOAuth2UserService.loadUser() 실행 - OAuth2 로그인 요청 진입");

        /**
         * DefaultOAuth2UserService 객체를 생성하여, loadUser(userRequest)를 통해 DefaultOAuth2User 객체를 생성 후 반환
         * DefaultOAuth2UserService의 loadUser()는 소셜 로그인 API의 사용자 정보 제공 URI로 요청을 보내서
         * 사용자 정보를 얻은 후, 이를 통해 DefaultOAuth2User 객체를 생성 후 반환한다.
         * 결과적으로, OAuth2User는 OAuth 서비스에서 가져온 유저 정보를 담고 있는 유저
         */
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        // 로그인 진행 중인 서비스를 구분
        // 네이버로 로그인 진행 중인지, 구글로 로그인 진행 중인지, ... 등을 구분
        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        // OAuth2 로그인 진행 시 키가 되는 필드 값(Primary Key와 같은 의미)
        // 구글의 경우 기본적으로 코드를 지원
        //userNameAttributeName은 이후에 nameAttributeKey로 설정된다.
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName(); // OAuth2 로그인 시 키(PK)가 되는 값

        // 소셜 로그인에서 API가 제공하는 userInfo의 Json 값(유저 정보들)
        Map<String, Object> attributes = oAuth2User.getAttributes();

        // OAuth2UserService를 통해 가져온 OAuth2User의 attribute 등을 담을 클래스
        OAuthAttributes extractAttributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        // getUser() 메소드로 User 객체 생성 후 반환
        User createdUser = getUser(extractAttributes);


        // 세션에 사용자 정보 저장
//        httpSession.setAttribute("user", new SessionUser(createdUser));
        // 왜 User 클래스를 사용하면 안 되는 것일까?
        // 만약 User 클래스를 그대로 사용했다면 직렬화를 구현하지 않았다는 의미의 에러가 발생
        // -> 오류를 해결하기 위해 User 클래스에 직렬화 코드를 넣는 것이 옳은 해결 방법일까?
        // User 클래스는 언제 다른 엔티티와 관계가 형성될지 모르는 엔티티 클래스
        // -> 만약 @OneToMany, @ManyToMany 등 자식 엔티티를 갖고 있다면 직렬화 대상에 자식들까지 포함
        // -> 성능 이슈, 부수 효과 발생 확률 높음
        // => 직렬화 기능을 가진 세션 DTO를 추가로 만드는 것이 운영 및 유지보수 때 많은 도움이 됨

        // DefaultOAuth2User를 구현한 CustomOAuth2User 객체를 생성해서 반환
        return new CustomOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(createdUser.getRole().getKey())),
                attributes,
                extractAttributes.getNameAttributeKey(),
                createdUser.getEmail(),
                createdUser.getRole()
        );
    }

    /**
     * SocialType과 extractAttributes에 들어있는 소셜 로그인의 식별값 id를 통해 회원을 찾아 반환하는 메소드
     * 만약 찾은 회원이 있다면, 그대로 반환하고 없다면 saveUser()를 호출하여 회원을 저장한다.
     */
    private User getUser(OAuthAttributes extractAttributes) {
        User findUser = userRepository.findByEmail(extractAttributes.getEmail()).orElse(null);

        if(findUser == null) {
            return saveUser(extractAttributes);
        }
        return findUser;
    }

    /**
     * OAuthAttributes의 toEntity() 메소드를 통해 빌더로 User 객체 생성 후 반환
     * 생성된 User 객체를 DB에 저장 : socialType, socialId, email, role 값만 있는 상태
     */
    private User saveUser(OAuthAttributes extractAttributes) {
        User createdUser = extractAttributes.toEntity(extractAttributes.getEmail());
        return userRepository.save(createdUser);
    }
}
