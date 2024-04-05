import styles from "./thirdPage.module.css";
import bteddy from "../../assets/blue_teddy.png";
import { useEffect, useRef, useState } from "react";
import LoginNav from "../../components/Nav/LoginNav";
function ThirdPage() {
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

export default ThirdPage;
