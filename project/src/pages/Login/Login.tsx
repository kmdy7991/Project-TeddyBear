import { useState } from "react";
import yteddy from "../../assets/yellow_teddy.png";
import styles from "./Login.module.css";
import glogin from "../../assets/googlelogin.png";

function Login() {
  const [isLogin, setIsLogin] = useState(false);

  // 구글 로그인 처리를 위한 함수
  const handleGoogleLogin = async () => {
    setIsLogin(true);
    window.location.href = `http://j10b107.p.ssafy.io:8086/oauth2/authorization/google`;
  };

  return (
    <div className={`${styles.pageContainer}`}>
      <div className={`${styles.description}`}>
        <div className={`${styles.title}`}>TEDDYBEAR</div>
        {/* 이미지에 onClick 이벤트 핸들러 추가 */}
        <div onClick={handleGoogleLogin} className={styles.loginbutton}>
          <img src={glogin} alt="구글 로그인" className={styles.googleLoginImage} />
        </div>
      </div>
      <div className={`${styles.loginimg}`}>
        <img src={yteddy} alt="노란 곰돌이" className={`${styles.teddy}`} />
      </div>
    </div>
  );
}

export default Login;
