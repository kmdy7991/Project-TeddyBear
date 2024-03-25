import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScorePage: React.FC = () => {
  const location = useLocation();
  const [level, setLevel] = useState<string>('');

  useEffect(() => {
    const { score } = location.state as { score: number };
    const initialLevel = determineLevel(score);
    setLevel(initialLevel);
  }, [location]);

  const determineLevel = (score: number): string => {
    if (score >= 0 && score <= 10) {
      return 'A0 레벨';
    } else if (score >= 11 && score <= 20) {
      return 'A1 레벨';
    } else if (score >= 21 && score <= 32) {
      return 'A2 레벨';
    } else if (score >= 33 && score <= 45) {
      return 'B1 레벨';
    } else if (score >= 46 && score <= 61) {
      return 'B2 레벨';
    } else if (score >= 62 && score <= 70) {
      return 'C1 레벨';
    } else {
      return '점수 범위를 벗어났습니다';
    }
  };
  return (
    <div>
      <h1>점수로 레벨 확인하기</h1>
      <p>당신의 레벨은 {level}입니다!</p>
    </div>
  );
}

export default ScorePage;
