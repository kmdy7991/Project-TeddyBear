<div align="center">
<img src="/assets/Teddybear.png" />
</div>

# Teddy Bear(테디베어) : 영어 학습 서비스
### 목차
[1. 서비스 소개](#서비스-소개)

[2. 제작 기간 및 참여 인원](#제작-기간-및-참여-인원)

[3. 기술 스택](#기술-스택)

[4. 기획 배경](#기획-배경)

[5. 기능 소개](#기능-소개)

[6. 기술적 특징](#기술적-특징)

[7. 시스템 아키텍처](#시스템-아키텍처)

[8. 개발 산출물](#개발-산출물)

[9. 서비스 시연 영상](#서비스-시연-영상)

&nbsp;

## 서비스 소개
>🧸여가 시간을 활용해서 취향에 맞는 영상을 시청하며 재미있게 영어를 배울 수 있는 **영상 빅데이터 추천 기반 영어 학습 서비스**🧸

>알고리즘으로 <b>재미</b>있게, <b>똑똑</b>하게 영어를 배우다.

><b>TeddyBear(테디베어)</b>는 학습 영상 빅데이터에서 큰 비중을 차지하는 ‘Ted’영상으로 영어를 ‘배우다’라는 의미를 담고 있습니다. 어린이들이 받고 싶어하는 선물이며 많은 이들에게 사랑 받는 곰인형인 TeddyBear처럼, 저희 서비스는 영상 빅데이터에서 **사용자들이 시청하고 싶어하는 영상**을 추천해서 취향에 맞는 영상으로 재미있는 영어 학습을 가능케 합니다.

&nbsp;

## 제작 기간 및 참여 인원

### 제작 기간

2024.02.26. ~ 2024.04.04. (6주)

### 참여 인원

| **📌 문경림** | **📌 이서윤** | **📌 최다희** | **📌 최은희** | **📌 박지운** | **📌 이대영** |
| :------: | :------: | :------: | :------: | :------: | :------: |
|<img src="/assets/문경림.jpg" height="120"/>|<img src="/assets/이서윤.png" height="120"/>|<img src="/assets/최다희.jpg"  height="120"/>|<img src="/assets/최은희.png" height="120"/>|<img src="/assets/박지운.jpg" height="120"/>|<img src="/assets/이대영.jpg" height="120"/>|
|**팀장**👩‍💻**FE**|👩‍💻**FE**|👩‍💻**BE**|👩‍💻**BE**|👨‍💻**BE**|👨‍💻**BE & Infra**|
| PM, [profile, (first, study, levelup) test, vocalist] 서비스,소셜 로그인, UI/UX | 상태 관리, UI/UX | [APIgateway, discovery, script, video, word] 서비스 | [category, user, video, test] 서비스, 소셜 로그인 | AI 학습, [test] 서비스 | 아키텍처 설계, CI/CD 구축, AI 학습, [language, video, user] 서비스, 소셜 로그인 |
|[![Github](https://img.shields.io/badge/문경림%20github-434343?style=for-the-badge&logo=github&logoColor=white)](https://github.com/moonsky737)|[![Github](https://img.shields.io/badge/이서윤%20github-4682B4?style=for-the-badge&logo=github&logoColor=white)](https://github.com/westyunn)|[![Github](https://img.shields.io/badge/최다희%20github-97A951?style=for-the-badge&logo=github&logoColor=white)](https://github.com/HeeHiHee)|[![Github](https://img.shields.io/badge/최은희%20github-ffff00?style=for-the-badge&logo=github&logoColor=white)](https://github.com/gilukji226) |[![Github](https://img.shields.io/badge/박지운%20github-ff77ff?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Junikarp)|[![Github](https://img.shields.io/badge/이대영%20github-EB3A9D?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kmdy7991)|

&nbsp;

## 기술 스택
<div align="center">

### 🚀 Skills

**Front-end**

<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"> <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white">
<br>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">

**Back-end**

<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=OpenJDK&logoColor=white"> <img src="https://img.shields.io/badge/spring boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=Spring-Security&logoColor=white">
<br>
<img src="https://img.shields.io/badge/spring data JPA-6DB33F?style=for-the-badge&logo=spring&logoColor=white"> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"> <img src="https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=Hibernate&logoColor=white">
<br>
<img src="https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=RabbitMQ&logoColor=white">

**AI**

<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white"> <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white">

**Infra**

<img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonAWS&logoColor=white"> <img src="https://img.shields.io/badge/EC2-FF9900?style=for-the-badge&logo=amazonEC2&logoColor=white"> <img src="https://img.shields.io/badge/Docker-000000?style=for-the-badge&logo=Docker&logoColor=white"> <img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white"> <img src="https://img.shields.io/badge/SonarQube-4E9BCD?style=for-the-badge&logo=sonarqube&logoColor=white">
<br>
<img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white"> <img src="https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white"> <img src="https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white">

&nbsp;

### 🛠️ Tool

**🖍 Design**

<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">

**🤲 Cooperation**

<img src="https://img.shields.io/badge/GitLab-330F63?style=for-the-badge&logo=gitlab&logoColor=white"> <img src="https://img.shields.io/badge/Mattermost-0058CC?style=for-the-badge&logo=mattermost&logoColor=white"> <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white">

**💻 Terminal**

<img src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white">

**⏱️ Workflow Platforms**

<img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white">
</div>

&nbsp;

## 기획 배경
- 지난 10월 기준 청년실업률은 전년 동월대비 0.1%p 상승한 8.6%로 18년 만에 최고치를 기록했다. 높은 취업 문턱과 불안정한 고용환경 등으로 평생직장 개념이 옅어지면서 대학생은 물론 직장인들은 자기계발에 열을 올리는 추세다. 대표적인 자기계발 항목은 다름 아닌 외국어, 특히 영어다.
초·중·고 10년 동안 입시위주 영어를 배웠지만 졸업 후 직장생활은 물론 일상생활에서 영어를 쉬이 사용하는 이들은 많지 않은 게 현실이다.<sup>[참고자료 - 그림 1](https://pds.skyedaily.com/news_data/20171209135328_kdyvgexi.jpg)</sup>
- **‘개인의 경쟁력’이라는 영어, 그러나 성인 대부분 의지만 있을 뿐 실제 ‘영어학습’으로 이어지지 않아**<sup>[참고자료 - 기사 1](https://www.openads.co.kr/content/contentDetail?contsId=2924)</sup>
- ‘시간 부족’도 영어공부에 방해가 되는 요인이었다. 매일매일 정기적으로 공부를 하기가 어렵고(39.7%), 영어공부를 위해 따로 시간을 내기가 어렵고(30.6%), 시간적 여력도 안 된다(27.7%)고 말하는 사람들이 많은 것으로, 젊은 층일수록 영어공부를 하지 않는 이유로 ‘시간부족’을 많이 꼽았다.<sup>[참고자료 - 그림 2](https://www.madtimes.org/news/photo/201907/2368_3893_497.jpg)</sup>

⇒ 이에 **즐거운 방식으로 영어를 학습할 수 있도록 여가 생활과 영어 학습을 함께할 수 있는 서비스의 필요성**을 느껴, **영상 빅데이터 추천 기반 영어 학습 서비스 ‘TeddyBear(테디베어)’를 기획**하였습니다.

&nbsp;

## 기능 소개

1. 유튜브 구독 채널을 기반한 관심 분야 분석

구글 소셜 로그인을 통해, 사용자가 구독하고 있는 채널을 분석하여 관심 분야를 파악했습니다. 이를 사용자의 관심사에 따라 맞춤형 학습 컨텐츠를 제공하는데 활용하였습니다. 

2. 영어 강연 영상 추천 및 스크립트 제공

분석된 사용자의 관심사와 일치하는 영어 강연 영상을 추천했습니다. 사용자는 자신의 관심사와 관련된 영상을 보면서 학습을 할 수 있습니다. 그리고 추천된 강연 영상의 스크립트를 제공하여 사용자는 영상을 시청하면서 동시에 스크립트를 보며 단어와 문장을 학습할 수 있습니다. 

3. CEFR 기반 레벨 테스트

사용자의 영어 수준을 파악하기 위해 CEFR 기반의 레벨 테스트를 진행합니다. 이를 통해 A1부터 C2까지 총 6단계로 사용자의 언어 능력을 평가하고, 맞춤형 학습 경로를 제공하였습니다.


&nbsp;

## 기술적 특징
1. Word2Vec(w2v)
- Word2Vec은 단어를 벡터로 표현하는 기술로 단어 간의 의미적 유사성을 파악하는 데 사용되었습니다.
- 문장의 단어를 숫자로 변환하여 각 단어를 벡터 공간상의 좌표로 표현하였습니다.
2. TF-IDF(Term Frequency-Inverse Document Frequency)
- 문서 내에서 단어의 상대적 중요성을 평가하는데 활용하였습니다.
- 문장의 단어들에 대한 TF-IDF 가중치를 추출하여, 각 단어의 문장 내 중요도를 계산할 수 있었습니다.
3. 코사인 유사도(Cosine Similarity)
- 문장 간의 단어 벡터를 사용해 코사인 유사도를 계산하여 문장 간의 유사성을 평가하였습니다.
4. T5 모델
- T5 모델은 Transformer 아키텍처를 기반으로 한 텍스트 투 텍스트 학습 모델입니다.
- 강연 영상의 영문 스크립트를 T5 모델을 사용하여 번역해 사용자에게 제공하였습니다.
5. MSA
- MSA는 서비스를 작은 독립적인 마이크로서비스로 분리하여 개발 및 관리하는 아키텍처 패턴입니다.
- 해당 서비스에서 영상 분석, 카테고리 분류, 스크립트 학습 등 다양한 기능들이 각각 독립적인 마이크로서비스로 분리되어 구축되었습니다.

&nbsp;

## 시스템 아키텍처
<img src="/docs/Teddybear_Architecture.png">

&nbsp;

## 개발 산출물
[기능 명세서](./docs/Teddybear_기능명세서.pdf)

[API 명세서](./docs/Teddybear_API명세서.pdf)

[와이어프레임](./docs/Teddybear_Wireframe.pdf)

[ERD](./docs/Teddybear_erd.png)

[중간 발표 자료](./docs/Teddybear_중간발표자료.pdf)

[최종 발표 자료](./docs/Teddybear_최종발표자료.pdf)

&nbsp;

## 서비스 시연 영상
[시연 영상](./assets/Teddybear_UCC.mp4)
