import { useEffect, useRef, useState } from "react";
import pteddy from "../../assets/purple_teddy.png";
import styles from "./secPage.module.css";
import LoginNav from "../../components/Nav/LoginNav";

function SecPage() {
  const [isVisible, setIsVisible] = useState(false);
  // 요소 참조 저장
  const descriptionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // entries: 관찰 요소 배열(descriptionRef)
        entries.forEach((entry) => {
          // isIntersecting: 뷰포트 파악
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.3, // 30% 요소 보이면 콜백 ㄱㄱ
      }
    );

    if (descriptionRef.current) {
      observer.observe(descriptionRef.current);
    }

    return () => {
      // 컴포넌트 언마운트시 옵저버 정리
      if (descriptionRef.current) {
        observer.unobserve(descriptionRef.current);
      }
    };
  }, []);
  return (
    <div ref={descriptionRef} className={`${styles.pageContainer}`}>
      <LoginNav />
      <div
        className={`${styles.description} ${isVisible ? styles.isVisible : ""}`}
      >
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

export default SecPage;
