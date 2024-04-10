// Card.tsx
import React, { useEffect, useState } from "react";
import styles from "./Card.module.css";
import blankBookmark from "../../assets/bookmark.png";
import fullBookmark from "../../assets/material-symbols_bookmark.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { CardActions } from "../../store/cardBookmark";

interface Word {
  id: number;
  eng: string;
  kor: string;
  part: string;
  tier: string; // string으로 변경
}

interface CardProps {
  word: Word;
  // deleteWord?: (wordId: number) => void; // Optional
  // addBookmark?: (wordId: number) => void; // Optional
}

const Card: React.FC<CardProps> = ({ word }) => {
  // tierColors를 Record 형태로 수정하여 어떤 문자열 키에도 대응될 수 있게 합니다.
  const tierColors: Record<string, string> = {
    A1: "#FFCCCC",
    A2: "#FFCC99",
    B1: "#FFFF99",
    B2: "#CCFFCC",
    C1: "#CCFFFF",
    C2: "#CCCCFF",
  };

  // 단어의 티어에 해당하는 배경색 지정
  const backgroundColor =
    tierColors[word.tier as keyof typeof tierColors] || "#FFFFFF";
  // const [isBookmark, setIsBookmark] = useState(false);
  const userId = useSelector((state: RootState) => state.user.userId);
  // const userId = 5;
  const accessToken = localStorage.getItem("access_token");

  const dispatch = useDispatch();
  const bookmarks = useSelector((state: RootState) => state.cardBookmark);
  const isBookmark = bookmarks.some((bookmark) => bookmark.id === word.id);

  // useEffect(() => {
  //   const checkBookmark = async () => {
  //     if (word.id) {
  //       try {
  //         const response = await axios.get(
  //           `/api/word-service/bookmarkWords/isExist`,
  //           {
  //             params: {
  //               userId: userId,
  //               wordId: word.id,
  //             },
  //             headers: {
  //               // 여기에 headers를 포함시킵니다.
  //               Authorization: `Bearer ${accessToken}`,
  //               "Content-Type": "application/json",
  //             },
  //           }
  //         );
  //         console.log("북마크 유무 조회 성공", response.data);
  //         setIsBookmark(response.data);
  //       } catch (error) {
  //         console.error("북마크 조회 실패", error);
  //         setIsBookmark(false);
  //       }
  //     }
  //   };
  //   checkBookmark();
  // }, [word.id]);

  const handleToggleBookmark = async () => {
    try {
      if (!isBookmark) {
        const response = await axios.post(
          `/api/word-service/bookmarkWords`,
          {
            userId: userId,
            wordId: word.id,
          },
          {
            headers: {
              // headers를 여기에 포함시킵니다.
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(CardActions.addBookmark(word));
        console.log("북마크 추가 성공", response.data);
      } else {
        // 이ㅈㅔ 삭제
        const response = await axios.delete(
          `/api/word-service/bookmarkWords/${userId}/${word.id}`,
          // `/api/word-service/bookmarkWords/${1}/${word.id}`,
          {
            headers: {
              // headers를 여기에 포함시킵니다.
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("북마크 삭제 성공", response.data);
        dispatch(CardActions.removeBookmark(word.id));
      }
    } catch (error) {
      console.error("북마크 실패", error);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardFront} style={{ backgroundColor }}>
        <div className={styles.bookmark} onClick={handleToggleBookmark}>
          {isBookmark === null ? (
            <div>Loading...</div>
          ) : (
            <img src={isBookmark ? fullBookmark : blankBookmark} alt="북마크" />
          )}
        </div>
        <h2>{word.eng}</h2>
      </div>
      <div className={styles.cardBack} style={{ backgroundColor }}>
        <div className={styles.bookmark} onClick={handleToggleBookmark}>
          {isBookmark === null ? (
            <div>Loading...</div>
          ) : (
            <img src={isBookmark ? fullBookmark : blankBookmark} alt="북마크" />
          )}
        </div>
        <div>
          <h2>{word.eng}</h2>
        </div>
        <div>({word.part})</div>
        <div>{word.kor}</div>
      </div>
    </div>
  );
};

export default Card;
