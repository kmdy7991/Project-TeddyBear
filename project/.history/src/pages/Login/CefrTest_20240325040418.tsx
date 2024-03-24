import React, { useState } from 'react';

// 문제와 답변 타입 정의
type Question = {
  question: string;
  answers: string[];
  correct: number; // 정답의 인덱스
  score: number; // 이 문제의 점수
};

// 퀴즈 데이터 예시
const questions: Question[] = [
  {
    question: "1+1은?",
    answers: ["1", "2", "3", "4"],
    correct: 1,
    score: 5,
  },
  // 여기에 추가 문제를 넣으세요.
];

const CefrTest: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (answerIndex: number) => {
    const question = questions[currentQuestion];
    if (answerIndex === question.correct) {
      setScore(score + question.score);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 모든 문제를 답했을 때, 점수 페이지로 이동
      // 여기서 점수 페이지로 이동하는 로직을 구현하세요.
    }
  };

  return (
    <div>
      <h2>{questions[currentQuestion].question}</h2>
      {questions[currentQuestion].answers.map((answer, index) => (
        <button key={index} onClick={() => handleAnswer(index)}>
          {answer}
        </button>
      ))}
    </div>
  );
};

// 점수에 따른 등급 매기기
const getGrade = (score: number) => {
  if (score <= 10) return 'A0 레벨';
  else if (score <= 20) return 'A1 레벨';
  else if (score <= 32) return 'A2 레벨';
  else if (score <= 45) return 'B1 레벨';
  else if (score <= 61) return 'B2 레벨';
  else return 'C1 레벨';
};

export default CefrTest;
