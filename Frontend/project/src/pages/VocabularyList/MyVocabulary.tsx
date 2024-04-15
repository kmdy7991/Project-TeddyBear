import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../components/Vocabu/Card";
import Pagination from "../../components/Vocabu/Pagination";
import styles from "./MyVoca.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

// Word 인터페이스 정의
export interface Word {
  id: number;
  eng: string;
  kor: string;
  part: string;
  tier: string;
}

const MyVocabulary = () => {
  const userID = useSelector((state: RootState) => state.user.userId);
  // const userID = 5;
  const [words, setWords] = useState<Word[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const CARDS_PER_PAGE = 12;

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await axios.get(
          `/api/word-service/bookmarkWords/${userID}`
        );
        setWords(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("단어를 불러오는데 실패했습니다.", error);
      }
    };
    fetchWords();
  }, []);

  const deleteWord = async (wordId: number) => {
    try {
      await axios.delete(`/api/word-service/bookmarkWords/${userID}/${wordId}`);
      setWords(words.filter((word) => word.id !== wordId));
    } catch (error) {
      console.error("단어를 삭제하는데 실패했습니다.", error);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastWord = currentPage * CARDS_PER_PAGE;
  const indexOfFirstWord = indexOfLastWord - CARDS_PER_PAGE;
  const currentWords = words.slice(indexOfFirstWord, indexOfLastWord);

  return (
    <div className={styles.container}>
      <h1 className={styles.text}>북마크 단어장</h1>;
      <div className={styles.vocard}>
        {currentWords &&
          currentWords?.map((word) => (
            <div key={word.id}>
              <Card word={word} />
            </div>
          ))}
      </div>
      <Pagination
        cardsPerPage={CARDS_PER_PAGE}
        totalCards={words.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MyVocabulary;
