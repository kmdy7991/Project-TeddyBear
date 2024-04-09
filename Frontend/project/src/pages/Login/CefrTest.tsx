import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './CefrTest.module.css'
import CefrScore from './CefrScore'
import Modal from '../../components/Test/TestModal';
import CefrQuestionData from './CerfQuestion.json';

// 문제와 답변 타입 정의
type Question = {
  id: number;
  question: string;
  options: string[];
  answer: number | null; // 정답의 인덱스, 선택적으로 null을 허용
  score: number; // 문제의 점수
};

// 퀴즈 데이터
const questions: Question[] = CefrQuestionData;

const CefrTest: React.FC = () => {
  // 선택된 답변과 점수를 관리하는 상태
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [score, setScore] = useState(0);
  
  const navigate = useNavigate(); // react-router-dom의 useNavigate 훅을 사용하여 페이지 이동을 위한 함수 가져오기
  
  // 모달 열림 여부를 관리하는 상태
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 모든 문제에 대한 답변이 완료되면 실행되는 효과
    const allQuestionsAnswered = selectedAnswers.every((answer) => answer !== null);
    if (allQuestionsAnswered) {
      // 점수 확인 페이지로 이동하는 로직을 여기에 추가하세요.
    }
  }, [selectedAnswers]);

  // 정답 제출 버튼 클릭 시 실행되는 함수
  const handleSubmit = () => {
    // 점수 계산 로직
    let calculatedScore = 0;
    selectedAnswers.forEach((answer, index) => {
      if(answer === questions[index].answer) {
        calculatedScore += questions[index].score;
      }
    });
    setScore(calculatedScore);
    setIsOpen(true);
  };

  // 선택된 답변을 업데이트하는 함수
  const handleAnswerSelection = (questionIndex: number, selectedAnswer: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = selectedAnswer;
    setSelectedAnswers(newSelectedAnswers);
  };

  return (
    <div className={styles.questionContainer}>
      <div className={styles.boxflex}>
        {/* 테스트 제목과 안내 메시지 */}
        <h1 className={styles.titletext}>Level Test</h1>
        <div className={styles.box}>
          <h1 className={styles.text1}>빈 칸에 들어갈 알맞은 단어를 선택하세요.</h1>
          <p className={styles.text2}>절대 찍지 마시고, 정확히 모르면 '정확히 모르겠음'을 선택해주세요.</p>
          {/* 추가 안내 메시지 */}
          <h6 className={styles.text2}>(Question 41~55) 다음 한국어 문장을 보고 해당 문장을 영어로 말할 수 있다고 생각하면 "예", 없다면 "아니요"에 체크해 주세요.</h6>
        </div>
        {/* 각 문제들을 담는 컨테이너 */}
        <div className={styles.box}>
          {questions.map((question, index) => (
            <div key={question.id} className={styles.optionContainer}>
              {/* 문제 제목 */}
              <h2> 문제 {index + 1} : {question.question}</h2>
              {/* 선택지 옵션들 */}
              <div className={styles.options}>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className={styles.option}>
                    <input
                      type="radio"
                      id={`option_${index}_${optionIndex}`}
                      name={`option_${index}`}
                      value={optionIndex}
                      checked={selectedAnswers[index] === optionIndex}
                      onChange={() => handleAnswerSelection(index, optionIndex)}
                    />
                    <label htmlFor={`option_${index}_${optionIndex}`}>  {option}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 정답 제출 버튼 */}
      {/* <button onClick={handleSubmit} className={styles.button} disabled={!selectedAnswers.every(answer => answer !== null)}>정답 제출</button> */}
      {/* 정답 제출 버튼, 항상 활성화 상태로 수정 */}
      <button onClick={handleSubmit} className={styles.button}>정답 제출</button>
      {/* 모달 */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <CefrScore score={score} onClose={() => setIsOpen(false)} /> {/* CefrScore 컴포넌트 삽입 */}
      </Modal>
    </div>
  );
};

export default CefrTest;
