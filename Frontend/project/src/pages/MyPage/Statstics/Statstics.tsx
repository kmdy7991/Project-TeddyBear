import styles from "./Statstics.module.css";

function Statistics() {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.현황}`}>
        <div className={`${styles.attendance}`}>
          <div className={`${styles.title}`}>출석</div>
          <div className={`${styles.chart}`}>차트 그래프</div>
        </div>
        <div className={`${styles.current}`}>
          <div className={`${styles.title}`}>누적학습현황</div>
          <div className={`${styles.content}`}>
            <div className={`${styles.subtitle}`}>누적 학습 일수</div>
            <div className={`${styles.number}`}>일수</div>
          </div>
          <div className={`${styles.content}`}>
            <div className={`${styles.subtitle}`}>누적 학습 강의</div>
            <div className={`${styles.number}`}>강의수</div>
          </div>
          <div className={`${styles.content}`}>
            <div className={`${styles.subtitle}`}>작성된 TIL 개수</div>
            <div className={`${styles.number}`}>강의 개수</div>
          </div>
        </div>
        <div className={`${styles.topic}`}>
          <div className={`${styles.title}`}>나의 관심 토픽</div>
          <div className={`${styles.topics}`}>토픽워드클라우드</div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
