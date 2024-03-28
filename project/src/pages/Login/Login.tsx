import yteddy from '../../assets/yellow_teddy.png';
import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom';
import loading from './Loading';
import { useEffect } from 'react';



function Login() {
  const navigate = useNavigate();

  const handleGooglelogin = () => {
    // window.location.href = `${ process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI }`;
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI}&response_type=code&scope=email+profile`;
  };
 

  return (
    <div className={`${styles.pageContainer}`}>
      <div className={`${styles.description}`}>
        <div className={`${styles.title}`}>TEDDYBEAR</div>
        <div>
          <button onClick={handleGooglelogin} className={styles.loginbutton}>구글소셜 로그인</button>

        </div>
      </div>
      <div className={`${styles.loginimg}`}>
        <img src={yteddy} alt="노란 곰돌이" className={`${styles.teddy}`} />
      </div>
    </div>
  );
}

export default Login;
