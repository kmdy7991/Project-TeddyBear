import React, { useState, useEffect } from "react";
import styles from "../Login/CefrScore.module.css";
import axios from "axios";

interface TestScoreProps {
  correctAnswers: number;
  userId: number;
  onClose: () => void;
}

const TestScore: React.FC<TestScoreProps> = ({
  correctAnswers,
  userId,
  onClose,
}) => {
  const [score, setScore] = useState<number>(0);
  const [expScore, setExpScore] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");
  const accessToken = localStorage.getItem("access_token");

  // 사용자 정보를 가져오는 useEffect
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/user-service/user/${userId}`);
        setUserName(response.data.nickname); // 닉네임을 state에 저장
      } catch (error) {
        console.error("유저 정보를 불러오는데 실패했습니다.", error);
      }
    };

    fetchUser();
  }, [userId]);

  // 정답 수를 기반으로 점수를 계산하는 useEffect
  useEffect(() => {
    const newScore = correctAnswers * 10;
    const expScore = correctAnswers * 2;
    setScore(newScore);
    setExpScore(expScore);
    console.log("업뎃할 경험치", expScore);
    // 여기서는 어떤 값을 반환하지 않아야 합니다.
    const updateExp = async (isTierExp: boolean) => {
      try {
        if (userId) {
          const response = await axios.put(
            `/api/user-service/tier/upgradeExp/${userId}`,
            {
              isTierExp,
              addExp: expScore,
            },
            {
              headers: {
                // headers를 여기에 포함시킵니다.
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log("경험치 업데이트 완료", response.data);
        }
      } catch (error) {
        console.error("경험치 업데이트 실패", error);
      }
    };

    updateExp(true);
    updateExp(false);
  }, [correctAnswers]);

  return (
    <div className={styles.box}>
      <div className={styles.boxinbox}>
        <h1 className={styles.inboxtext}>{score}</h1>
      </div>
      <h1 className={styles.text}>학습 테스트 결과</h1>
      <h1 className={styles.text}>
        {userName}님의 점수는 {score}점입니다!
      </h1>
    </div>
  );
};

export default TestScore;
