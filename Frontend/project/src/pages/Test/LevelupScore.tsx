import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import styles from '../Login/CefrScore.module.css';

const tierOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']; 

const CefrScore: React.FC<{ score: number; onClose: () => void }> = ({ score, onClose }) => {
  const [pass, setPass] = useState<boolean>(false);
  const [tier, setTier] = useState<string | null>(null);
  const [nextTier, setNextTier] = useState<string | null>(null);
  const userId = useSelector((state: RootState) => state.user.userId);

  useEffect(() => {
    const isPass = score >= 5;
    setPass(isPass);

    const fetchTierInfo = async () => {
      try {
        const response = await axios.get(`/api/user-service/tier/${userId}`);
        const currentTier = response.data.tierName;
        setTier(currentTier);

        const currentTierIndex = tierOrder.indexOf(currentTier);
        if (currentTierIndex !== -1 && currentTierIndex < tierOrder.length - 1) {
          setNextTier(tierOrder[currentTierIndex + 1]);
        } else {
          setNextTier(null);
        }
      } catch (error) {
        console.error('티어 정보를 불러오는데 실패했습니다.', error);
      }
    };

    // 경험치 업데이트 함수
    const updateExperience = async (isTierExp: boolean) => {
      try {
        await axios.put(`/api/user-service/upgradeExp/${userId}`, {
          isTierExp,
          addExp: 10,
        }, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Exp updated successfully");
      } catch (error) {
        console.error("경험치 업데이트 실패", error);
      }
    };

    if (userId && isPass) {
      fetchTierInfo();
      updateExperience(true); // 티어 경험치 10 증가
      updateExperience(false); // 레벨 경험치 10 증가
    }
  }, [score, userId]);

  const resultClass = pass ? styles.boxinbox : styles.boxinboxfail;

  return (
    <div className={styles.box}>
      <div className={`${styles.boxinbox} ${resultClass}`}>
        <h1 className={styles.inboxtext}>{pass ? `${tier} => ${nextTier}` : `${tier}`}</h1>
      </div>
      <h1 className={styles.text}>{pass ? '축하합니다!!' : '안타깝지만 승급 조건을 달성하지 못했습니다.'}</h1>
      <h1 className={styles.text}>
        {pass ? `${nextTier}티어로 승급하였습니다.` : '학습 후 다시 시도하여 주세요.'}
      </h1>
    </div>
  );
}

export default CefrScore;
