import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axios를 불러옵니다.
import Card from '../../components/Vocabu/Card';
import Pagination from '../../components/Vocabu/Pagination';
import styles from './ClassVoca.module.css';

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
    // 백엔드에서 데이터를 가져옵니다.
    const fetchWords = async () => {
      try {
        // API로부터 데이터를 받아옵니다.
        const response = await axios.get(`/api/word-service/words/${currentTier}`);
        // 응답으로 받은 데이터를 상태에 설정합니다.
        setWords(response.data);
      } catch (error) {
        console.error('단어를 불러오는 데 실패했습니다.', error);
        // 오류 처리를 적절히 수행합니다.
      }
    };

    fetchWords();
  }, [currentTier]); // currentTier가 변경될 때마다 useEffect가 실행됩니다.


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
