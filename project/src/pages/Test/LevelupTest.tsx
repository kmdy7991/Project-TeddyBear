import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Test/TestModal";
import styles from '../Login/CefrTest.module.css'

// 사용자 레벨에 따른 JSON 파일 import
import A0 from './A0Question.json';
import A1 from './A1Question.json';
// 나머지 레벨에 대한 JSON 파일 import 추가

// 임시
import LevelupScore from './LevelupScore';

// 질문 세트 타입 정의
type QuestionSet = {
  set_num: number;
  setquestion: Question[];
};

// 문제와 답변 타입 정의
type Question = {
  id: number;
  question: string;
  options: string[];
  answer: number | null; // 정답의 인덱스
  score: number; // 문제의 점수
};

const LevelUptest: React.FC = () => {
  // 현재 선택된 질문 세트
  const [questionSet, setQuestionSet] = useState<QuestionSet[]>([]);
  // 현재 선택된 질문 세트의 질문들에 대한 답변
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  // 퀴즈 점수
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  // 모달 열림 상태
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 레벨에 따라 선택된 JSON 파일을 설정
    const level = "A0"; // 사용자 레벨에 따라 설정
    let selectedJsonFile: QuestionSet[] = [];

    switch (level) {
      case "A0":
        selectedJsonFile = A0.sets;
        break;
      // case "A1":
      //   selectedJsonFile = A1.sets;
      //   break;
      // 나머지 레벨에 대한 case 문 추가
      default:
        selectedJsonFile = A0.sets; // 기본적으로 A0 레벨을 선택
        break;
    }

    // 랜덤한 질문 세트 선택
    const randomSetIndex = Math.floor(Math.random() * selectedJsonFile.length);
    const randomQuestionSet = selectedJsonFile[randomSetIndex];

    // 선택된 질문 세트를 상태에 반영
    setQuestionSet([randomQuestionSet]);
    // 선택된 질문 수만큼 답변 상태 초기화
    setSelectedAnswers(new Array(randomQuestionSet.setquestion.length).fill(null));
  }, []);

  // 답변 선택 핸들러
  const handleAnswerSelection = (questionIndex: number, selectedAnswer: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = selectedAnswer;
    setSelectedAnswers(newSelectedAnswers);
  };

  // 정답 제출 핸들러
  const handleSubmit = () => {
    // 점수 계산 로직
    let calculatedScore = 0;
    selectedAnswers.forEach((answer, index) => {
      if(answer === questionSet[0].setquestion[index].answer) {
        calculatedScore += questionSet[0].setquestion[index].score;
      }
    });
    setScore(calculatedScore);
    setIsOpen(true);
  };

  return (
    <div className={styles.boxflex}>
      {questionSet.length > 0 && questionSet[0].setquestion.map((question, index) => (
        <div className={styles.box} key={question.id}>
          <h2>문제 {index + 1}: {question.question}</h2>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <input
                type="radio"
                id={`option_${index}_${optionIndex}`}
                name={`option_${index}`}
                value={optionIndex}
                checked={selectedAnswers[index] === optionIndex}
                onChange={() => handleAnswerSelection(index, optionIndex)}
              />
              <label htmlFor={`option_${index}_${optionIndex}`}>{option}</label>
            </div>
          ))}
        </div>
      ))}
      {/* 정답 제출 버튼 */}
      <button onClick={handleSubmit} className={styles.button}>정답 제출</button>
      {/* 점수 확인 모달 */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <LevelupScore score={score} onClose={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
};

export default LevelUptest;

