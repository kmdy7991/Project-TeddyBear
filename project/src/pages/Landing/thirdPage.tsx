import styles from "./thirdPage.module.css";
import bteddy from "../../assets/blue_teddy.png";
function thirdPage() {
  return (
    <div className={`${styles.pageContainer}`}>
      <div data-aos="fade-down" className={`${styles.description}`}>
        <div className={`${styles.title}`}>
          쉐도잉, 단어장, 필기노트로 완성하는 맞춤형 영어 학습
        </div>
        <div>
          <p className={`${styles.slogan}`}>
            <span className={`${styles.sp3}`}>쉐도잉, 단어장, 필기노트</span>
            까지, 저희가 제공하는 모든 도구를 활용해 보세요.
          </p>
          <p className={`${styles.slogan}`}>
            개인화된 도구들로
            <span className={`${styles.sp3}`}>&nbsp;더 효과적으로</span>,
            <span className={`${styles.sp3}`}>더 재미있게&nbsp;</span> 영어를
            마스터하세요.
          </p>
        </div>
      </div>
      <div className={`${styles.secimg}`}>
        <img src={bteddy} alt="파랑 곰돌이" className={`${styles.teddy}`}></img>
      </div>
    </div>
  );
}

export default thirdPage;
