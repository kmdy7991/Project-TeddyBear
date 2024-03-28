import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import yteddy from '../../assets/yellow_teddy.png';
import styles from './Login.module.css';

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  // 구글 로그인 버튼을 클릭할 때 호출되는 함수
  const handleGoogleLogin = () => {
    setIsLogin(true);
    // Google OAuth 인증 페이지로 리다이렉트
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI}&response_type=code&scope=email+profile`;
  };

  useEffect(() => {
    // 콜백 URL에서 코드를 가져옴
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      // 구글 OAuth 인증 코드를 사용하여 액세스 토큰 요청
      axios.post('/api/user-service/user/', { code })
        .then(response => {
          const accessToken = response.data.access_token;
          // 액세스 토큰을 사용하여 사용자 정보 요청
          axios.get('/api/user-service/user/', {
            headers: {
              Authorization: `Bearer ${accessToken}` // 헤더에 액세스 토큰 포함
            }
          }).then(userInfoResponse => {
            const { nickname, tier } = userInfoResponse.data;
            // 사용자 정보에 따라 페이지 리다이렉션
            if (!nickname && !tier) {
              navigate('/profil'); // 닉네임과 티어가 없는 경우
            } else if (nickname && !tier) {
              navigate('/cefrtest'); // 닉네임만 있는 경우
            } else {
              navigate('/'); // 닉네임과 티어가 모두 있는 경우
            }
          }).catch(error => {
            console.error('Error fetching user info:', error);
            setIsLogin(false);
          });
        }).catch(error => {
          console.error('Error fetching access token:', error);
          setIsLogin(false);
        });
    }
  }, [navigate]);

  return (
    <div className={`${styles.pageContainer}`}>
      <div className={`${styles.description}`}>
        <div className={`${styles.title}`}>TEDDYBEAR</div>
        <div>
          <button onClick={handleGoogleLogin} className={styles.loginbutton}>구글 소셜 로그인</button>
        </div>
      </div>
      <div className={`${styles.loginimg}`}>
        <img src={yteddy} alt="노란 곰돌이" className={`${styles.teddy}`} />
      </div>
    </div>
  );
}

export default Login;
