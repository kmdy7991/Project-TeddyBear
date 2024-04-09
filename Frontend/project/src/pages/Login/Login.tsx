import { useState } from "react";
import yteddy from "../../assets/yellow_teddy.png";
import styles from "./Login.module.css";
import google from "../../assets/web_light_sq_SI@3x.png";

function Login() {
  const [isLogin, setIsLogin] = useState(false);

  // 구글 로그인 버튼을 클릭할 때 호출되는 함수
  const handleGoogleLogin = async () => {
    setIsLogin(true);
    window.location.href = `http://j10b107.p.ssafy.io:8086/oauth2/authorization/google`;
  };

  return (
    <div className={`${styles.pageContainer}`}>
      <div className={`${styles.description}`}>
        <div className={`${styles.title}`}>TEDDYBEAR</div>
        <div onClick={handleGoogleLogin} className={styles.loginbutton}>
          <button>
            <img src={google} alt="구글 소셜 로그인" />
          </button>
        </div>
      </div>
      <div className={`${styles.loginimg}`}>
        <img src={yteddy} alt="노란 곰돌이" className={`${styles.teddy}`} />
      </div>
    </div>
  );
}

export default Login;
