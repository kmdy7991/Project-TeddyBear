import React, { useState } from 'react';
import axios from 'axios'; // 나중에 API 호출에 사용됩니다.
import Card from '../../components/Vocabu/Card';
import Pagination from '../../components/Vocabu/Pagination';
import styles from './MyVoca.module.css';
import dummy from './Myvocadummy.json'; // 로컬 JSON 파일을 가져옵니다.

// tier의 유형을 'C2' | 'C1' | 'B2' | 'B1' | 'A2' | 'A1'로 제한하여 TypeScript에게 이 키들이 tierOrder 객체에 존재함을 알려줍니다.
interface Word {
  tier: "C2" | "C1" | "B2" | "B1" | "A2" | "A1";
  id: number;
  eng: string;
  kor: string;
  part: string;
}

const dummyWords: Word[] = dummy.map(word => ({
  ...word,
  tier: word.tier as 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
}));

const MyVocabulary = () => {
  const [words, setWords] = useState<Word[]>(dummyWords); // 로컬 JSON 데이터를 초기 상태로 사용합니다. // TODO: 나중에 API 연결시 이 코드는 제거합니다.
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"Addition" | "Alphabet" | "Tier">("Addition"); // 기본 탭을 "Addition"으로 설정합니다.
  const CARDS_PER_PAGE = 12;

  // 백엔드 API에서 단어 삭제 함수
  // TODO: API 연결 시 주석 해제하고 로직 구현
  /* const deleteWord = async (wordId: number) => {
    // 백엔드 서버에 단어 삭제 요청을 보내는 로직을 구현합니다.
  }; */

  // 백엔드 API에서 단어 추가 함수
  // TODO: API 연결 시 주석 해제하고 로직 구현
  /* const addWord = async (wordId: number) => {
    // 백엔드 서버에 단어 추가 요청을 보내는 로직을 구현합니다.
  }; */


  const sortByAddition = () => {
  setActiveTab("Addition"); // 탭을 "Addition"으로 설정합니다.
  // 추가 순은 dummy 데이터의 초기 순서를 따릅니다.
  // API 연결 후, 추가 순에 따른 정렬 로직이 필요할 수 있습니다.
  };

  // 알파벳 순으로 정렬
  const sortByAlphabet = () => {
    const sortedWords = [...words].sort((a, b) => a.eng.localeCompare(b.eng));
    setWords(sortedWords);
    setActiveTab("Alphabet");
  };

  // 티어 순으로 정렬
  const sortByTier = () => {
    const tierOrder: { [key in Word['tier']]: number } = { 'C2': 1, 'C1': 2, 'B2': 3, 'B1': 4, 'A2': 5, 'A1': 6 };
    const sortedWords = [...words].sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier]);
    setWords(sortedWords);
    setActiveTab("Tier");
  };

  const indexOfLastWord = currentPage * CARDS_PER_PAGE;
  const indexOfFirstWord = indexOfLastWord - CARDS_PER_PAGE;
  const currentCards = words.slice(indexOfFirstWord, indexOfLastWord);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };


  return (
    <div>
      <h1 className={styles.text1}>북마크별 단어장</h1>
      {/* 정렬 버튼 추가 */}      
      <div className={styles.tabs}>
        <button
          className={activeTab === "Addition" ? styles.active : ''}
          onClick={sortByAddition}>
          추가순
        </button>
        <button
          className={activeTab === 'Alphabet' ? styles.active : ''} onClick={sortByAlphabet}>알파벳순</button>
        <button
          className={activeTab === 'Tier' ? styles.active : ''} onClick={sortByTier}>난이도순</button>
      </div>
      <div className={styles.vocard}>
        {currentCards.map(word => (
          <Card key={word.id} word={word} /> // TODO: 나중에 API 연결시 deleteWord, addWord 함수를 props로 전달합니다.
        ))}
      </div>  
      <div className={styles.pagination}>
        <Pagination
          cardsPerPage={CARDS_PER_PAGE}
          totalCards={words.length}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>      
    </div>
  );
};

export default MyVocabulary;
