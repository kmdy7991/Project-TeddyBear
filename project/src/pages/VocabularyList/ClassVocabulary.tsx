// ClassVocabulary.tsx
import React, { useState, useEffect } from 'react';
import Card from '../../components/Vocabu/Card';
import Pagination from '../../components/Vocabu/Pagination';
import styles from './ClassVoca.module.css';
import dummy from './Classvocadummy.json'


// JSON 파일에서 가져올 단어의 타입을 정의합니다.
interface Word {
  id: number;
  eng: string;
  kor: string;
  part: string;
  tier: string;
}

const ClassVocabulary = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTier, setCurrentTier] = useState('A1');
  const CARDS_PER_PAGE = 12;

  useEffect(() => {
    // 로컬 JSON 파일의 데이터를 필터링하여 상태에 설정합니다.
    setWords(dummy.filter(word => word.tier === currentTier));
  }, [currentTier]);

  // 백엔드 API 연결 시 사용할 함수는 주석 처리합니다.
  // const handleTierChange = (tier: string) => { ... };

  const currentCards = words.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 className={styles.text}>클래스별 단어장</h1>
      <div className={styles.classVocabularyLayout}>
        <div className={styles.tierButtonContainer}>
          {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((tier) => (
            <button 
              key={tier}
              className={currentTier === tier ? `${styles.tierButton} ${styles.active}` : styles.tierButton}
              onClick={() => setCurrentTier(tier)}
            >
              {tier}
            </button>
          ))}
        </div>
        <div className={styles.vocard}>
          {currentCards.map((word) => (
            <Card key={word.id} word={word} />
          ))}
        </div>
      </div>         
      <div className={styles.paginationContainer}>
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

export default ClassVocabulary;
