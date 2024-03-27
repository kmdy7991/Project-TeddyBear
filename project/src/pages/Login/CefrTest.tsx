import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './CefrTest.module.css'
import CefrScore from './CefrScore'
import Modal from '../../components/Test/TestModal';
import { ReactDOM } from 'react';
import CefrQuestionData from './CerfQuestion.json';


// 문제와 답변 타입 정의
type Question = {
  id: number;
  question: string;
  options: string[];
  answer: number | null; // 정답의 인덱스 , answer 필드를 선택적으로 만들고, number 또는 null을 허용
  score: number; // 이 문제의 점수
};

// 퀴즈 데이터 예시
const questions: Question[] = CefrQuestionData;

const CefrTest: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [score, setScore] = useState(0);
  const navigate = useNavigate(); 
  const [isModalopen, setismodalopen] = useState(false);
  const [finalscore, setFinalscore] = useState(0);
  const [isOpen, setisOpen] = useState(false)
  

  useEffect(() => {
    const allQuestionsAnswered = selectedAnswers.every((answer) => answer !== null);
    if (allQuestionsAnswered) {
      // 모든 문제에 대한 답변이 완료되면 점수 확인 페이지로 이동
      // 여기서 점수 확인 페이지로 이동하는 로직을 구현하세요.
    }
  }, [selectedAnswers]);

  const handleSubmit = () => {
    // 점수 계산 로직
    let calculatedScore = 0;
    selectedAnswers.forEach((answer, index) => {
      if(answer === questions[index].answer) {
        calculatedScore += questions[index].score;
      }
    });
    setScore(calculatedScore);
    setismodalopen(true);

    // // 점수 확인 페이지로 이동
    // navigate('/cefrscore', { state: { score: calculatedScore } }); // navigate 함수를 사용하여 페이지 이동
  };


  const handleAnswerSelection = (questionIndex: number, selectedAnswer: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = selectedAnswer;
    setSelectedAnswers(newSelectedAnswers);
  };

  return (
    <div className={styles.boxflex}>
      {questions.map((question, index) => (
        <div className={styles.box} key={question.id} >
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
      <button onClick={() => setisOpen(true)} className={styles.button}>정답 제출</button>
      <Modal isOpen={isOpen} onClose={() => setisOpen(false)}>
        <CefrScore score={score} onClose={() => setisOpen(false)} /> {/* CefrScore 컴포넌트 삽입 */}
      </Modal>
    </div>
  );
  
};

export default CefrTest;
