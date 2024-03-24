import React, { useState, ChangeEvent, FormEvent } from 'react';

interface ScorePageProps {
  // 여기에 필요한 props 타입을 정의할 수 있습니다.
}

const ScorePage: React.FC<ScorePageProps> = () => {
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<string>('');

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

  const handleScoreChange = (event: ChangeEvent<HTMLInputElement>) => {
    setScore(Number(event.target.value));
  };

  const handleScoreSubmit = (event: FormEvent<HTMLFormElement>) => {
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
          value={score.toString()}
          onChange={handleScoreChange}
          placeholder="점수를 입력하세요"
        />
        <button type="submit">레벨 확인</button>
      </form>
      {level && <p>당신의 레벨은 {level}입니다!</p>}
    </div>
  );
}

export default ScorePage;
