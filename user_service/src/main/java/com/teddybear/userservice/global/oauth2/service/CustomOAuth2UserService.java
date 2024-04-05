package com.teddybear.userservice.global.oauth2.service;

import com.teddybear.userservice.domain.entity.Tier;
import com.teddybear.userservice.domain.entity.User;
import com.teddybear.userservice.domain.entity.categoryService.UserCategory;
import com.teddybear.userservice.domain.repository.TierRepository;
import com.teddybear.userservice.domain.repository.UserCategoryRepository;
import com.teddybear.userservice.domain.repository.UserRepository;
import com.teddybear.userservice.global.oauth2.dto.CustomOAuth2User;
import com.teddybear.userservice.global.oauth2.dto.OAuthAttributes;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Collections;
import java.util.Map;


@Slf4j
@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;
    private final TierRepository tierRepository;
    private final UserCategoryRepository userCategoryRepository;
    private final HttpSession httpSession;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        log.info("CustomOAuth2UserService.loadUser() 실행 - OAuth2 로그인 요청 진입");

        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        // 엑세스 토큰 얻기
        String accessToken = userRequest.getAccessToken().getTokenValue();
        log.info("Access Token: {}", accessToken);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        OAuthAttributes extractAttributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        User createdUser = getUser(extractAttributes, accessToken);

        httpSession.setAttribute("id", createdUser.getId());
        httpSession.setAttribute("AccessToken", accessToken);

        return new CustomOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(createdUser.getRole().getKey())),
                attributes,
                extractAttributes.getNameAttributeKey(),
                createdUser.getEmail(),
                createdUser.getRole(),
                createdUser.getConcern()
        );
    }

    private User getUser(OAuthAttributes extractAttributes, String accessToken) {
        User findUser = userRepository.findByEmail(extractAttributes.getEmail()).orElse(null);

        if (findUser == null) {
            return saveUser(extractAttributes, accessToken);
        }
        return findUser;
    }

    private User saveUser(OAuthAttributes extractAttributes, String accessToken) {
        // 엑세스 토큰과 관련된 추가 로직을 여기에 구현할 수 있습니다.
        String concern = fetchSubscriptionList(accessToken);
        System.out.println(concern);

        User createdUser = extractAttributes.toEntity(extractAttributes.getEmail(), concern);
        User savedUser = userRepository.save(createdUser);

        tierRepository.save(Tier.builder()
                        .user(savedUser)
                        .tierExp(0L)
                        .level(1)
                        .levelExp(0L)
                        .build());

        userCategoryRepository.save(UserCategory.builder()
                .user(savedUser)
                .life(0L)
                .society(0L)
                .it(0L)
                .sports(0L)
                .world(0L)
                .politics(0L)
                .economy(0L)
                .build());

        return savedUser;
    }

    public String fetchSubscriptionList(String accessToken) {
        String concern = "교육";
        BufferedReader in = null;
        try {
            URL url = new URL("https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet,contentDetails&mine=true&maxResults=50");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("Authorization", "Bearer " + accessToken);

            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) { //성공
                in = new BufferedReader(new InputStreamReader(con.getInputStream()));
                String inputLine;
                StringBuffer response = new StringBuffer();

                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }

                try {
                    // JSON 문자열을 JSONObject로 파싱
                    JSONObject jsonObject = new JSONObject(response.toString());
                    // "items" 배열 가져오기
                    JSONArray itemsArray = jsonObject.getJSONArray("items");

                    // "items" 배열 안의 각 객체의 "snippet" 안의 "description" 값을 한 줄로 모아서 저장할 문자열
                    StringBuilder descriptions = new StringBuilder();

                    if (itemsArray.length() != 0) {
                        // "items" 배열 안의 각 객체에 대해 반복
                        for (int i = 0; i < itemsArray.length(); i++) {
                            JSONObject item = itemsArray.getJSONObject(i);
                            JSONObject snippet = item.getJSONObject("snippet");
                            // "description" 값을 가져와서 descriptions에 추가
                            descriptions.append(snippet.getString("description").replaceAll("\\n", " "));
                            // 마지막 객체인 경우 줄바꿈 없이 추가
                            if (i < itemsArray.length() - 1) {
                                descriptions.append(" ");
                            }
                        }
                        concern = descriptions.toString();
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }

            } else { // 에러 발생
                System.out.println("GET request not worked");
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return concern;
    }
}
