// 필요한 React 기능과 외부 라이브러리를 import합니다.
import React, { useState, useEffect } from "react"; // React의 기본, 상태 관리, 라이프사이클 훅 사용을 위해 import
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 React Router의 hook
import Modal from "../../components/Test/TestModal"; // 사용자 정의 모달 컴포넌트
import styles from '../Login/CefrTest.module.css'; // 스타일링을 위한 CSS 모듈
import axios from "axios"; // HTTP 요청을 위한 axios 라이브러리
import LevelupScore from './LevelupScore';

// API 응답 타입을 정의하는 인터페이스
interface TestOption {
  option: string; // 옵션의 텍스트
  _answer: boolean; // 해당 옵션이 정답인지 여부
}

interface Test {
  id: string; // 테스트 ID
  test_question: string; // 테스트 질문 텍스트
  options: TestOption[]; // 질문에 대한 옵션 배열
}

interface Question {
  id: string; // 문제 ID
  question: string; // 문제 텍스트
  options: string[]; // 옵션 텍스트 배열
  answer: number | null; // 정답 옵션의 인덱스 (아직 선택되지 않았다면 null)
  score: number; // 문제의 점수
}

interface QuestionSet {
  set_num: number; // 질문 세트 번호
  setquestion: Question[]; // 질문 배열
}

// LevelUpTest 컴포넌트 정의
const LevelUptest: React.FC = () => {
  // 여러 상태들을 관리하기 위한 useState 훅 사용
  const [questionSet, setQuestionSet] = useState<QuestionSet[]>([]); // 질문 세트 상태
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]); // 선택된 답안들의 배열
  const [score, setScore] = useState(0); // 사용자의 점수
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수
  const [isOpen, setIsOpen] = useState(false); // 모달의 열림/닫힘 상태

  useEffect(() => {
    const userId = 1; // 사용자 ID (예시)

    // 첫 번째 API 요청: 사용자의 tier 정보를 가져옴
    axios.get(`/api/user-service/tier/${userId}`)
      .then(response => {
        const tierName = response.data.tierName; // 응답에서 tierName 추출
        // 두 번째 API 요청: tierName에 해당하는 테스트 질문 세트를 가져옴
        console.log(tierName)
        return axios.get(`/api/test-service/test/${tierName}`);
      })
      .then(response => {
        // 응답 데이터를 Question 배열로 변환
        const questionSets: Question[] = response.data.map((test: Test) => ({
          id: test.id,
          question: test.test_question,
          options: test.options.map((option: TestOption) => option.option),
          answer: test.options.findIndex((option: TestOption) => option._answer),
          score: 1, // 점수는 예시값으로 설정
        }));

        // 8개의 문제만 선택
        const limitedQuestions = questionSets.slice(0, 9);

        // 새로운 질문 세트 생성 및 상태 업데이트
        const newQuestionSet: QuestionSet = {
          set_num: 1,
          setquestion: limitedQuestions,
        };

        // 질문 세트와 선택된 답안들의 초기 상태를 업데이트
        setQuestionSet([newQuestionSet]);
        setSelectedAnswers(new Array(limitedQuestions.length).fill(null));
      })
      .catch(error => console.error("API 요청 중 오류 발생:", error)); // 오류 처리
  }, []);

  // 답안 선택 핸들러: 선택된 답안을 상태에 업데이트
  const handleAnswerSelection = (questionIndex: number, selectedAnswer: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = selectedAnswer;
    setSelectedAnswers(newSelectedAnswers);
  };

  // 제출 핸들러: 사용자의 점수를 계산하고 모달을 열어 결과를 보여줌
  const handleSubmit = () => {
    let calculatedScore = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === questionSet[0].setquestion[index].answer) {
        calculatedScore += questionSet[0].setquestion[index].score;
      }
    });
    setScore(calculatedScore); // 점수 상태 업데이트
    setIsOpen(true); // 모달 열기
  };

  // 모든 문제에 답안이 선택되었는지 확인
  const allQuestionsAnswered = selectedAnswers.every(answer => answer !== null);

  // 컴포넌트의 JSX 구조 및 로직
  return (
    <div className={styles.questionContainer}>
      <div className={styles.boxflex}>
        <h1 className={styles.titletext}>LevelUP Test</h1>
        <div className={styles.box}>
          {/* 질문 및 옵션 렌더링 */}
          {questionSet.length > 0 && questionSet[0].setquestion.map((question, index) => (
            <div key={question.id} className={styles.question}>
              <h2>문제 {index + 1}: {question.question}</h2>
              <div className={styles.options2}>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className={styles.option2}>
                    <input
                      type="radio"
                      id={`option_${index}_${optionIndex}`}
                      name={`option_${index}`}
                      value={optionIndex}
                      checked={selectedAnswers[index] === optionIndex}
                      onChange={() => handleAnswerSelection(index, optionIndex)}
                    />
                    <label htmlFor={`option_${index}_${optionIndex}`}>   {option}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {allQuestionsAnswered && (
          <button onClick={handleSubmit} className={styles.button}>정답 제출</button>
        )}
        {/* 점수 표시를 위한 모달 */}
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <LevelupScore score={score} onClose={() => setIsOpen(false)} />
        </Modal>
      </div>
    </div>
  );
};

// 컴포넌트 export
export default LevelUptest;
