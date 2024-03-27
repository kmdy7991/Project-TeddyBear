import yteddy from '../../assets/yellow_teddy.png';
import styles from './Login.module.css'



function Login() {
  return (
    <div className={`${styles.pageContainer}`}>
      <div className={`${styles.description}`}>
        <div className={`${styles.title}`}>TEDDYBEAR</div>
        <div>
          <button className={styles.loginbutton}>구글소셜 로그인</button>

        </div>
      </div>
      <div className={`${styles.loginimg}`}>
        <img src={yteddy} alt="노란 곰돌이" className={`${styles.teddy}`} />
      </div>
    </div>
  );
}

export default Login;
