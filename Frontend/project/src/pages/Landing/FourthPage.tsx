import { useEffect, useRef, useState } from "react";
import styles from "./fouthPage.module.css";
import gteddy from "../../assets/green_teddy.png";
import LoginNav from "../../components/Nav/LoginNav";
function FourthPage() {
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

export default FourthPage;
