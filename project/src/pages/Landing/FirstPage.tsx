import yteddy from "../../assets/yellow_teddy.png";
import styles from "./firstPage.module.css";

function firstPage() {
  return (
    <div className={`${styles.pageContainer}`}>
      <div className={`${styles.description}`}>
        <div className={`${styles.title}`}>TEDDYBEAR</div>
        <div>
          <p className={`${styles.slogan}`}>
            TEDDYBEAR와 함께라면, 영어는 더 이상 어렵지 않아요.
          </p>
          <p className={`${styles.slogan}`}>
            당신의 수준과 취향에 꼭 맞는 영어 학습 영상으로, 따뜻한 학습 친구가
            되어 드릴게요.
          </p>
        </div>
      </div>
      <div className={`${styles.firstimg}`}>
        <img src={yteddy} alt="노란 곰돌이" className={`${styles.teddy}`} />
        <div className={`${styles.field}`}>
          <div className={`${styles.scroll}`}></div>
        </div>
      </div>
    </div>
  );
}

export default firstPage;
