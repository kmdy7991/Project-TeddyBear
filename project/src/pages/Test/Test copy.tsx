import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store'; // 경로는 프로젝트 설정에 따라 달라질 수 있습니다.
import styles from './Test.module.css';
import TestScore from './TestScore';
import Modal from '../../components/Test/TestModal';
import Nav from "../../components/Nav/Nav";

interface ScriptData {
  id: number;
  content: string;
  videoId: string;
}

interface Quiz {
  sentence: string;
  blankWord: string;
}

const Test = () => {
  const { videoId } = useParams<{ videoId: string }>(); // URL에서 videoId 추출
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  // 리덕스 스토어에서 userId 가져오기
  const userId = useSelector((state: RootState) => state.user.userId);

  useEffect(() => {
    // 비디오 ID를 사용해 해당 스크립트 데이터를 API로부터 받아오는 함수
    const fetchScriptData = async () => {
      try {
        const response = await axios.get(`/api/script-service/script/${videoId}`);
        const scriptData: ScriptData[] = response.data;
        const transcript = scriptData.map(script => script.content);
        setQuizzes(getRandomSentenceAndBlank(transcript));
      } catch (error) {
        console.error('스크립트 데이터 로드 실패', error);
      }
    };

    if (videoId) {
      fetchScriptData();
    }
  }, [videoId]);

  const getRandomSentenceAndBlank = (transcript: string[]): Quiz[] => {
    let quizzes: Quiz[] = [];
    while (quizzes.length < 5) {
      const randomIndex = Math.floor(Math.random() * transcript.length);
      const selectedSentence = transcript[randomIndex];
      const words = selectedSentence.split(' ');
      const blankIndex = Math.floor(Math.random() * words.length);
      const blankWord = words[blankIndex];
      words[blankIndex] = '_'.repeat(blankWord.length);
      const questionSentence = words.join(' ');
      quizzes.push({ sentence: questionSentence, blankWord });
    }
    return quizzes;
  };

  const handleAnswerSubmission = () => {
    if (!isAnswerChecked) {
      if (userAnswer.trim().toLowerCase() === quizzes[currentQuizIndex]?.blankWord.toLowerCase()) {
        setCorrectAnswersCount(correctAnswersCount + 1);
      }
      setIsAnswerChecked(true);
    } else {
      if (currentQuizIndex < quizzes.length - 1) {
        setCurrentQuizIndex(currentQuizIndex + 1);
        setUserAnswer('');
        setIsAnswerChecked(false);
      } else {
        // 모든 문제를 풀었을 때 모달을 표시
        setModalOpen(true);
      }
    }
  };

  return (
    <div>
      <Nav />
      <div className={styles.testContainer}> 
        {quizzes.map((quiz, index) => (
          <div key={index}>
            <h1>문제 {index + 1}</h1>
            <p>{quiz.sentence}</p>
            <input 
              type="text" 
              value={userAnswer} 
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="빈칸에 들어갈 단어를 입력하세요" 
            />
            {isAnswerChecked && <p>정답은 "{quizzes[currentQuizIndex]?.blankWord}"입니다.</p>}
          </div>
        ))}
        <button onClick={handleAnswerSubmission}>
          {isAnswerChecked ? '다음 문제' : '제출'}
        </button>
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <TestScore correctAnswers={correctAnswersCount * 10} userId={userId} onClose={() => setModalOpen(false)}/>
        </Modal>
      </div>
    </div>
  );
};

export default Test;
