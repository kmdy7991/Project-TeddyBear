import React, { useState, useEffect } from 'react';
import styles from './CefrScore.module.css'

const CefrScore: React.FC<{ score: number; onClose: () => void; }> = ({ score, onClose }) => {
  const [level, setLevel] = useState<string>('');

  useEffect(() => {
    const initialLevel = determineLevel(score);
    setLevel(initialLevel);
  }, [score]);

  const determineLevel = (score: number): string => {
    if (score >= 0 && score <= 10) {
      return 'A0';
    } else if (score >= 11 && score <= 20) {
      return 'A1';
    } else if (score >= 21 && score <= 32) {
      return 'A2';
    } else if (score >= 33 && score <= 45) {
      return 'B1';
    } else if (score >= 46 && score <= 61) {
      return 'B2';
    } else if (score >= 62 && score <= 70) {
      return 'C1';
    } else {
      return '점수 범위를 벗어났습니다';
    }
  };

  return (
    <div className={styles.box}>
      <div className={styles.boxinbox}>
        <h1 className={styles.inboxtext}>{level}</h1>
      </div>
      <h1 className={styles.text}>레벨 테스트 결과</h1>
      <h1 className={styles.text}>OO님의 레벨은 {level}입니다!</h1>
    </div>
  );
}

export default CefrScore;
