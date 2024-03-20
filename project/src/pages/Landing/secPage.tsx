import pteddy from "../../assets/purple_teddy.png";
import styles from "./secPage.module.css";

function secPage() {
  return (
    <div className={`${styles.pageContainer}`}>
      <div data-aos="fade-right" className={`${styles.description}`}>
        <div className={`${styles.title}`}>개인화된 학습 추천</div>
        <div>
          <p className={`${styles.slogan}`}>
            여러분의<span className={`${styles.sp2}`}>&nbsp;수준과 취향</span>을
            정확히 파악해, 최적의 학습 영상을 추천해드립니다.
          </p>
          <p className={`${styles.slogan}`}>
            <span className={`${styles.sp2}`}>개인 맞춤형 학습</span>으로 더
            빠르게, 더 재미있게 성장하세요.
          </p>
        </div>
      </div>
      <div className={`${styles.secimg}`}>
        <img src={pteddy} alt="보라 곰돌이" className={`${styles.teddy}`}></img>
      </div>
    </div>
  );
}

export default secPage;
