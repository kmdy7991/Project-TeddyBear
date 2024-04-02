import React, { useState, useEffect } from "react";
import styles from "./CefrScore.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

// CefrScore 컴포넌트 정의
const CefrScore: React.FC<{ score: number; onClose: () => void }> = ({
  score,
  onClose,
}) => {
  // 상태 변수 선언: 레벨 상태
  const [level, setLevel] = useState<string>("");
  const accessToken = localStorage.getItem("token");
  const id = useSelector((state: RootState) => state.user.userId);
  console.log(id);

  // useEffect 훅을 사용하여 레벨 결정
  useEffect(() => {
    // 점수에 따라 레벨 결정
    const initialLevel = determineLevel(score);
    console.log(initialLevel);
    // 레벨 상태 업데이트
    setLevel(initialLevel);
    const saveTier = async () => {
      try {
        const response = await axios.put(
          `/user-service/tier/upgradeTier/${id}`,
          {
            level,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(level);
        console.log("티어 저장 성공", response.data);
      } catch (error) {
        console.error("티어 저장 실패", error);
      }
    };

    saveTier();
  }, [score]);

  // 점수를 기반으로 레벨을 결정하는 함수
  const determineLevel = (score: number): string => {
    if (score >= 0 && score <= 10) {
      return "A1";
    } else if (score >= 11 && score <= 20) {
      return "A2";
    } else if (score >= 21 && score <= 32) {
      return "B1";
    } else if (score >= 33 && score <= 45) {
      return "B2";
    } else if (score >= 46 && score <= 61) {
      return "C1";
    } else if (score >= 62 && score <= 70) {
      return "C2";
    } else {
      return "점수 범위를 벗어났습니다";
    }
  };

  // 렌더링
  return (
    <div className={styles.box}>
      <div className={styles.boxinbox}>
        {/* 레벨 표시 */}
        <h1 className={styles.inboxtext}>{level}</h1>
      </div>
      {/* 제목 */}
      <h1 className={styles.text}>레벨 테스트 결과</h1>
      {/* 결과 메시지 */}
      <h1 className={styles.text}>OO님의 레벨은 {level}입니다!</h1>
    </div>
  );
};

export default CefrScore; // 컴포넌트 내보내기
