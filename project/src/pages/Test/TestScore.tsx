import React, { useState, useEffect } from "react";
import styles from '../Login/CefrScore.module.css';
import axios from "axios";

const TestScore: React.FC<{ correctAnswers: number; userId: number; onClose: () => void; }> = ({ correctAnswers, userId, onClose }) => {
  const [score, setScore] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/user-service/user/${userId}`);
        setUserName(response.data.nickname); // 닉네임을 가져와서 사용
      } catch (error) {
        console.error('유저 정보를 불러오는데 실패했습니다.', error);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const newScore = correctAnswers * 10; // 문제의 갯수를 10을 곱한 값으로 점수 계산
    setScore(newScore);
  }, [correctAnswers]);

  return (
    <div className={styles.box}>
      <div className={styles.boxinbox}>
        <h1 className={styles.inboxtext}>{score}</h1>
      </div>
      <h1 className={styles.text}>학습 테스트 결과</h1>
      <h1 className={styles.text}>{userName}님의 점수는 {score}점입니다!</h1>
    </div>
  );
}

export default TestScore;
