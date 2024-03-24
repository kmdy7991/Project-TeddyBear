import React, { useState } from 'react';

function ScorePage() {
  // 사용자의 점수를 저장할 state
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState('');

  // 점수에 따른 레벨을 결정하는 함수
  const determineLevel = (score) => {
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

  // 점수를 입력받아 레벨을 결정하는 핸들러 함수
  const handleScoreSubmit = (event) => {
    event.preventDefault();
    const calculatedLevel = determineLevel(score);
    setLevel(calculatedLevel);
  };

  return (
    <div>
      <h1>점수로 레벨 확인하기</h1>
      <form onSubmit={handleScoreSubmit}>
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          placeholder="점수를 입력하세요"
        />
        <button type="submit">레벨 확인</button>
      </form>
      {level && <p>당신의 레벨은 {level}입니다!</p>}
    </div>
  );
}

export default ScorePage;
