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
  const [level, setLevel] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const accessToken = localStorage.getItem("token");
  const userId = useSelector((state: RootState) => state.user.userId);
  const nickname = useSelector((state: RootState) => state.user.userNickName)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/user-service/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        setUserName(response.data.nickname); // 닉네임을 가져와서 사용
      } catch (error) {
        console.error("유저 정보를 불러오는데 실패했습니다.", error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId, accessToken]);

  useEffect(() => {
    // 점수에 따라 레벨 결정 로직이 먼저 실행되어야 하므로 이를 useEffect 내부의 상단에 배치
    const determinedLevel = determineLevel(score);
    setLevel(determinedLevel);

    const saveTier = async () => {
      if (determinedLevel && userId) {
        try {
          await axios.put(
            `/api/user-service/tier/upgradeTier/${userId}`,
            { tier: determinedLevel },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
        } catch (error) {
          console.error("티어 저장 실패", error);
        }
      }
    };

    saveTier();
  }, [score, userId, accessToken]);

  // 점수를 기반으로 레벨을 결정하는 함수
  const determineLevel = (score: number): string => {
    if (score >= 0 && score <= 10) {
      return "A1";
    } else if (score > 10 && score <= 20) {
      return "A2";
    } else if (score > 20 && score <= 32) {
      return "B1";
    } else if (score > 32 && score <= 45) {
      return "B2";
    } else if (score > 45 && score <= 61) {
      return "C1";
    } else if (score > 61 && score <= 70) {
      return "C2";
    } else {
      return "점수 범위를 벗어났습니다";
    }
  };

  return (
    <div className={styles.box}>
      <div className={styles.boxinbox}>
        <h1 className={styles.inboxtext}>{level}</h1>
      </div>
      <h1 className={styles.text}>레벨 테스트 결과</h1>
      <h1 className={styles.text}>{nickname}님의 레벨은 {level}입니다!</h1>
    </div>
  );
};

export default CefrScore;
