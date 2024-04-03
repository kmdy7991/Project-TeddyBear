import React, { useState, useEffect } from 'react';
import styles from './Test.module.css'; // 모듈 CSS를 import합니다.
import dummyData from './Vox.json';
import Modal from '../../components/Test/TestModal'; 
import Nav from "../../components/Nav/Nav";
import TestScore from './TestScore';
import { useSelector } from "react-redux"; // 리덕스 스토어의 상태를 가져오기 위해 useSelector 훅 추가
import { RootState } from "../../store"; // RootState 타입을 가져오는 경로, 실제 경로로 변경해야 함




interface VideoData {
  video_seq: number;
  video_id: string;
  video_url: string;
  video_thumbnail: string;
  video_title: string;
  video_description: string;
  video_playtime: string;
  video_transcript: string[];
}

interface Quiz {
  sentence: string;
  blankWord: string;
}

// dummyData를 올바른 타입으로 캐스팅합니다. 실제 사용 시 JSON 구조에 맞게 조정하세요.
const videos: VideoData[] = dummyData as unknown as VideoData[];

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

const Test = () => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const userId = useSelector((state: RootState) => state.user.userId);


  useEffect(() => {
    setQuizzes(getRandomSentenceAndBlank(videos[0].video_transcript));
  }, []);

  // 정답 제출 함수
  const handleAnswerSubmission = () => {
    if (!isAnswerChecked) {
      if (userAnswer.trim().toLowerCase() === quizzes[currentQuizIndex].blankWord.toLowerCase()) {
        setCorrectAnswersCount(correctAnswersCount + 1);
      }
      setIsAnswerChecked(true);
    } else {
      if (currentQuizIndex < quizzes.length - 1) {
        setCurrentQuizIndex(currentQuizIndex + 1);
        setIsAnswerChecked(false); // 다음 문제로 넘어갈 때 정답 확인 상태 초기화
      } else {
        setModalOpen(true);
      }
    }
  };
  

  return (
    <div>
      <Nav/>
      <div className={styles.testContainer}> 
        <div>
          <h1>문제 {currentQuizIndex + 1}</h1>          
        </div>
        {/* <div className={styles.scrbox}>
          <h1>번역본</h1>
        </div> */}
        <div className={styles.quebox}>
          <h1>{quizzes[currentQuizIndex]?.sentence}</h1>
          <div className={styles.check}>
            {isAnswerChecked && <h1>정답은 "{quizzes[currentQuizIndex]?.blankWord}"입니다.</h1>}
          </div> 
          <div>
            {!isAnswerChecked && (
              <input  className={styles.ansbox}
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="빈칸에 들어갈 단어를 입력하세요"
              />
            )}
          </div>          
        </div>

        <div>
          <button className={styles.button} onClick={handleAnswerSubmission}>{isAnswerChecked ? '다음 문제' : '제출'}</button> {/* 모듈 CSS 클래스를 적용합니다. */}
        </div>
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <p>총점: {correctAnswersCount * 10}점</p>
          <TestScore correctAnswers={correctAnswersCount * 10} userId={userId} onClose={() => setModalOpen(false)}/>

        </Modal>
      </div>
    </div>
  );
};

export default Test;