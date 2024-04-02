import React, { useState, useEffect } from 'react';
import styles from './Test.module.css'; // 모듈 CSS를 import합니다.
import dummyData from './Vox.json';
import Modal from '../../components/Test/TestModal'; 
import Nav from "../../components/Nav/Nav";


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

  useEffect(() => {
    setQuizzes(getRandomSentenceAndBlank(videos[0].video_transcript));
  }, []);

  const handleAnswerSubmission = () => {
    if (!isAnswerChecked) {
      // Check the answer
      if (userAnswer.trim().toLowerCase() === quizzes[currentQuizIndex].blankWord.toLowerCase()) {
        setCorrectAnswersCount(correctAnswersCount + 1);
      }
      setIsAnswerChecked(true);
    } else {
      // Move to the next question or show results
      if (currentQuizIndex < quizzes.length - 1) {
        setCurrentQuizIndex(currentQuizIndex + 1);
        setUserAnswer('');
        setIsAnswerChecked(false);
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
          <p>문제 {currentQuizIndex + 1}: {quizzes[currentQuizIndex]?.sentence}</p>
        </div>
        <div>
          {!isAnswerChecked && (
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="빈칸에 들어갈 단어를 입력하세요"
            />
          )}
        </div>
        <div>
          <button className={styles.button} onClick={handleAnswerSubmission}>{isAnswerChecked ? '다음 문제' : '제출'}</button> {/* 모듈 CSS 클래스를 적용합니다. */}
        </div>
        <div>
          {isAnswerChecked && <p>정답은 "{quizzes[currentQuizIndex]?.blankWord}"입니다.</p>}
        </div>


        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <p>총점: {correctAnswersCount * 10}점</p>
        </Modal>
      </div>
    </div>
  );
};

export default Test;