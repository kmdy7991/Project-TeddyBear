import styles from "./fouthPage.module.css";
import gteddy from "../../assets/green_teddy.png";
function fourthPage() {
  return (
    <div className={`${styles.pageContainer}`}>
      <div data-aos="fade-left" className={`${styles.description}`}>
        <div className={`${styles.title}`}>영어, 당신의 방식대로 배우세요</div>
        <div>
          <p className={`${styles.slogan}`}>
            가입만으로도 당신의 영어 학습이 달라집니다.
          </p>
          <p className={`${styles.slogan}`}>
            새로운 접근법으로 맞춤 학습의 문을 열어보세요. 바로 여기, 당신을
            기다리고 있습니다.
          </p>
        </div>
      </div>
      <div className={`${styles.secimg}`}>
        <img src={gteddy} alt="초록 곰돌이" className={`${styles.teddy}`}></img>
      </div>
    </div>
  );
}

export default fourthPage;
